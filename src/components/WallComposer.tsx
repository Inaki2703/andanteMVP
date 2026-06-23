import { useState, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { STICKER_PALETTE } from '../data';
import { containsBannedWord, MIN_COMPOSE_MS, RATE_LIMIT_MS } from '../utils/moderation';

const MAX_CHARS = 140;

export interface WallDraft {
  author: string;
  text: string;
  sticker?: string;
}

interface WallComposerProps {
  onSubmit: (draft: WallDraft) => void;
}

export default function WallComposer({ onSubmit }: WallComposerProps) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [sticker, setSticker] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Anti-spam: momento en que se empezó a redactar y último envío (persisten sin re-render).
  const composeStartedAt = useRef<number | null>(null);
  const lastSubmitAt = useRef<number | null>(null);

  const markComposing = () => {
    if (composeStartedAt.current === null) composeStartedAt.current = Date.now();
  };

  const remaining = MAX_CHARS - text.length;
  const hasContent = text.trim().length > 0 || Boolean(sticker);
  const canSubmit = author.trim().length > 0 && hasContent;

  const handleSubmit = () => {
    // Anti-spam: campos vacíos
    if (!canSubmit) return;

    // Filtro de groserías (cliente, mock) con mensaje empático
    if (text && containsBannedWord(text)) {
      setError('Uy, ese mensaje tiene palabras que preferimos dejar afuera. Reescribilo con buena onda y volvé a intentar. 💛');
      return;
    }

    const now = Date.now();

    // Anti-spam: envío demasiado rápido desde que se empezó a escribir
    if (composeStartedAt.current !== null && now - composeStartedAt.current < MIN_COMPOSE_MS) {
      setError('Tomate un respiro — escribí con calma y volvé a enviar en un momentito.');
      return;
    }

    // Anti-spam: rate limit (1 cada 15 s)
    if (lastSubmitAt.current !== null && now - lastSubmitAt.current < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitAt.current)) / 1000);
      setError(`Acabás de dejar un mensaje. Esperá ${wait} s antes del próximo. 🙌`);
      return;
    }

    onSubmit({ author: author.trim(), text: text.trim(), sticker });
    lastSubmitAt.current = now;
    composeStartedAt.current = null;
    setError(null);
    // Limpiar el contenido pero conservar el nombre para mensajes consecutivos
    setText('');
    setSticker(undefined);
  };

  return (
    <div className="bg-input dark:bg-input border border-border rounded-[24px] p-5 sm:p-6 space-y-4">
      {/* Nombre */}
      <div>
        <label htmlFor="wall-author" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
          Tu nombre
        </label>
        <input
          id="wall-author"
          type="text"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            markComposing();
            if (error) setError(null);
          }}
          placeholder="¿Cómo te llamás?"
          maxLength={40}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-fg placeholder-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      {/* Mensaje con contador en vivo */}
      <div>
        <div className="flex items-baseline justify-between mb-1.5">
          <label htmlFor="wall-text" className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Tu mensaje
          </label>
          <span
            className={`font-mono text-[11px] tabular-nums ${remaining < 0 ? 'text-red-500' : 'text-neutral-400 dark:text-neutral-500'}`}
            aria-live="polite"
          >
            {text.length}/{MAX_CHARS}
          </span>
        </div>
        <textarea
          id="wall-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            markComposing();
            if (error) setError(null);
          }}
          placeholder="Dejá unas palabras para la artista…"
          rows={3}
          maxLength={MAX_CHARS}
          className="w-full resize-none bg-surface border border-border rounded-xl px-4 py-3 text-sm text-fg placeholder-neutral-400 leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      {/* Paleta cerrada de stickers */}
      <fieldset>
        <legend className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          Sumá un sticker (opcional)
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {STICKER_PALETTE.map((s) => {
            const active = sticker === s.emoji;
            return (
              <button
                key={s.emoji}
                type="button"
                onClick={() => {
                  setSticker(active ? undefined : s.emoji);
                  markComposing();
                  if (error) setError(null);
                }}
                aria-pressed={active}
                aria-label={s.alt}
                className={`h-11 w-11 flex items-center justify-center rounded-xl text-xl transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active
                    ? 'bg-brand ring-2 ring-fg dark:ring-on-inverse'
                    : 'bg-surface border border-border hover:border-accent'
                }`}
              >
                <span aria-hidden="true">{s.emoji}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Mensaje de moderación / anti-spam (tono Andante) */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 text-sm text-fg bg-warning-bg border border-brand rounded-xl px-4 py-3"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#8A7A00] dark:text-brand" aria-hidden="true" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* CTA: acento lima, uso puntual */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-md font-sans font-bold text-sm bg-brand text-on-brand hover:bg-brand-hover transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-input focus-visible:ring-fg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Dejar mi mensaje
      </button>
    </div>
  );
}
