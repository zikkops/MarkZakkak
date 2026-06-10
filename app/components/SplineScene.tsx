"use client";

import Spline from "@splinetool/react-spline";
import { useRef } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const disableScroll = () => {
    // Block wheel scroll
    document.body.style.overflow = "hidden";
    // Block touch scroll on mobile
    document.addEventListener("touchmove", preventDefault, { passive: false });
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
    document.removeEventListener("touchmove", preventDefault);
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
      // Also re-enable if focus leaves (e.g. tab away)
      onBlur={enableScroll}
    >
      <Spline scene={scene} />
    </div>
  );
}

// Named function so removeEventListener can find it by reference
function preventDefault(e: TouchEvent) {
  e.preventDefault();
}
