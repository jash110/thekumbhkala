import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";
import ScrollVideo from "./ScrollVideo";
import type { KumbhElement } from "../lib/data";

/** Fills its parent box: video if available, else static image, else placeholder. */
export default function ElementMedia({ name, mediaType = "image", videoSrc, image }: KumbhElement) {
  if (mediaType === "video" && videoSrc) {
    return <ScrollVideo src={videoSrc} fill label={name} />;
  }
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 1100px) 25vw, (min-width: 560px) 50vw, 100vw"
        style={{ objectFit: "contain", background: "#faf5e9" }}
      />
    );
  }
  return <PlaceholderImage label={`[Photo: ${name}]`} mediaType={mediaType} fill rounded={false} />;
}
