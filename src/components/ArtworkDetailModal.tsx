import { useEffect, useRef } from 'react';
import { X, MapPin, ShoppingBag } from '@phosphor-icons/react';
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
  onCheckoutDirectly,
  isInCart,
}: ArtworkDetailModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!artwork) return;
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [artwork]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md transition-opacity duration-300"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${artwork.title}`}
        className="relative w-full max-w-[840px] max-h-[90vh] overflow-y-auto overscroll-contain bg-surface rounded-[32px] shadow-2xl z-10 flex flex-col md:grid md:grid-cols-12 border border-white transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Columna imagen: object-contain sobre grid de puntos */}
        <div className="relative md:col-span-6 h-[260px] md:min-h-[420px] md:h-auto w-full bg-page grid-dot-pattern border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 flex-shrink-0">
          <img
            src={artwork.image}
            alt={artwork.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-contain object-center"
          />

          <div className="absolute bottom-6 left-6 z-10">
            <span className="text-[9px] sm:text-[10px] font-mono font-black tracking-widest text-brand bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 px-3.5 py-1.5 rounded-full uppercase">
              AÑO {artwork.year}
            </span>
          </div>
        </div>

        {/* Columna ficha */}
        <div className="md:col-span-6 p-6 sm:p-7 md:p-8 flex flex-col gap-6 bg-surface text-neutral-800 dark:text-neutral-200 select-none">
          {/* Cerrar en su propia fila */}
          <div className="flex justify-end -mt-1 -mr-1">
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="focus-ring h-10 w-10 rounded-full bg-fg/10 hover:bg-fg/20 text-fg flex items-center justify-center transition-colors cursor-pointer border border-fg/10"
              title="Cerrar vista"
              aria-label="Cerrar vista de la obra"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <div className="space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl md:text-2xl leading-[1.15] text-neutral-900 dark:text-white tracking-tight pr-2">
                {artwork.title}
              </h2>
              <span className="text-[10px] font-mono tracking-[0.16em] text-accent font-black uppercase block">
                {artwork.medium.toUpperCase()}
              </span>
              <p className="font-sans text-xs italic text-neutral-500 dark:text-neutral-400">
                Por {artwork.artistName}
              </p>
            </div>

            <div className="border-t border-b border-neutral-200/60 dark:border-neutral-800/60 py-3 space-y-2.5 font-sans text-xs sm:text-sm">
              <div className="flex justify-between items-center gap-3">
                <span className="text-neutral-400 dark:text-neutral-500 font-medium">Dimensiones</span>
                <span className="font-mono font-black text-neutral-800 dark:text-neutral-200 text-right">
                  {artwork.dimensions}
                </span>
              </div>

              <div className="flex justify-between items-center gap-3">
                <span className="text-neutral-400 dark:text-neutral-500 font-medium">Ubicación Actual</span>
                <span className="font-mono font-bold text-accent flex items-center gap-1 shrink-0">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{EXHIBITION_DATA.locationName}</span>
                </span>
              </div>

              <div className="flex justify-between items-center gap-3">
                <span className="text-neutral-400 dark:text-neutral-500 font-medium">Certificado</span>
                <span className="font-mono font-black text-neutral-800 dark:text-neutral-200">
                  Físico Incluido
                </span>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <span className="text-[9px] font-mono font-black tracking-widest text-fg-muted uppercase block">
                RESEÑA CURATORIAL
              </span>
              <p className="font-sans text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 antialiased">
                {artwork.description}
              </p>
            </div>
          </div>

          {/* Footer: precio + CTA en una línea */}
          <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 pt-5 flex items-center justify-between gap-4">
            <div className="text-left min-w-0">
              <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 block uppercase font-bold tracking-wider">
                ADQUISICIÓN ÚNICA
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                {formatPrice(artwork.price)}
              </span>
            </div>

            {artwork.status === 'Disponible' ? (
              <button
                type="button"
                onClick={() => {
                  if (isInCart) {
                    onCheckoutDirectly(artwork);
                  } else {
                    onAddToCart(artwork);
                  }
                }}
                className="btn-primary shrink-0 px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{isInCart ? 'Ver mi bolsa' : 'Añadir a Bolsa'}</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="shrink-0 px-5 py-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-450 dark:text-neutral-500 font-sans text-[10px] sm:text-xs uppercase tracking-wider font-extrabold cursor-not-allowed whitespace-nowrap"
              >
                {artwork.status === 'Reservado' ? 'Reservado' : 'Vendido'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
