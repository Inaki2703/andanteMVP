import { motion } from 'motion/react';
import { X, ShieldCheck, Heartbeat, PaperPlaneTilt, Check, MapPin, ShoppingBag, Trash } from '@phosphor-icons/react';
import { Artwork } from '../types';
import { EXHIBITION_DATA } from '../data';
import { formatPrice } from '../utils/formatPrice';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onAddToCart: (artwork: Artwork) => void;
  onRemoveFromCart: (artworkId: string) => void;
  onCheckoutDirectly: (artwork: Artwork) => void;
  isInCart: boolean;
}

export default function ArtworkDetailModal({
  artwork,
  onClose,
  onAddToCart,
  onRemoveFromCart,
  onCheckoutDirectly,
  isInCart
}: ArtworkDetailModalProps) {
  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop cover with soft responsive ambient opacity */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Centered responsive dialog container with 1pt white border and more compact sizing */}
      <div 
        className="relative w-full max-w-[840px] bg-surface rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col md:grid md:grid-cols-12 max-h-[90vh] md:h-[574px] border border-white transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Floating circular Close button on upper right corner */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 h-9 w-9 rounded-full bg-black/90 hover:bg-black text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-white/10"
          title="Cerrar vista"
        >
          {/* Custom double diagonal arrows or clean exit icon mapping Siena's style */}
          <svg className="h-4 w-4 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
          </svg>
        </button>

        {/* Column 1: Image container with overlay information */}
        <div className="relative md:col-span-6 h-[260px] md:h-full w-full bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 flex-shrink-0">
          <img
            src={artwork.image}
            alt={artwork.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Curved gradient layer to ensure year badge readability */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          {/* Year pill on bottom left panel */}
          <div className="absolute bottom-6 left-6 z-10">
            <span className="text-[9px] sm:text-[10px] font-mono font-black tracking-widest text-brand bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 px-3.5 py-1.5 rounded-full uppercase">
              AÑO {artwork.year}
            </span>
          </div>
        </div>

        {/* Column 2: Metadata specs and details info board */}
        <div className="md:col-span-6 p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full bg-surface text-neutral-800 dark:text-neutral-200 overflow-y-auto select-none">
          
          <div className="space-y-4">
            {/* Title & Technique - Inverted structural stack with reduced casing/size */}
            <div>
              {/* Casing: normal title case (Altas y bajas) with reduced font-size */}
              <h2 className="font-sans font-black text-lg sm:text-xl md:text-2xl leading-[1.1] text-neutral-900 dark:text-white tracking-tight">
                {artwork.title}
              </h2>
              
              {/* Technique/medium is now loaded below the main title heading */}
              <span className="text-[10px] font-mono tracking-[0.16em] text-accent font-black uppercase block mt-1.5">
                {artwork.medium.toUpperCase()}
              </span>
              
              {/* Author subtitle label */}
              <p className="font-sans text-xs italic text-neutral-500 dark:text-neutral-400 mt-1">
                Por {artwork.artistName}
              </p>
            </div>

            {/* Structured Specifications Table with optimized heights */}
            <div className="border-t border-b border-neutral-200/60 dark:border-neutral-800/60 py-2.5 my-1.5 space-y-2 font-sans text-xs sm:text-sm">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-neutral-400 dark:text-neutral-500 font-medium">Dimensiones</span>
                <span className="font-mono font-black text-neutral-800 dark:text-neutral-200">{artwork.dimensions}</span>
              </div>
              
              <div className="flex justify-between items-center py-0.5">
                <span className="text-neutral-400 dark:text-neutral-500 font-medium">Ubicación Actual</span>
                <span className="font-mono font-bold text-accent flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{EXHIBITION_DATA.locationName}</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-0.5">
                <span className="text-neutral-400 dark:text-neutral-500 font-medium">Certificado</span>
                <span className="font-mono font-black text-neutral-800 dark:text-neutral-200">Físico Incluido</span>
              </div>
            </div>

            {/* Curatorial feedback description */}
            <div className="space-y-1.5 text-left">
              <span className="text-[9px] font-mono font-black tracking-widest text-fg-muted uppercase block">
                RESEÑA CURATORIAL
              </span>
              <p className="font-sans text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 antialiased">
                {artwork.description}
              </p>
            </div>
          </div>

          {/* Footer Action segment */}
          <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 pt-4 mt-4 flex items-center justify-between gap-4">
            
            <div className="text-left">
              <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 block uppercase font-bold tracking-wider">
                ADQUISICIÓN ÚNICA
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                {formatPrice(artwork.price)}
              </span>
            </div>

            {artwork.status === 'Disponible' ? (
              <button
                onClick={() => {
                  if (isInCart) {
                    onCheckoutDirectly(artwork);
                  } else {
                    onAddToCart(artwork);
                  }
                }}
                className="btn-primary px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 min-w-[150px] overflow-hidden"
              >
                <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
                {isInCart ? (
                  <div className="relative overflow-hidden w-24 sm:w-28 h-4 flex items-center">
                    <motion.div
                      initial={{ x: "0%" }}
                      animate={{ x: "-50%" }}
                      transition={{ ease: "linear", duration: 4, repeat: Infinity }}
                      className="flex whitespace-nowrap"
                    >
                      <span className="pr-2">Ver mi bolsa •&nbsp;</span>
                      <span className="pr-2">Ver mi bolsa •&nbsp;</span>
                    </motion.div>
                  </div>
                ) : (
                  <span>Añadir a Bolsa</span>
                )}
              </button>
            ) : (
              <button
                disabled
                className="px-5 py-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-450 dark:text-neutral-500 font-sans text-[10px] sm:text-xs uppercase tracking-wider font-extrabold cursor-not-allowed"
              >
                Vendido ({artwork.status})
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
