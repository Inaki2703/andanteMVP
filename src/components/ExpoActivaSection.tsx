import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useId,
  MouseEvent,
  MutableRefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { EXHIBITION_DATA } from '../data';

interface ExpoActivaSectionProps {
  setView: (view: string) => void;
}

// Selección curada de obras para la fila de fotos
const IMAGES = [
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1558865869-c93f6f8482af?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800',
];

// Alturas irregulares + offsetY escalonado (patrón del mock: extremos bajos, centro alto).
const TILES = [
  { w: 300, h: 240, offsetY: 24 },
  { w: 240, h: 190, offsetY: 0 },
  { w: 360, h: 260, offsetY: -16 },
  { w: 220, h: 200, offsetY: 8 },
  { w: 320, h: 175, offsetY: 20 },
  { w: 270, h: 250, offsetY: -8 },
  { w: 340, h: 205, offsetY: 12 },
  { w: 250, h: 220, offsetY: -4 },
];

const BASE_SPEED = 1.4;
const SLOW_SPEED = 0.35;
const SCROLL_BOOST_MULT = 3.2;
const DRIFT_BOOST_MULT = 2.8;
const BOOST_DECAY = 0.92;

const PATH_BASE_Y = 145;

// ── Marquee curvado: arco convexo hacia arriba (centro más alto que extremos).
//    Mide el ancho real del texto para repetirlo sin costura; driven por rAF
//    con desaceleración al hover y boost por gesto de rueda (__pagerWheel). ──
function CurvedMarquee({
  marqueeText,
  curveAmount,
  speedRef,
  scrollBoostRef,
  reducedMotion,
}: {
  marqueeText: string;
  curveAmount: number;
  speedRef: MutableRefObject<{ cur: number; target: number }>;
  scrollBoostRef: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const text = useMemo(() => {
    const hasTrailing = /\s| $/.test(marqueeText);
    return (hasTrailing ? marqueeText : marqueeText + ' ').repeat(2);
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement>(null);
  const tpRef = useRef<SVGTextPathElement>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, '')}`;
  const pathD = `M-100,${PATH_BASE_Y} C360,${PATH_BASE_Y - curveAmount} 1080,${PATH_BASE_Y - curveAmount} 1540,${PATH_BASE_Y}`;

  const ready = spacing > 0;
  const totalText = ready
    ? Array(Math.ceil(1800 / spacing) + 2)
        .fill(text)
        .join('')
    : text;

  const textStyle = {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  };

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text]);

  useEffect(() => {
    if (spacing && tpRef.current) {
      tpRef.current.setAttribute('startOffset', -spacing + 'px');
      setOffset(-spacing);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing) return;
    let raf = 0;
    const step = () => {
      const s = speedRef.current;
      s.cur += (s.target - s.cur) * 0.08;

      const boost = reducedMotion ? 0 : scrollBoostRef.current;
      if (!reducedMotion) scrollBoostRef.current *= BOOST_DECAY;

      const el = tpRef.current;
      if (el) {
        const cur = parseFloat(el.getAttribute('startOffset') || '0');
        let n = cur - s.cur - boost;
        if (n <= -spacing) n += spacing;
        if (n > 0) n -= spacing;
        el.setAttribute('startOffset', n + 'px');
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [spacing, speedRef, scrollBoostRef, reducedMotion]);

  return (
    <svg
      className="w-full overflow-visible block aspect-[100/18] leading-none"
      viewBox="0 0 1440 240"
    >
      <text ref={measureRef} xmlSpace="preserve" style={{ ...textStyle, visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        {text}
      </text>
      <defs>
        <path id={pathId} d={pathD} fill="none" stroke="transparent" />
      </defs>
      {ready && (
        <text xmlSpace="preserve" style={textStyle} className="fill-fg">
          <textPath ref={tpRef} href={`#${pathId}`} startOffset={offset + 'px'} dy="-0.9em" xmlSpace="preserve">
            {totalText}
          </textPath>
        </text>
      )}
    </svg>
  );
}

