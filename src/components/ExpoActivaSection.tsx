import { useRef, useEffect, useState, useCallback, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { EXHIBITION_DATA } from '../data';

interface ExpoActivaSectionProps {
  setView: (view: string) => void;
}

// Selección curada de obras para los marquees
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

// Tamaños y desfases verticales irregulares para la fila inferior: distintas
// alturas y offsets (estilo brandnewschool), no un carrusel uniforme.
const TILES = [
  { w: 280, h: 340, mt: 24 },
  { w: 420, h: 240, mt: 120 },
  { w: 320, h: 380, mt: 0 },
  { w: 240, h: 200, mt: 150 },
  { w: 400, h: 300, mt: 64 },
  { w: 300, h: 360, mt: 16 },
  { w: 380, h: 250, mt: 130 },
  { w: 300, h: 320, mt: 56 },
];

// ── Una línea de marquee: la palabra repetida, intercalada con imágenes
//    (estilo riseatseven "CHASING…"). Driven por rAF para poder desacelerar
//    suavemente al pasar el cursor por encima. ──
function MarqueeLine({
  word,
  images,
  duration,
}: {
  word: string;
  images: string[];
  duration: number;
}) {
  const repeats = Math.max(images.length, 3);
  const group = Array.from({ length: repeats }, (_, i) => i);
  const items = [...group, ...group]; // duplicado para bucle sin costura

  const trackRef = useRef<HTMLDivElement>(null);
  const st = useRef({ offset: 0, group: 0, speed: 0, target: 0, base: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = st.current;

    const measure = () => {
      const groupW = track.scrollWidth / 2; // hay 2 grupos idénticos
      if (groupW <= 0) return;
      s.group = groupW;
      s.base = groupW / duration; // px/s para completar un grupo en `duration`
      if (s.speed === 0) s.speed = s.base;
      if (s.target === 0) s.target = s.base;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // interpola la velocidad hacia el objetivo → desaceleración/aceleración suave
      s.speed += (s.target - s.speed) * Math.min(1, dt * 5);
      s.offset -= s.speed * dt;
      if (s.group > 0) {
        while (s.offset <= -s.group) s.offset += s.group;
      }
      track.style.transform = `translate3d(${s.offset.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [duration]);

  const slowDown = () => {
    st.current.target = st.current.base * 0.18;
  };
  const resume = () => {
    st.current.target = st.current.base;
  };

  return (
    <div className="overflow-hidden" onMouseEnter={slowDown} onMouseLeave={resume}>
      <div ref={trackRef} className="marquee-track" style={{ willChange: 'transform' }}>
        {items.map((i, idx) => (
          <span key={idx} className="flex items-center mr-6 sm:mr-8">
            <span className="font-sans font-semibold lowercase leading-none tracking-tight text-[#1A1A1A] dark:text-[#F2F2F2] text-[72px] whitespace-nowrap">
              {word}
            </span>
            <span className="ml-6 sm:ml-8 shrink-0 block h-[62px] aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
              <img
                src={images[i % images.length]}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExpoActivaSection({ setView }: ExpoActivaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Drift horizontal sutil ligado al scroll, además del marquee continuo
  // (estilo brandnewschool.com/culture). Se aplica a una capa externa para
  // componerse con la animación del track sin pisarla.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      const layer = driftRef.current;
      if (!sec || !layer) return;
      const r = sec.getBoundingClientRect();
      // progress ≈ -1 (sección abajo) … 0 (centrada) … 1 (arriba)
      const progress =
        (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight;
      const tx = -120 - progress * 100; // siempre negativo → sin huecos a la izquierda
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

  // Fila inferior: duplicada para bucle sin costura del marquee
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
      className="snap-section relative min-h-dvh flex flex-col justify-center gap-10 sm:gap-14 py-16 cursor-none select-none"
    >
      {/* Fila superior: label (izquierda) + badge Expo activa (derecha) */}
      <div className="px-6 sm:px-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
          <span className="h-0.5 w-12 bg-[#D4F334]" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            Ahora en {EXHIBITION_DATA.locationName}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#D4F334] text-[#1A1A1A] px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0084FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0084FF]" />
          </span>
          <span>Expo activa</span>
        </div>
      </div>

      {/* Marquee de una sola línea: "arte mundialista" (Syne semibold) con imágenes */}
      <MarqueeLine word="arte mundialista" images={IMAGES} duration={72} />

      {/* Fila inferior: tarjetas con alturas y desfases verticales distintos
          (no uniforme) + marquee lento a la izquierda, con drift de scroll. */}
      <div className="overflow-hidden h-[420px]">
        <div ref={driftRef} className="will-change-transform h-full">
          <div
            className="marquee-track h-full"
            style={{ animation: 'marquee-left 95s linear infinite', alignItems: 'flex-start' }}
          >
            {driftImages.map((src, i) => {
              const t = TILES[i % TILES.length];
              return (
                <div
                  key={i}
                  className="shrink-0 mr-4 sm:mr-5 rounded-2xl overflow-hidden shadow-sm"
                  style={{ width: t.w, height: t.h, marginTop: t.mt }}
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

      {/* Cursor-badge tipo riseatseven ("Send Us Your Brief ↗").
          Se renderiza en un portal a <body> para que `position: fixed` sea
          relativo al viewport y no a ningún ancestro con transform. */}
      {createPortal(
        <div
          ref={cursorRef}
          className={`pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-200 ease-out ${
            hovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4F334] text-[#1A1A1A] px-4 py-2.5 text-xs font-sans font-extrabold shadow-lg whitespace-nowrap">
            Ver exposición <span className="text-sm leading-none">↗</span>
          </span>
        </div>,
        document.body
      )}
    </section>
  );
}
