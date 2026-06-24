import { useRef, RefObject, Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { useCoarsePointer } from '../hooks/useCoarsePointer';

interface ExhibitionFloatingWorksProps {
  artworks: Artwork[];
  backgroundImage: string;
  onSelectArtwork: (artwork: Artwork) => void;
}

const CARD_LAYOUTS = [
  { top: '8%', left: '4%', floatDelay: 0 },
  { top: '14%', left: '36%', floatDelay: 0.5 },
  { top: '10%', left: '66%', floatDelay: 1.0 },
  { top: '32%', left: '10%', floatDelay: 1.5 },
  { top: '28%', left: '48%', floatDelay: 2.0 },
  { top: '36%', left: '72%', floatDelay: 2.5 },
  { top: '52%', left: '20%', floatDelay: 3.0 },
  { top: '50%', left: '44%', floatDelay: 3.5 },
  { top: '58%', left: '62%', floatDelay: 4.0 },
];

function statusClass(status: Artwork['status']) {
  return status === 'Disponible'
    ? 'bg-brand text-on-brand'
    : status === 'Reservado'
      ? 'bg-accent text-on-accent'
      : 'bg-neutral-800 text-white';
}

function ArtworkCardFace({ artwork }: { artwork: Artwork }) {
  return (
    <div className="bg-surface/95 dark:bg-deep/95 backdrop-blur-md rounded-[20px] border border-border-soft shadow-xl overflow-hidden p-3 select-none">
      <div className="relative overflow-hidden aspect-square rounded-[14px] bg-neutral-100 dark:bg-neutral-900">
        <img
          src={artwork.image}
          alt=""
          referrerPolicy="no-referrer"
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded font-black uppercase shadow-sm ${statusClass(artwork.status)}`}
          >
            {artwork.status}
          </span>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-sans font-extrabold text-sm text-fg leading-tight truncate">
            {artwork.title}
          </h3>
          <span className="flex-shrink-0 px-2.5 py-0.5 bg-accent-soft text-accent text-[10px] font-mono font-extrabold rounded-full">
            {formatPrice(artwork.price)}
          </span>
        </div>
        <p className="text-[9px] font-mono font-bold text-neutral-500 tracking-wider uppercase">
          POR {artwork.artistName.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

interface FloatingCardProps {
  artwork: Artwork;
  layout: (typeof CARD_LAYOUTS)[number];
  containerRef: RefObject<HTMLDivElement | null>;
  onSelectArtwork: (artwork: Artwork) => void;
  reducedMotion: boolean;
}

function FloatingCard({
  artwork,
  layout,
  containerRef,
  onSelectArtwork,
  reducedMotion,
}: FloatingCardProps) {
  const dragMoved = useRef(false);

  return (
    <motion.div
      className="absolute z-10 w-[min(72vw,240px)] sm:w-[260px] cursor-grab active:cursor-grabbing touch-none"
      style={{ top: layout.top, left: layout.left }}
      drag={!reducedMotion}
      dragConstraints={containerRef}
      dragElastic={0.12}
      dragMomentum={false}
      whileDrag={{ scale: 1.04, zIndex: 20, boxShadow: '0 24px 48px rgba(0,0,0,0.25)' }}
      onDragStart={() => { dragMoved.current = true; }}
      animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
      transition={
        reducedMotion
          ? undefined
          : {
              y: {
                duration: 4.2,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
                delay: layout.floatDelay,
              },
            }
      }
      onClick={() => {
        if (dragMoved.current) {
          dragMoved.current = false;
          return;
        }
        onSelectArtwork(artwork);
      }}
    >
      <ArtworkCardFace artwork={artwork} />
    </motion.div>
  );
}

export default function ExhibitionFloatingWorks({
  artworks,
  backgroundImage,
  onSelectArtwork,
}: ExhibitionFloatingWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const isMobileLayout = coarsePointer;

  return (
    <section className="px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className={`relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm ${
            isMobileLayout
              ? 'h-[min(72vh,560px)] min-h-[360px]'
              : 'h-[75vh] min-h-[400px] max-h-[850px]'
          }`}
        >
          <img
            src={backgroundImage}
            alt=""
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

          {/* Desktop: cards flotantes arrastrables */}
          {!isMobileLayout && (
            <>
              {artworks.map((artwork, i) => (
                <Fragment key={artwork.id}>
                  <FloatingCard
                    artwork={artwork}
                    layout={CARD_LAYOUTS[i] ?? CARD_LAYOUTS[0]}
                    containerRef={containerRef}
                    onSelectArtwork={onSelectArtwork}
                    reducedMotion={!!reducedMotion}
                  />
                </Fragment>
              ))}
            </>
          )}

          {/* Mobile: fila scrollable — tap abre detalle */}
          {isMobileLayout && (
            <div className="absolute inset-x-0 bottom-0 z-10 pt-16 pb-4 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
              <div
                className="flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-4 pb-1 scrollbar-none"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {artworks.map((artwork) => (
                  <button
                    key={artwork.id}
                    type="button"
                    onClick={() => onSelectArtwork(artwork)}
                    className="focus-ring shrink-0 w-[min(72vw,220px)] snap-center text-left cursor-pointer"
                  >
                    <ArtworkCardFace artwork={artwork} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
