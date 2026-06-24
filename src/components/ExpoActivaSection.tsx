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
import { ARTE_MUNDIALISTA_CAROUSEL_IMAGES } from '../constants/arteMundialista';
import { useCoarsePointer } from '../hooks/useCoarsePointer';

interface ExpoActivaSectionProps {
  setView: (view: string) => void;
}

const IMAGES = ARTE_MUNDIALISTA_CAROUSEL_IMAGES;

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
  { w: 280, h: 230, offsetY: 10 },
];

const BASE_SPEED = 1.4;
const SLOW_SPEED = 0.7;
const BOOST_DECAY = 0.92;

// Reactividad scroll-driven (estilo riseatseven): el scroll inyecta velocidad
// con signo (dirección) al marquee y al carrusel; nunca se ocultan, sólo cambian
// de velocidad/dirección con inercia.
const CAROUSEL_BASE = 0.5; // px/frame: deriva continua del carrusel
const MARQUEE_SCROLL_K = 0.04; // cuánto inyecta cada gesto de scroll al marquee
const CAROUSEL_SCROLL_K = 0.05; // cuánto inyecta cada gesto de scroll al carrusel
const MARQUEE_BOOST_MAX = 12; // tope de velocidad del marquee
const CAROUSEL_VEL_MAX = 12; // tope de velocidad del carrusel

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
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const coarsePointer = useCoarsePointer();
  const speed = useRef({ cur: BASE_SPEED, target: BASE_SPEED });
  const scrollBoostRef = useRef(0); // boost scroll-driven del marquee curvo
  const carouselVelRef = useRef(0); // boost scroll-driven del carrusel
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // El scroll inyecta velocidad (con signo = dirección) al marquee y al carrusel.
  // Listener `wheel` PASIVO: no llama preventDefault → no añade jank al scroll.
  useEffect(() => {
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    const onWheel = (e: WheelEvent) => {
      if (reducedMotion) return;
      scrollBoostRef.current = clamp(
        scrollBoostRef.current + e.deltaY * MARQUEE_SCROLL_K,
        MARQUEE_BOOST_MAX
      );
      carouselVelRef.current = clamp(
        carouselVelRef.current + e.deltaY * CAROUSEL_SCROLL_K,
        CAROUSEL_VEL_MAX
      );
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [reducedMotion]);

  // Carrusel: loop continuo por rAF (deriva base + boost de scroll con inercia).
  // Reemplaza la animación CSS para poder cambiar velocidad y dirección sin que
  // las imágenes se oculten nunca.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let x = 0;
    const step = () => {
      const half = track.scrollWidth / 2;
      const boost = reducedMotion ? 0 : carouselVelRef.current;
      if (!reducedMotion) carouselVelRef.current *= BOOST_DECAY;
      const base = reducedMotion ? 0 : CAROUSEL_BASE;
      x -= base + boost;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
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
      data-free-scroll
      onMouseEnter={coarsePointer ? undefined : (e) => {
        setHovering(true);
        moveCursor(e);
      }}
      onMouseLeave={coarsePointer ? undefined : () => setHovering(false)}
      onMouseMove={coarsePointer ? undefined : moveCursor}
      onClick={() => setView('exhibition')}
      className={`relative min-h-dvh flex flex-col justify-center gap-8 sm:gap-10 pb-16 pt-[calc(1.5rem+((100vw-3rem)*105/368)+2rem)] md:py-16 select-none ${
        coarsePointer ? 'cursor-pointer' : 'cursor-none'
      }`}
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

      {/* Marquee curvado arriba; carrusel entra en el valle central del arco.
          Ambos están SIEMPRE visibles (sin fades); el scroll cambia su velocidad
          y dirección. */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen">
        {/* El "slow on hover" se acota SOLO al texto curvo: posar el cursor sobre
            las fotos del carrusel ya no frena el marquee. */}
        <div
          onMouseEnter={() => { speed.current.target = SLOW_SPEED; }}
          onMouseLeave={() => { speed.current.target = BASE_SPEED; }}
          className="relative z-10"
        >
          <CurvedMarquee
            marqueeText="ARTE ✦ MUNDIALISTA ✦ "
            curveAmount={120}
            speedRef={speed}
            scrollBoostRef={scrollBoostRef}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="relative z-20 mt-0 sm:-mt-4 md:-mt-6 overflow-x-clip overflow-y-visible pt-5 pb-7">
          <div
            ref={trackRef}
            className="marquee-track will-change-transform"
            style={{ alignItems: 'flex-end' }}
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

      {!coarsePointer &&
        createPortal(
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
