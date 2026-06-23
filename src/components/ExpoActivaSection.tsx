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

// Alturas irregulares (no un carrusel uniforme). Más bajas que la banda del
// marquee para que el texto ondulado asome arriba, abajo y entre las fotos.
const TILES = [
  { w: 300, h: 240 },
  { w: 240, h: 190 },
  { w: 360, h: 260 },
  { w: 220, h: 200 },
  { w: 320, h: 175 },
  { w: 270, h: 250 },
  { w: 340, h: 205 },
  { w: 250, h: 220 },
];

const BASE_SPEED = 1.4;
const SLOW_SPEED = 0.35;

// ── Marquee curvado (técnica reactbits/CurvedLoop): mide el ancho real del
//    texto para repetirlo sin costura y lo desliza sobre una curva cuya
//    profundidad la define `curveAmount`. Driven por rAF con desaceleración
//    suave al pasar el cursor. ──
function CurvedMarquee({
  marqueeText,
  curveAmount,
  speedRef,
}: {
  marqueeText: string;
  curveAmount: number;
  speedRef: MutableRefObject<{ cur: number; target: number }>;
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
  const pathD = `M-100,40 Q720,${40 + curveAmount} 1540,40`;

  const ready = spacing > 0;
  const totalText = ready
    ? Array(Math.ceil(1800 / spacing) + 2)
        .fill(text)
        .join('')
    : text;

  const textStyle = {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: '6rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  };

  // Medir el ancho real del texto para el bucle sin costura.
  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text]);

  // Posición inicial.
  useEffect(() => {
    if (spacing && tpRef.current) {
      tpRef.current.setAttribute('startOffset', -spacing + 'px');
      setOffset(-spacing);
    }
  }, [spacing]);

  // Animación + desaceleración suave.
  useEffect(() => {
    if (!spacing) return;
    let raf = 0;
    const step = () => {
      const s = speedRef.current;
      s.cur += (s.target - s.cur) * 0.08;
      const el = tpRef.current;
      if (el) {
        const cur = parseFloat(el.getAttribute('startOffset') || '0');
        let n = cur - s.cur;
        if (n <= -spacing) n += spacing;
        if (n > 0) n -= spacing;
        el.setAttribute('startOffset', n + 'px');
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [spacing, speedRef]);

  return (
    <svg
      className="w-full overflow-visible block aspect-[100/12] leading-none"
      viewBox="0 0 1440 120"
    >
      <text ref={measureRef} xmlSpace="preserve" style={{ ...textStyle, visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        {text}
      </text>
      <defs>
        <path id={pathId} d={pathD} fill="none" stroke="transparent" />
      </defs>
      {ready && (
        <text xmlSpace="preserve" style={textStyle} className="fill-fg">
          <textPath ref={tpRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
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

  // Drift horizontal sutil ligado al scroll en la fila de fotos.
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
      const tx = -120 - progress * 100;
      layer.style.transform = `translate3d(${tx.toFixed(1)}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Cursor-badge personalizado que sigue al puntero dentro de la sección
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
      {/* Fila superior: label (izquierda) + badge Expo activa (derecha) */}
      <div className="px-6 sm:px-10 flex items-center justify-between gap-4 relative z-20">
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

      {/* Composición: marquee curvado arriba; debajo el carrusel de fotos, que
          sólo oculta la parte baja de la curva (el centro de la curva se mete
          por detrás de las imágenes). Al pasar el cursor, el texto se ralentiza. */}
      <div
        onMouseEnter={() => { speed.current.target = SLOW_SPEED; }}
        onMouseLeave={() => { speed.current.target = BASE_SPEED; }}
        className="relative left-1/2 -translate-x-1/2 w-screen"
      >
        {/* Marquee curvado, full-width, arriba */}
        <div className="pointer-events-none relative z-0">
          <CurvedMarquee marqueeText="ARTE ✦ MUNDIALISTA ✦ " curveAmount={250} speedRef={speed} />
        </div>

        {/* Carrusel de fotos, claramente debajo de la curva: sólo la punta más
            baja del texto curvado las roza. z-10 → pasa por delante del texto. */}
        <div className="relative z-10 mt-4 sm:mt-8 overflow-hidden">
          <div ref={driftRef} className="will-change-transform">
            <div
              className="marquee-track"
              style={{ animation: 'marquee-left 95s linear infinite', alignItems: 'center' }}
            >
              {driftImages.map((src, i) => {
                const t = TILES[i % TILES.length];
                return (
                  <div
                    key={i}
                    className="shrink-0 mr-5 sm:mr-7 rounded-2xl overflow-hidden"
                    style={{ width: t.w, height: t.h }}
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

      {/* Cursor-badge tipo riseatseven ("Send Us Your Brief ↗").
          Portal a <body> para que `position: fixed` sea relativo al viewport. */}
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
