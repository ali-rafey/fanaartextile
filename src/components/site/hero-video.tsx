"use client";

import { useCallback, useState } from "react";

export default function HeroVideo({ src }: { src: string }) {
  const [ready, setReady] = useState(false);

  /**
   * Callback ref rather than an effect: when the browser has already buffered
   * the video before React hydrates (fast or cached loads), `canplay` fires
   * before any handler is attached. Checking readyState at attach time closes
   * that race — otherwise the video stays at opacity 0 forever, and Chrome
   * declines to autoplay an invisible element.
   */
  const attach = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    // Set muted imperatively too: React can render the element before the
    // attribute applies, which makes some browsers reject autoplay.
    video.muted = true;
    if (video.readyState >= 3) setReady(true);
    video.play().catch(() => {
      // Autoplay blocked: the first frame stays visible instead.
    });
  }, []);

  return (
    <video
      ref={attach}
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
      onLoadedData={() => setReady(true)}
      className={`h-full w-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
