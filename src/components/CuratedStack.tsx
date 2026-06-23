import { useRef, useState, useEffect, CSSProperties } from 'react';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface CuratedStackProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

// Sección "Curado a mano" como un stack de cartas que se barajan hacia arriba
// conforme se hace scroll (estilo riseatseven). El pager de App.tsx delega cada
// gesto en __pagerStep; mientras queden cartas, consume el gesto (no cambia de
// sección). __pagerEnter fija la carta inicial según la dirección de entrada.
export default function CuratedStack({ artworks, onSelectArtwork }: CuratedStackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const idxRef = useRef(0);
  const N = artworks.length;

  useEffect(() => {
    const el = sectionRef.current as (HTMLElement & {
      __pagerStep?: (dir: 1 | -1) => boolean;
      __pagerEnter?: (dir: 1 | -1) => void;
    }) | null;
    if (!el) return;

    const set = (i: number) => {
      const clamped = Math.max(0, Math.min(N - 1, i));
      idxRef.current = clamped;
      setIndex(clamped);
    };

    // Devuelve true si "consume" el gesto (avanza carta); false → cambia sección.
    el.__pagerStep = (dir) => {
      const cur = idxRef.current;
      if (dir === 1 && cur < N - 1) { set(cur + 1); return true; }
      if (dir === -1 && cur > 0) { set(cur - 1); return true; }
      return false;
    };
    // Al entrar bajando → primera carta; al entrar subiendo → última carta.
    el.__pagerEnter = (dir) => set(dir === 1 ? 0 : N - 1);

    return () => {
      delete el.__pagerStep;
      delete el.__pagerEnter;
    };
  }, [N]);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative min-h-dvh flex flex-col justify-center py-16 px-6"
    >
      {/* Encabezado + contador */}
      <div className="max-w-[460px] sm:max-w-[520px] mx-auto w-full mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="h-0.5 w-12 bg-[#D4F334]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              Selección de la semana
            </span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight uppercase text-[#1A1A1A] dark:text-[#F2F2F2] leading-none">
            Curado<br />a mano
          </h2>
        </div>
        <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400 tabular-nums shrink-0">
          {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </span>
      </div>

      {/* Stack de cartas */}
      <div className="relative mx-auto w-full max-w-[460px] sm:max-w-[520px] h-[clamp(360px,52vh,520px)]">
        {artworks.map((art, i) => {
          const d = i - index;
          const behind = Math.min(Math.max(d, 0), 3);
          const gone = d < 0;

          const style: CSSProperties = gone
            ? {
                transform: 'translateY(-128%) rotate(-3deg)',
                opacity: 0,
                zIndex: 60,
                pointerEvents: 'none',
              }
            : {
                transform: `translateY(${behind * 18}px) scale(${1 - behind * 0.05})`,
                opacity: d > 3 ? 0 : 1,
                zIndex: 50 - behind,
                pointerEvents: d === 0 ? 'auto' : 'none',
              };

          return (
            <article
              key={art.id}
              onClick={() => d === 0 && onSelectArtwork(art)}
              style={{
                ...style,
                transition:
                  'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease',
              }}
              className="absolute inset-0 rounded-[28px] overflow-hidden bg-white dark:bg-[#1A1A1A] border border-[#E6E6E6] dark:border-[#2A2A2A] shadow-2xl cursor-pointer flex flex-col will-change-transform"
            >
              <div className="relative flex-1 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-4 left-4 text-[9px] font-mono tracking-wider px-2 py-0.5 rounded font-black uppercase shadow-sm ${
                    art.status === 'Disponible'
                      ? 'bg-[#D4F334] text-[#1A1A1A]'
                      : art.status === 'Reservado'
                      ? 'bg-[#0084FF] text-white'
                      : 'bg-neutral-800 text-white'
                  }`}
                >
                  {art.status}
                </span>
              </div>

              <div className="p-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-sans font-extrabold text-lg leading-tight truncate text-[#1A1A1A] dark:text-[#F2F2F2]">
                    {art.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 truncate mt-0.5">
                    por {art.artistName}
                  </p>
                </div>
                <span className="shrink-0 px-3 py-1 rounded-full bg-[#E8F5FF] dark:bg-sky-950/40 text-[#0084FF] dark:text-sky-300 text-xs font-mono font-bold">
                  {formatPrice(art.price)}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pista de interacción */}
      <div className="mt-7 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        Desliza para barajar las piezas
      </div>
    </section>
  );
}
