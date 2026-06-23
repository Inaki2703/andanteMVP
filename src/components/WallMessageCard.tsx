import { useState } from 'react';
import { Heart, MoreHorizontal, Flag, Pin, PinOff, EyeOff, Trash2 } from 'lucide-react';
import { WallMessage } from '../types';
import { STICKER_PALETTE } from '../data';
import { formatRelativeTime } from '../utils/relativeTime';

interface WallMessageCardProps {
  message: WallMessage;
  liked: boolean;
  onToggleHeart: (id: string) => void;
  artistMode?: boolean;
  onReport?: (id: string) => void;
  onTogglePin?: (id: string) => void;
  onHide?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// Etiqueta accesible para un sticker de la paleta.
function stickerAlt(emoji: string): string {
  return STICKER_PALETTE.find((s) => s.emoji === emoji)?.alt ?? 'sticker';
}

const roleBadge: Record<WallMessage['role'], { label: string; cls: string } | null> = {
  artista: { label: 'Artista', cls: 'bg-[#D4F334] text-[#333333]' },
  espacio: { label: 'Espacio anfitrión', cls: 'bg-[#0084FF] text-white' },
  visitante: null,
};

export default function WallMessageCard({
  message,
  liked,
  onToggleHeart,
  artistMode = false,
  onReport,
  onTogglePin,
  onHide,
  onDelete,
}: WallMessageCardProps) {
  const badge = roleBadge[message.role];
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  const menuItem =
    'w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-sans text-[#333333] dark:text-[#F2F2F2] hover:bg-[#F2F2F2] dark:hover:bg-[#242424] transition-colors cursor-pointer';

  return (
    <article className="bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] rounded-[20px] p-5 shadow-sm">
      {/* Encabezado: autor + rol + timestamp + menú */}
      <header className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-sans font-semibold text-sm text-[#333333] dark:text-[#F2F2F2] truncate">
            {message.author}
          </span>
          {badge && (
            <span className={`flex-shrink-0 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.cls}`}>
              {badge.label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <time
            dateTime={message.createdAt}
            className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wide"
          >
            {formatRelativeTime(message.createdAt)}
          </time>
          {/* Menú de acciones */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Más acciones"
              className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#333333] dark:hover:text-[#F2F2F2] hover:bg-[#F2F2F2] dark:hover:bg-[#242424] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0084FF]"
            >
              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
            {menuOpen && (
              <>
                {/* Capa para cerrar al hacer clic fuera */}
                <div className="fixed inset-0 z-10" onClick={close} aria-hidden="true" />
                <div
                  role="menu"
                  className="absolute right-0 top-9 z-20 w-44 bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] rounded-xl shadow-md overflow-hidden py-1"
                >
                  {artistMode ? (
                    <>
                      <button type="button" role="menuitem" className={menuItem} onClick={() => { onTogglePin?.(message.id); close(); }}>
                        {message.pinned ? <PinOff className="h-3.5 w-3.5" aria-hidden="true" /> : <Pin className="h-3.5 w-3.5" aria-hidden="true" />}
                        {message.pinned ? 'Quitar fijado' : 'Fijar arriba'}
                      </button>
                      <button type="button" role="menuitem" className={menuItem} onClick={() => { onHide?.(message.id); close(); }}>
                        <EyeOff className="h-3.5 w-3.5" aria-hidden="true" /> Ocultar
                      </button>
                      <button type="button" role="menuitem" className={`${menuItem} text-red-600 dark:text-red-400`} onClick={() => { onDelete?.(message.id); close(); }}>
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Eliminar
                      </button>
                    </>
                  ) : (
                    <button type="button" role="menuitem" className={menuItem} onClick={() => { onReport?.(message.id); close(); }}>
                      <Flag className="h-3.5 w-3.5" aria-hidden="true" /> Reportar
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Contenido: texto y/o sticker */}
      {message.text && (
        <p className="font-sans text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {message.text}
        </p>
      )}
      {message.sticker && (
        <div className={message.text ? 'mt-3' : ''}>
          <span role="img" aria-label={stickerAlt(message.sticker)} className="text-3xl leading-none">
            {message.sticker}
          </span>
        </div>
      )}

      {/* Reacción ❤️ con contador */}
      <footer className="mt-4 flex items-center">
        <button
          type="button"
          onClick={() => onToggleHeart(message.id)}
          aria-pressed={liked}
          aria-label={liked ? 'Quitar me gusta' : 'Me gusta'}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 hover:text-red-500 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0084FF] rounded-md px-1.5 py-1 -ml-1.5"
        >
          <Heart
            className={`h-4 w-4 stroke-[1.75] transition-colors ${liked ? 'fill-red-500 text-red-500 stroke-red-500' : ''}`}
            aria-hidden="true"
          />
          <span className="tabular-nums">{message.hearts}</span>
        </button>
      </footer>
    </article>
  );
}