export default function ExpoActivaSection({ setView }: ExpoActivaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const speed = useRef({ cur: BASE_SPEED, target: BASE_SPEED });
  const scrollBoostRef = useRef(0);
  const driftBoostRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Drift horizontal + decaimiento del boost por rueda en la fila de fotos.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      const layer = driftRef.current;
      if (!sec || !layer) return;
      const r = sec.getBoundingClientRect();
      const progress =
        (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight;
      const baseTx = -120 - progress * 100;

      if (!reducedMotion) {
        driftBoostRef.current *= BOOST_DECAY;
      } else {
        driftBoostRef.current = 0;
      }

      const tx = baseTx + driftBoostRef.current;
      layer.style.transform = `translate3d(${tx.toFixed(1)}px,0,0)`;
    };
    const tick = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    tick();
    const loop = () => {
      update();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  // Boost scroll-driven estilo riseatseven vía pager de App.tsx.
  useEffect(() => {
    const el = sectionRef.current as (HTMLElement & {
      __pagerWheel?: (deltaY: number) => void;
    }) | null;
    if (!el) return;

    el.__pagerWheel = (deltaY: number) => {
      if (reducedMotion) return;
      scrollBoostRef.current += deltaY * SCROLL_BOOST_MULT * 0.01;
      driftBoostRef.current -= deltaY * DRIFT_BOOST_MULT * 0.4;
    };

    return () => { delete el.__pagerWheel; };
  }, [reducedMotion]);

  const moveCursor = useCallback((e: MouseEvent) => {
    const c = cursorRef.current;
    if (c) {
      c.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  }, []);

  const driftImages = [...IMAGES, ...IMAGES];

  return (
    <section
      ref={sectionRef}
      onMouseEnter={(e) => {
        setHovering(true);
        moveCursor(e);
      }}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={moveCursor}
      onClick={() => setView('exhibition')}
      className="snap-section relative min-h-dvh flex flex-col justify-center gap-8 sm:gap-10 py-16 cursor-none select-none"
    >
      <div className="px-6 sm:px-10 flex items-center justify-between gap-4 relative z-30">
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
          <span className="h-0.5 w-12 bg-brand" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            Ahora en {EXHIBITION_DATA.locationName}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 bg-brand text-on-brand px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span>Expo activa</span>
        </div>
      </div>

      {/* Marquee curvado arriba; carrusel entra en el valle central del arco. */}
      <div
        onMouseEnter={() => { speed.current.target = SLOW_SPEED; }}
        onMouseLeave={() => { speed.current.target = BASE_SPEED; }}
        className="relative left-1/2 -translate-x-1/2 w-screen"
      >
        <div className="pointer-events-none relative z-10">
          <CurvedMarquee
            marqueeText="ARTE ✦ MUNDIALISTA ✦ "
            curveAmount={120}
            speedRef={speed}
            scrollBoostRef={scrollBoostRef}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="relative z-20 mt-0 sm:-mt-4 md:-mt-6 overflow-x-clip overflow-y-visible pt-5 pb-7">
          <div ref={driftRef} className="will-change-transform">
            <div
              className="marquee-track"
              style={{ animation: 'marquee-left 95s linear infinite', alignItems: 'flex-end' }}
            >
              {driftImages.map((src, i) => {
                const t = TILES[i % TILES.length];
                return (
                  <div
                    key={i}
                    className="shrink-0 mr-5 sm:mr-7 rounded-2xl overflow-hidden"
                    style={{
                      width: t.w,
                      height: t.h,
                      transform: `translateY(${t.offsetY}px)`,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <div
          ref={cursorRef}
          className={`pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-200 ease-out ${
            hovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand text-on-brand px-4 py-2.5 text-xs font-sans font-extrabold shadow-lg whitespace-nowrap">
            Ver exposición <span className="text-sm leading-none">↗</span>
          </span>
        </div>,
        document.body
      )}
    </section>
  );
}
