import { useState, Dispatch, SetStateAction } from 'react';
import { Pin, CheckCircle2 } from 'lucide-react';
import { WallMessage } from '../types';
import WallComposer, { WallDraft } from './WallComposer';
import WallMessageCard from './WallMessageCard';

interface CommunityWallProps {
  artistId: string;
  artistName: string;
  messages: WallMessage[];
  setMessages: Dispatch<SetStateAction<WallMessage[]>>;
}

export default function CommunityWall({ artistId, artistName, messages, setMessages }: CommunityWallProps) {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [artistMode, setArtistMode] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const firstName = artistName.split(' ')[0];

  // Publicación optimista: aparece arriba al instante.
  const handleSubmit = (draft: WallDraft) => {
    const msg: WallMessage = {
      id: `wall-${Date.now()}`,
      artistId,
      author: draft.author,
      role: 'visitante',
      text: draft.text || undefined,
      sticker: draft.sticker,
      createdAt: new Date().toISOString(),
      hearts: 0,
    };
    setMessages((prev) => [msg, ...prev]);
  };

  // Reacción ❤️ (updaters puros y separados, seguros ante StrictMode).
  const handleToggleHeart = (id: string) => {
    const liked = likedIds.has(id);
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (liked) next.delete(id);
      else next.add(id);
      return next;
    });
    setMessages((msgs) =>
      msgs.map((m) => (m.id === id ? { ...m, hearts: m.hearts + (liked ? -1 : 1) } : m))
    );
  };

  // Reportar (visitante): oculta localmente + confirmación empática.
  const handleReport = (id: string) => {
    setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, hidden: true } : m)));
    setNotice('Gracias por avisarnos. Ocultamos ese mensaje para vos. 🙏');
  };

  // Controles de la artista (modo dueña, simulado).
  const handleTogglePin = (id: string) => {
    setMessages((msgs) =>
      msgs.map((m) =>
        m.id === id ? { ...m, pinned: !m.pinned } : { ...m, pinned: false } // un solo mensaje fijado
      )
    );
  };

  const handleHide = (id: string) => {
    setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, hidden: true } : m)));
    setNotice('Ocultaste ese mensaje. Ya no aparece en el muro.');
  };

  const handleDelete = (id: string) => {
    setMessages((msgs) => msgs.filter((m) => m.id !== id));
    setNotice('Eliminaste ese mensaje del muro.');
  };

  const visible = messages.filter((m) => !m.hidden);
  const pinned = visible.filter((m) => m.pinned);
  const rest = visible
    .filter((m) => !m.pinned)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section aria-labelledby="muro-title">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
            — La comunidad opina
          </span>
          <h2 id="muro-title" className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-fg mt-2">
            El muro de {firstName}
          </h2>
        </div>

        {/* Toggle de demo: Vista artista (sin auth real) */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none flex-shrink-0">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Vista artista
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={artistMode}
            aria-label="Activar vista artista (controles de moderación)"
            onClick={() => setArtistMode((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E0E0E] focus-visible:ring-accent ${
              artistMode ? 'bg-accent dark:bg-[#3D9DFF]' : 'bg-[#D1D5DB] dark:bg-[#444]'
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${artistMode ? 'translate-x-5' : ''}`} />
          </button>
        </label>
      </div>

      <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-xl leading-relaxed">
        Dejá un mensaje, sumá un sticker y formá parte de su historia. Lo que escribas lo verá toda la comunidad.
      </p>

      {/* Aviso de confirmación (reportar / moderar) */}
      {notice && (
        <div
          role="status"
          className="mt-4 flex items-center gap-2 text-sm text-fg bg-[#E8F5FF] dark:bg-sky-950/40 border border-[#0084FF]/30 rounded-xl px-4 py-3"
        >
          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
          <span>{notice}</span>
        </div>
      )}

      {/* Composer */}
      <div className="mt-8">
        <WallComposer onSubmit={handleSubmit} />
      </div>

      {/* Mensaje(s) fijado(s) arriba, a ancho completo */}
      {pinned.length > 0 && (
        <div className="mt-8 space-y-4">
          {pinned.map((m) => (
            <div key={m.id} className="relative">
              <span className="absolute -top-2.5 left-5 z-10 inline-flex items-center gap-1 bg-accent dark:bg-[#3D9DFF] text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                <Pin className="h-3 w-3" aria-hidden="true" /> Fijado
              </span>
              <WallMessageCard
                message={m}
                liked={likedIds.has(m.id)}
                onToggleHeart={handleToggleHeart}
                artistMode={artistMode}
                onReport={handleReport}
                onTogglePin={handleTogglePin}
                onHide={handleHide}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}

      {/* Feed masonry (orden del DOM = orden visual, columnas en flujo de fuente) */}
      {rest.length > 0 && (
        <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 [column-gap:1.25rem]">
          {rest.map((m) => (
            <div key={m.id} className="mb-5 break-inside-avoid">
              <WallMessageCard
                message={m}
                liked={likedIds.has(m.id)}
                onToggleHeart={handleToggleHeart}
                artistMode={artistMode}
                onReport={handleReport}
                onTogglePin={handleTogglePin}
                onHide={handleHide}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}

      {visible.length === 0 && (
        <p className="mt-8 font-sans text-sm text-neutral-500 dark:text-neutral-400 italic">
          Todavía no hay mensajes visibles. Sé quien rompe el hielo.
        </p>
      )}
    </section>
  );
}
