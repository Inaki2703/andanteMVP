import { useEffect, useRef, useState } from 'react';

interface CurvedLoopProps {
  marqueeText?: string;
  centerBadgeText?: string;
}

export default function CurvedLoop({
  marqueeText = "ARTE ✦ MUNDIALISTA",
  centerBadgeText = "MUESTRA SANTIAGO",
}: CurvedLoopProps) {
  const [offset, setOffset] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Animate the text sliding along the path using requestAnimationFrame for pristine frame rates
  // Reduced step from 0.25 to 0.06 for a slower, more sophisticated, and premium kinetic pace
  useEffect(() => {
    if (wrapperRef.current?.closest('[data-loop-clone]')) return;

    let animationId: number;
    const animate = () => {
      setOffset((prev) => (prev - 0.05) % 100);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Concatenate the text multiple times to fill up the entire curved loop seamlessly
  const repeatedText = `${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ `;

  return (
    <div ref={wrapperRef} className="relative left-1/2 -translate-x-1/2 w-screen flex justify-center py-6 select-none overflow-visible" id="curved-marquee-wrapper">
      <div className="relative w-full h-[160px] sm:h-[180px] md:h-[220px] lg:h-[250px]">
        <svg
          viewBox="0 0 1000 240"
          className="absolute inset-0 w-full h-full overflow-visible"
          id="curved-marquee-svg"
        >
          {/* A beautiful double-curved smooth organic track spanning the screen */}
          <path
            id="curved-loop-path"
            fill="none"
            stroke="none"
            d="M -50 140 Q 250 20, 500 130 T 1050 120"
          />
          {/* Subtle glowing shadow path beneath for exceptional depth */}
          <path
            id="curved-loop-path-glow"
            fill="none"
            stroke="rgba(0,132,255,0.06)"
            strokeWidth="12"
            strokeLinecap="round"
            d="M -50 140 Q 250 20, 500 130 T 1050 120"
            className="blur-md dark:stroke-accent/10"
          />

          <text
            className="font-sans uppercase text-[36px] sm:text-[42px] md:text-[46px] tracking-[0.12em]"
            style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800 }}
            id="curved-text-element"
          >
            {/* Dark & light theme matching colors */}
            <textPath
              href="#curved-loop-path"
              startOffset={`${offset}%`}
              className="fill-neutral-900 dark:fill-neutral-100 transition-[fill] duration-[var(--dur-base)] ease-[var(--ease-standard)]"
            >
              {repeatedText}
            </textPath>
          </text>
        </svg>

        {/* Decorative central accent badge mirroring a premium contemporary ticket seal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
          <div className="px-5 py-2 bg-neutral-900 dark:bg-tab border border-neutral-700/60 dark:border-neutral-800 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 transform hover:scale-105 transition-transform duration-[var(--dur-base)] ease-[var(--ease-standard)]">
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-extrabold text-white tracking-[0.2em] uppercase">
              {centerBadgeText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
