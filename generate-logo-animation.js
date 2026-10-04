require("dotenv/config");

const fs = require("fs");
const path = require("path");
const RunwayML = require("@runwayml/sdk");

const LOGO_PATH = path.join(__dirname, "public", "logo.png");
const OUTPUT_PATH = path.join(__dirname, "public", "logo-animation.mp4");

const PROMPT_TEXT =
  "Subtle, gentle motion: the lotus flower's petals softly unfurl and bloom with color, " +
  "the mudra hand settles naturally into place, the surrounding ink linework sharpens into " +
  "focus, soft ambient light. Minimal, elegant, reverent motion — no camera movement, no " +
  "zoom, no new elements, no added text, no distortion of the existing linework, hand, or " +
  "lettering. The circular text and dotted arcs stay perfectly still and legible throughout.";

async function main() {
  if (!process.env.RUNWAYML_API_SECRET) {
    console.error(
      "RUNWAYML_API_SECRET is not set. Add your Runway API key to .env and re-run this script."
    );
    process.exit(1);
  }

  if (!fs.existsSync(LOGO_PATH)) {
    console.error(`Logo not found at ${LOGO_PATH}`);
    process.exit(1);
  }

  const imageBase64 = fs.readFileSync(LOGO_PATH).toString("base64");
  const promptImage = `data:image/png;base64,${imageBase64}`;

  const client = new RunwayML();

  console.log("Submitting image-to-video task to Runway (gen4_turbo, ratio 960:960, 5s)...");

  const task = await client.imageToVideo
    .create({
      model: "gen4_turbo",
      promptImage,
      promptText: PROMPT_TEXT,
      ratio: "960:960",
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

  console.log(`Saved animation to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
