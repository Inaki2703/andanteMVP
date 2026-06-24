import { useRef, RefObject, Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface ExhibitionFloatingWorksProps {
  artworks: Artwork[];
  backgroundImage: string;
  onSelectArtwork: (artwork: Artwork) => void;
}

const CARD_LAYOUTS = [
  { top: '14%', left: '6%', floatDelay: 0 },
  { top: '32%', left: '52%', floatDelay: 0.9 },
  { top: '52%', left: '18%', floatDelay: 1.8 },
];

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

  const statusClass =
    artwork.status === 'Disponible'
      ? 'bg-brand text-on-brand'
      : artwork.status === 'Reservado'
      ? 'bg-accent text-on-accent'
      : 'bg-neutral-800 text-white';

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
                ease: 'easeInOut',
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
              className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded font-black uppercase shadow-sm ${statusClass}`}
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

  return (
    <section className="px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm h-[75vh] min-h-[400px] max-h-[850px]"
        >
          <img
            src={backgroundImage}
            alt=""
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

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
        </div>
      </div>
    </section>
  );
}
