import { useEffect, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
const TOTAL_MS = 1800;
const MIN_INTERVAL_MS = 8;

function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? 'X';
}

function scramble(text: string): string {
  return text
    .split('')
    .map((c) => (c === ' ' || c === '\n' ? c : randomGlyph()))
    .join('');
}

interface DecryptedTextProps {
  text: string;
  active: boolean;
  className?: string;
}

export default function DecryptedText({ text, active, className = '' }: DecryptedTextProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [display, setDisplay] = useState(() => (reducedMotion ? text : scramble(text)));

  useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      setDisplay(text);
      return;
    }

    const chars = text.split('');
    const lockable = chars.filter((c) => c !== ' ' && c !== '\n').length;
    const intervalMs = Math.max(MIN_INTERVAL_MS, TOTAL_MS / Math.max(lockable, 1));
    let revealed = 0;

    const id = window.setInterval(() => {
      if (revealed < chars.length) {
        do {
          revealed += 1;
        } while (
          revealed < chars.length &&
          (chars[revealed - 1] === ' ' || chars[revealed - 1] === '\n')
        );
      }

      const next = chars
        .map((c, i) => {
          if (i < revealed) return c;
          if (c === ' ' || c === '\n') return c;
          return randomGlyph();
        })
        .join('');

      setDisplay(next);

      if (revealed >= chars.length) {
        window.clearInterval(id);
        setDisplay(text);
      }
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [active, text, reducedMotion]);

  return <span className={className}>{display}</span>;
}
