import { useRef, useState, useEffect, CSSProperties } from 'react';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface CuratedStackProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectArtist: (artistId: string) => void;
}

// Scroll por carta: cuánto viewport hay que recorrer para barajar cada pieza.
const SCROLL_PER_CARD_VH = 90;

// Sección "Curado a mano" con pin sticky scroll-driven (estilo riseatseven, pero
// con scroll NATIVO en vez de gesto secuestrado por el pager). La sección es alta;
// su contenido (texto + stack) queda fijo a media pantalla con `sticky`, y la
// posición del stack (`pos`, continua) se deriva del progreso de scroll. Así el
// recorrido Hero → Expo → Curado es fluido, sin "grab" de snap.
export default function CuratedStack({ artworks, onSelectArtwork, onSelectArtist }: CuratedStackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  // pos ∈ [0, N-1]: posición continua del stack (0 = primera carta al frente).
  const [pos, setPos] = useState(0);
  const N = artworks.length;

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight; // recorrido útil
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;
      setPos(progress * Math.max(N - 1, 0));
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [N]);

  // Carta "activa" (la del frente) para el contador y el click.
  const front = Math.round(pos);
  // Alto total: una pantalla de recorrido por carta + una pantalla de remate.
  const sectionHeight = `${(N - 1) * SCROLL_PER_CARD_VH + 100}vh`;

  return (
    <section
      ref={sectionRef}
      data-free-scroll
      className="relative"
      style={{ height: sectionHeight }}
    >
      {/* Contenido fijado a media pantalla mientras la sección alta hace scroll. */}
      <div className="sticky top-0 h-dvh flex items-center py-16 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-12 lg:gap-20 items-center">

          {/* Columna izquierda: bloque de texto (sticky a media pantalla) */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 mb-4">
              <span className="h-0.5 w-12 bg-brand" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
                Selección de la semana
              </span>
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase text-fg leading-[0.95]">
              Curado<br />a mano
            </h2>
            <p className="mt-6 max-w-sm text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
              No es un catálogo infinito. Cada pieza pasó por una mirada. Desliza para barajar la selección de esta semana.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-mono text-base text-fg tabular-nums">
                {String(front + 1).padStart(2, '0')}
                <span className="text-neutral-400 dark:text-neutral-600"> / {String(N).padStart(2, '0')}</span>
              </span>
              <span className="h-px flex-1 max-w-[140px] bg-[#E6E6E6] dark:bg-neutral-800 relative overflow-hidden">
                <span
                  className="absolute inset-y-0 left-0 bg-brand"
                  style={{ width: `${N > 1 ? (pos / (N - 1)) * 100 : 100}%` }}
                />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                Desliza ↓
              </span>
            </div>
          </div>

          {/* Columna derecha: stack de cartas (posición continua según scroll) */}
          <div className="relative w-full max-w-[680px] mx-auto lg:mx-0 lg:ml-auto h-[clamp(420px,60vh,620px)]">
          {artworks.map((art, i) => {
            const d = i - pos; // distancia continua respecto al frente
            let style: CSSProperties;

            if (d < 0) {
              // Saliendo hacia arriba: interpola del frente (t=0) a "ida" (t=1).
              const t = Math.min(-d, 1);
              style = {
                transform: `translateY(${t * -128}%) rotate(${t * -3}deg)`,
                opacity: 1 - t,
                zIndex: 60,
                pointerEvents: 'none',
              };
            } else {
              const behind = Math.min(d, 3);
              style = {
                transform: `translateY(${behind * 18}px) scale(${1 - behind * 0.05})`,
                opacity: d > 3 ? 0 : 1,
                zIndex: 50 - Math.round(behind),
                pointerEvents: front === i ? 'auto' : 'none',
              };
            }

            return (
              <article
                key={art.id}
                onClick={() => front === i && onSelectArtwork(art)}
                style={style}
                className="absolute inset-0 rounded-[28px] overflow-hidden bg-canvas border border-[#E6E6E6] dark:border-[#2A2A2A] shadow-2xl cursor-pointer flex flex-col will-change-transform"
              >
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={art.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-4 left-4 text-[9px] font-mono tracking-wider px-2 py-0.5 rounded font-black uppercase shadow-sm ${
                      art.status === 'Disponible'
                        ? 'bg-brand text-on-brand'
                        : art.status === 'Reservado'
                        ? 'bg-accent text-on-accent'
                        : 'bg-neutral-800 text-white'
                    }`}
                  >
                    {art.status}
                  </span>
                </div>

                <div className="p-5 sm:p-6 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-sans font-extrabold text-lg sm:text-xl leading-tight truncate text-fg">
                      {art.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 truncate mt-0.5">
                      por{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectArtist(art.artistId);
                        }}
                        className="focus-ring underline-offset-2 hover:underline hover:text-accent transition-colors cursor-pointer"
                      >
                        {art.artistName}
                      </button>
                    </p>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-[#E8F5FF] dark:bg-sky-950/40 text-accent text-xs font-mono font-bold">
                    {formatPrice(art.price)}
                  </span>
                </div>
              </article>
            );
          })}
          </div>

        </div>
      </div>
    </section>
  );
}
