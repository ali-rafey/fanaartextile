"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React can render the element before the muted attribute applies, which
    // makes some browsers reject autoplay — set it imperatively, then play.
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked: the poster/first frame stays visible instead.
    });
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      className={`h-full w-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
