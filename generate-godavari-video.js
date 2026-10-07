require("dotenv/config");

const fs = require("fs");
const path = require("path");
const RunwayML = require("@runwayml/sdk");

const IMAGE_PATH = path.join(__dirname, "public", "products", "godavari-jal.png");
// Never overwrite an earlier take: use -v2, -v3, ... if the file already exists.
function pickOutputPath() {
  const dir = path.join(__dirname, "public", "products");
  let candidate = path.join(dir, "godavari-jal-video.mp4");
  for (let v = 2; fs.existsSync(candidate); v++) {
    candidate = path.join(dir, `godavari-jal-video-v${v}.mp4`);
  }
  return candidate;
}
const OUTPUT_PATH = pickOutputPath();

const PROMPT_TEXT =
  "Cinematic, devotional product video, one continuous shot, no cuts. 9:16. Use the uploaded photo as the exact bottle: same clear plastic shape, gold cap, cream label with lotus-hand logo and \"GODAVARI JAL\" lettering, unchanged. Dark carved wooden table at golden hour, warm saffron light, shallow depth of field. Beside the bottle: a single smooth rounded dome-shaped black stone Shivling on a round base, not stacked stones, one continuous lingam form, with bilva leaves and marigold petals at its base, a brass diya glowing softly behind. A hand and forearm with a thin red-saffron kalawa thread is already tilting the bottle over the Shivling from frame one, pouring a steady slow-motion stream of water over it and down its sides, label facing camera throughout, no face shown. Locked-off camera, very slow drift only, no zooms, centered with headroom. Avoid: cuts, stacked or cairn stones, label distortion, extra fingers, any face, flicker, watermarks, cartoon look.";

const MAX_PROMPT_LENGTH = 1000;

async function main() {
  if (PROMPT_TEXT.length > MAX_PROMPT_LENGTH) {
    throw new Error(
      `promptText is ${PROMPT_TEXT.length} characters; Runway's limit is ${MAX_PROMPT_LENGTH}. Shorten it before running.`
    );
  }

  if (!process.env.RUNWAYML_API_SECRET) {
    console.error(
      "RUNWAYML_API_SECRET is not set. Add your Runway API key to .env and re-run this script."
    );
    process.exit(1);
  }

  if (!fs.existsSync(IMAGE_PATH)) {
    console.error(`Source image not found at ${IMAGE_PATH}`);
    process.exit(1);
  }

  const imageBase64 = fs.readFileSync(IMAGE_PATH).toString("base64");
  const promptImage = `data:image/png;base64,${imageBase64}`;

  const client = new RunwayML();

  console.log("Submitting image-to-video task to Runway (gen4_turbo, ratio 720:1280, 5s)...");

  const task = await client.imageToVideo
    .create({
      model: "gen4_turbo",
      promptImage,
      promptText: PROMPT_TEXT,
      ratio: "720:1280",
      duration: 5,
    })
    .waitForTaskOutput();

  console.log(`Task ${task.id} succeeded.`);

  const videoUrl = task.output[0];
  if (!videoUrl) {
    throw new Error("Task succeeded but returned no output URL.");
  }

  console.log("Downloading video...");
  const response = await fetch(videoUrl);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(OUTPUT_PATH, Buffer.from(arrayBuffer));

  console.log(`Saved video to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
