import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface EmptySelectionViewProps {
  artworks: Artwork[];
  setView: (view: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const instantVariants = {
  hidden: { opacity: 1, y: 0, x: 0 },
  visible: { opacity: 1, y: 0, x: 0 },
};

const FRAME_LAYOUT = [
  {
    className:
      'left-0 top-0 z-30 w-[5.5rem] h-[6.75rem] sm:w-32 sm:h-40 -rotate-6 lg:-rotate-8',
    delay: '',
  },
  {
    className:
      'left-[38%] sm:left-[42%] top-6 sm:top-8 z-20 w-[4.75rem] h-[5.75rem] sm:w-28 sm:h-36 rotate-5 lg:rotate-10 graphic-shadow',
    delay: 'empty-float-delay-1',
  },
  {
    className:
      'right-0 sm:right-2 bottom-0 z-10 w-[4.25rem] h-[5.25rem] sm:w-24 sm:h-28 rotate-3 lg:-rotate-2',
    delay: 'empty-float-delay-2',
  },
] as const;

export default function EmptySelectionView({
  artworks,
  setView,
  onSelectArtwork,
}: EmptySelectionViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const available = artworks.filter((a) => a.status !== 'Vendido').slice(0, 3);
  const variants = prefersReducedMotion ? instantVariants : itemVariants;
  const slideIn = prefersReducedMotion ? instantVariants : slideVariants;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain py-4 sm:py-6 lg:py-8 select-none"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-full px-1 sm:px-2">
        {/* Editorial copy — left, asymmetric */}
        <div className="lg:col-span-7 relative order-2 lg:order-1">
          <span
            className="empty-editorial-watermark absolute -top-6 sm:-top-10 -left-2 sm:-left-4 lg:-left-8"
            aria-hidden="true"
          >
            00
          </span>

          <motion.div variants={variants} className="relative z-10 space-y-4 sm:space-y-5 text-left">
            <div className="flex items-center gap-3">
              <span className="empty-lima-rule flex-shrink-0" aria-hidden="true" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#0084FF] dark:text-[#3D9DFF] font-bold uppercase">
                Tu colección
              </span>
            </div>

            <h2 className="font-sans font-bold text-[clamp(1.75rem,5.5vw,3.25rem)] text-[#333333] dark:text-[#F2F2F2] tracking-tighter leading-[1.02] max-w-[14ch] sm:max-w-[16ch]">
              Tu colección está esperando su{' '}
              <span className="relative inline-block">
                <span className="relative z-10">primera pieza.</span>
                <span
                  className="absolute left-0 right-0 bottom-1 sm:bottom-1.5 h-[0.45em] bg-[#D4F334] -z-0 opacity-90"
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#5C5C5C] dark:text-[#B8B8B8] leading-relaxed max-w-md pl-0 sm:pl-1">
              Todavía no has guardado ni comprado nada. Anda la galería y encuentra algo que te haga sentir.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => setView('exhibition')}
                className="btn-primary w-full sm:w-auto text-xs uppercase tracking-wider flex items-center justify-center gap-2 interactive-tap"
              >
                <span>Explorar obras</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('landing')}
                className="btn-secondary w-full sm:w-auto text-xs uppercase tracking-wider interactive-tap"
              >
                Conocer artistas
              </button>
            </div>
          </motion.div>
        </div>

        {/* Frame cluster — right, overlapping */}
        <motion.div
          variants={slideIn}
          className="lg:col-span-5 order-1 lg:order-2 relative empty-frame-cluster flex-shrink-0"
        >
          <div
            className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-[#D4F334]/15 dark:bg-[#D4F334]/8 border border-[#D4F334]/25 ${prefersReducedMotion ? '' : 'empty-breathe'}`}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 border border-dashed border-[#E6E6E6] dark:border-[#333333]/80 rounded-[28px] rotate-2 pointer-events-none opacity-60"
            aria-hidden="true"
          />

          {available.length > 0 ? (
            available.map((art, i) => {
              const layout = FRAME_LAYOUT[i] ?? FRAME_LAYOUT[0];
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => onSelectArtwork(art)}
                  className={`absolute ${layout.className} rounded-2xl overflow-hidden border-2 border-[#333333] dark:border-[#F2F2F2] bg-white dark:bg-[#1F1F1F] cursor-pointer transition-smooth hover:scale-[1.04] hover:z-40 focus:outline-none focus:ring-2 focus:ring-[#0084FF] dark:focus:ring-[#3D9DFF] ${prefersReducedMotion ? '' : `empty-float ${layout.delay}`.trim()}`}
                  aria-label={`Ver ${art.title} de ${art.artistName}`}
                >
                  <img
                    src={art.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })
          ) : (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-dashed border-[#333333] dark:border-[#F2F2F2] flex items-center justify-center bg-white/80 dark:bg-[#1A1A1A]/80">
              <Sparkles className="h-8 w-8 text-[#D4F334]" />
            </div>
          )}
        </motion.div>
      </div>

      {/* Discovery strip — full bleed horizontal */}
      {available.length > 0 && (
        <motion.div variants={variants} className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 lg:mt-12 flex-shrink-0 px-1 sm:px-2">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] dark:text-[#7A7A7A] uppercase font-bold whitespace-nowrap">
              Obras para empezar
            </span>
            <span className="h-px flex-grow bg-[#E6E6E6] dark:bg-[#333333]" aria-hidden="true" />
            <span className="text-[10px] font-mono text-[#D4F334] font-bold hidden sm:inline">↗</span>
          </div>

          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:gap-4">
            {available.map((art, i) => (
              <button
                key={art.id}
                type="button"
                onClick={() => onSelectArtwork(art)}
                className={`group flex items-center gap-3 bg-white dark:bg-[#1A1A1A] border border-[#E6E6E6] dark:border-[#333333] rounded-xl p-3 sm:p-4 transition-smooth hover:border-[#0084FF] dark:hover:border-[#3D9DFF] hover:shadow-md cursor-pointer text-left flex-shrink-0 snap-start w-[min(88vw,300px)] sm:w-auto sm:hover:-translate-y-0.5 ${i === 1 ? 'sm:mt-3' : ''}`}
              >
                <span className="text-[10px] font-mono font-bold text-[#0084FF] dark:text-[#3D9DFF] w-5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img
                  src={art.image}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0 border border-[#E6E6E6] dark:border-[#333333] group-hover:scale-[1.02] transition-smooth"
                />
                <div className="min-w-0 flex-grow">
                  <p className="font-sans font-semibold text-sm text-[#333333] dark:text-[#F2F2F2] truncate">
                    {art.title}
                  </p>
                  <p className="text-[10px] font-mono text-[#0084FF] dark:text-[#3D9DFF] uppercase truncate">
                    {art.artistName}
                  </p>
                  <p className="text-[10px] font-mono text-[#8A8A8A] dark:text-[#7A7A7A] mt-0.5">
                    {formatPrice(art.price)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
