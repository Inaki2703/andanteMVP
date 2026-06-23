import { BANNED_WORDS } from '../data';

// Tiempos de anti-spam (cliente, mock).
export const MIN_COMPOSE_MS = 3000; // mínimo desde que se empezó a escribir
export const RATE_LIMIT_MS = 15000; // 1 envío cada 15 s

// Normaliza: minúsculas y sin acentos, para comparar palabras de forma robusta.
const strip = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const BANNED_NORMALIZED = BANNED_WORDS.map(strip);

// Detecta groserías por palabra completa (evita falsos positivos tipo "basurero").
export function containsBannedWord(text: string): boolean {
  const tokens = strip(text).split(/[^a-z0-9]+/).filter(Boolean);
  return tokens.some((t) => BANNED_NORMALIZED.includes(t));
}
