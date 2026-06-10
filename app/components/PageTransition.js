"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    setFadeOut(false);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1000);

    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [pathname]);

  return (
    <>
      {children}

      {showLoader && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 text-white backdrop-blur-2xl transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] px-10 py-8 shadow-[0_0_80px_rgba(77,163,255,0.2)]">
            <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,transparent,rgba(77,163,255,0.18),transparent)]" />

            <div className="relative z-10 text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#4DA3FF]">
                Loading
              </p>

              <h2 className="font-heading text-4xl font-black">
                MZ<span className="text-[#4DA3FF]">.</span>
              </h2>

              <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-white/10">
                <div className="loading-bar-inline h-full w-1/2 rounded-full bg-[#4DA3FF]" />

                  <style jsx>{`
                    .loading-bar-inline {
                      animation: loadingBarMove 1s ease-in-out infinite;
                    }

                    @keyframes loadingBarMove {
                      0% {
                        transform: translateX(-100%);
                      }

                      100% {
                        transform: translateX(220%);
                      }
                    }
                  `}</style>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}