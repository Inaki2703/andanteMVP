import { useRef, Fragment, useEffect, useState } from 'react';
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
  { top: '8%', left: '4%', floatDelay: 0, rotate: 1 },
  { top: '14%', left: '36%', floatDelay: 0.5, rotate: -1 },
  { top: '10%', left: '66%', floatDelay: 1.0, rotate: 1 },
  { top: '32%', left: '10%', floatDelay: 1.5, rotate: -1 },
  { top: '28%', left: '48%', floatDelay: 2.0, rotate: 1 },
  { top: '36%', left: '72%', floatDelay: 2.5, rotate: -1 },
  { top: '52%', left: '20%', floatDelay: 3.0, rotate: 1 },
  { top: '50%', left: '44%', floatDelay: 3.5, rotate: -1 },
  { top: '58%', left: '62%', floatDelay: 4.0, rotate: 1 },
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
  onSelectArtwork: (artwork: Artwork) => void;
  reducedMotion: boolean;
  isClone: boolean;
  onDragChange: (dragging: boolean) => void;
}

function FloatingCard({
  artwork,
  layout,
  onSelectArtwork,
  reducedMotion,
  isClone,
  onDragChange,
}: FloatingCardProps) {
  const canAnimate = !reducedMotion && !isClone;

  return (
    <motion.div
      className="absolute z-10 w-[min(72vw,240px)] sm:w-[260px] cursor-grab active:cursor-grabbing touch-none"
      style={{ top: layout.top, left: layout.left }}
      drag={canAnimate}
      dragConstraints={false}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{ scale: 1.04, zIndex: 50, boxShadow: '0 24px 48px rgba(0,0,0,0.25)' }}
      onDragStart={() => onDragChange(true)}
      onDragEnd={() => onDragChange(false)}
      onTap={() => onSelectArtwork(artwork)}
    >
      <motion.div
        animate={
          canAnimate
            ? { y: [0, -10, 0], rotate: layout.rotate }
            : { rotate: layout.rotate }
        }
        transition={
          canAnimate
            ? {
                y: {
                  duration: 4.2,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  delay: layout.floatDelay,
                },
                rotate: { duration: 0 },
              }
            : undefined
        }
      >
        <ArtworkCardFace artwork={artwork} />
      </motion.div>
    </motion.div>
  );
}

export default function ExhibitionFloatingWorks({
  artworks,
  backgroundImage,
  onSelectArtwork,
}: ExhibitionFloatingWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isClone, setIsClone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const isMobileLayout = coarsePointer;

  useEffect(() => {
    if (rootRef.current?.closest('[data-loop-clone]')) {
      setIsClone(true);
    }
  }, []);

  return (
    <section
      ref={rootRef}
      className={`px-6 bg-transparent overflow-visible ${isDragging ? 'relative z-40' : ''}`}
    >
      <div className="max-w-7xl mx-auto overflow-visible">
        <div
          ref={containerRef}
          className={`relative overflow-visible ${
            isMobileLayout
              ? 'h-[min(72vh,560px)] min-h-[360px]'
              : 'h-[75vh] min-h-[400px] max-h-[850px]'
          }`}
        >
          <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm">
            <img
              src={backgroundImage}
              alt=""
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
          </div>

          {/* Desktop: cards flotantes arrastrables */}
          {!isMobileLayout && (
            <>
              {artworks.map((artwork, i) => (
                <Fragment key={artwork.id}>
                  <FloatingCard
                    artwork={artwork}
                    layout={CARD_LAYOUTS[i] ?? CARD_LAYOUTS[0]}
                    onSelectArtwork={onSelectArtwork}
                    reducedMotion={!!reducedMotion}
                    isClone={isClone}
                    onDragChange={setIsDragging}
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
