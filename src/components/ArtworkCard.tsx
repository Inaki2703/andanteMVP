import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect?: (artwork: Artwork) => void;
  className?: string;
}

// Tarjeta de Obra reutilizable: imagen → título (Syne 600) → artista + precio (Syne Mono).
// Hover: shadow-md + título azul. El precio SIEMPRE visible.
export default function ArtworkCard({ artwork, onSelect, className = '' }: ArtworkCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(artwork)}
      className={`group flex flex-col text-left bg-surface rounded-[24px] border border-[#E6E6E6] dark:border-[#2D2D2D]/60 transition-all duration-300 hover:shadow-md overflow-hidden p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:focus-visible:ring-[#3D9DFF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E0E0E] ${className}`}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-square rounded-[18px] bg-neutral-100 dark:bg-neutral-900">
        <img
          src={artwork.image}
          alt={artwork.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {/* Estado de la obra */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded font-black uppercase shadow-sm ${
              artwork.status === 'Disponible'
                ? 'bg-brand text-on-brand'
                : artwork.status === 'Reservado'
                ? 'bg-accent text-white'
                : 'bg-neutral-800 text-white'
            }`}
          >
            {artwork.status}
          </span>
        </div>
      </div>

      {/* Meta: título + precio (siempre visible) + artista */}
      <div className="mt-5 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-sans font-semibold text-base sm:text-lg text-fg group-hover:text-accent dark:group-hover:text-[#3D9DFF] transition-colors leading-tight">
            {artwork.title}
          </h3>
          <span className="flex-shrink-0 px-3 py-1 bg-[#E8F5FF] dark:bg-sky-950/40 text-accent text-[11px] font-mono font-extrabold rounded-full">
            {formatPrice(artwork.price)}
          </span>
        </div>
        <p className="text-[10px] font-mono font-bold text-neutral-500 tracking-wider uppercase mt-1">
          POR {artwork.artistName.toUpperCase()}
        </p>
      </div>
    </button>
  );
}
