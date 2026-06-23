import { useRef, useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Artwork } from '../types';
import ArtworkCard from './ArtworkCard';

interface ArtworkScrollerProps {
  artworks: Artwork[];
  artistName: string;
  onSelectArtwork: (artwork: Artwork) => void;
}

// Tira de obra con scroll horizontal NATIVO bien señalizado:
// flechas siempre visibles, items que asoman (peeking), barra de progreso,
// teclado (←/→) y swipe en mobile. Respeta prefers-reduced-motion.
export default function ArtworkScroller({ artworks, artistName, onSelectArtwork }: ArtworkScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [thumbPct, setThumbPct] = useState(100); // ancho del thumb en %
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setProgress(max > 0 ? left / max : 0);
    setThumbPct(el.scrollWidth > 0 ? Math.min(100, (el.clientWidth / el.scrollWidth) * 100) : 100);
    setAtStart(left <= 1);
    setAtEnd(left >= max - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 280);
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';
    el.scrollBy({ left: dir * amount, behavior });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCards(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCards(-1);
    }
  };

  const arrowBase =
    'h-11 w-11 flex items-center justify-center rounded-full border border-border bg-surface text-fg transition-all hover:border-accent hover:text-[#0084FF] dark:hover:text-[#3D9DFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:focus-visible:ring-[#3D9DFF] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#E6E6E6] disabled:hover:text-[#333333] cursor-pointer';

  return (
    <div>
      {/* Cabecera: título + flechas SIEMPRE visibles */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
            — Su obra
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-fg mt-2">
            Obra relevante
          </h2>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Ver obras anteriores"
            className={arrowBase}
          >
            <CaretLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Ver más obras"
            className={arrowBase}
          >
            <CaretRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Pista con scroll nativo (no secuestra el scroll vertical) */}
      <div
        ref={scrollRef}
        role="region"
        aria-label={`Obra relevante de ${artistName}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory motion-safe:scroll-smooth rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:focus-visible:ring-[#3D9DFF] focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#0E0E0E]"
      >
        {artworks.map((art) => (
          // Ancho < contenedor → el último item "asoma" (peeking)
          <div key={art.id} className="snap-start shrink-0 w-[78%] sm:w-[300px]">
            <ArtworkCard artwork={art} onSelect={onSelectArtwork} className="w-full h-full" />
          </div>
        ))}
      </div>

      {/* Indicador de progreso visible */}
      <div
        className="mt-2 h-1.5 w-full bg-[#E6E6E6] dark:bg-[#333333] rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-accent dark:bg-[#3D9DFF] rounded-full motion-reduce:transition-none transition-[margin] duration-150"
          style={{
            width: `${thumbPct}%`,
            marginLeft: `${progress * (100 - thumbPct)}%`,
          }}
        />
      </div>
    </div>
  );
}
