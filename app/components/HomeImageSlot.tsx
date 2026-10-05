import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";
import { homeImages } from "../lib/homeImages";

interface HomeImageSlotProps {
  slot: keyof typeof homeImages;
  fill?: boolean;
  rounded?: boolean;
  tone?: "cream" | "maroon";
  className?: string;
  objectPosition?: string;
  priority?: boolean;
}

export default function HomeImageSlot({
  slot,
  fill = false,
  rounded = true,
  tone = "cream",
  className = "",
  objectPosition,
  priority = false,
}: HomeImageSlotProps) {
  const data = homeImages[slot];

  if (data.src) {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          ...(fill ? { height: "100%" } : { aspectRatio: data.aspect }),
          borderRadius: rounded ? "14px" : 0,
          overflow: "hidden",
        }}
      >
        <Image
          src={data.src}
          alt={data.label.replace(/^\[Photo:\s*/, "").replace(/\]$/, "")}
          fill
          priority={priority}
          sizes={data.sizes ?? "(min-width: 900px) 50vw, 100vw"}
          style={{ objectFit: "cover", objectPosition: objectPosition ?? data.objectPosition ?? "center" }}
        />
      </div>
    );
  }

  return (
    <PlaceholderImage
      label={data.label}
      aspect={data.aspect}
      fill={fill}
      rounded={rounded}
      tone={tone}
      className={className}
    />
  );
}
