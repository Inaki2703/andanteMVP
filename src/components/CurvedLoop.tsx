import { useEffect, useRef, useState } from 'react';

interface CurvedLoopProps {
  marqueeText?: string;
  centerBadgeText?: string;
}

const PATH_D = 'M -50 140 Q 250 20, 500 130 T 1050 120';

export default function CurvedLoop({
  marqueeText = 'ARTE ✦ MUNDIALISTA',
  centerBadgeText = 'MUESTRA SANTIAGO',
}: CurvedLoopProps) {
  const [offset, setOffset] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const repeatedText = `${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ ${marqueeText} ✦ `;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full py-6 select-none overflow-visible"
      id="curved-marquee-wrapper"
    >
      <div className="relative w-full">
      {/* aspect-[1000/240] coincide con el viewBox: el path ocupa todo el ancho sin letterboxing lateral */}
      <svg
        viewBox="0 0 1000 240"
        overflow="visible"
        preserveAspectRatio="xMidYMid meet"
        className="relative z-0 w-full overflow-visible block aspect-[1000/240]"
        id="curved-marquee-svg"
      >
        <path id="curved-loop-path" fill="none" stroke="none" d={PATH_D} />
        <path
          id="curved-loop-path-glow"
          fill="none"
          stroke="rgba(0,132,255,0.06)"
          strokeWidth="12"
          strokeLinecap="round"
          d={PATH_D}
          className="blur-md dark:stroke-accent/10"
        />

        <text
          className="font-sans uppercase text-[36px] sm:text-[42px] md:text-[46px] tracking-[0.12em]"
          style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800 }}
          id="curved-text-element"
        >
          <textPath
            href="#curved-loop-path"
            startOffset={`${offset}%`}
            className="fill-neutral-900 dark:fill-neutral-100 transition-[fill] duration-[var(--dur-base)] ease-[var(--ease-standard)]"
          >
            {repeatedText}
          </textPath>
        </text>
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center">
        <div className="px-5 py-2 bg-neutral-900 dark:bg-tab border border-neutral-700/60 dark:border-neutral-800 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2">
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
