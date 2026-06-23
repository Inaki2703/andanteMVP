// Devuelve un tiempo relativo en español, p. ej. "hace un momento", "hace 2 h".
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const sec = Math.floor(diffMs / 1000);

  if (sec < 60) return 'hace un momento';

  const min = Math.floor(sec / 60);
  if (min < 60) return `hace ${min} min`;

  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;

  const d = Math.floor(h / 24);
  if (d < 7) return `hace ${d} ${d === 1 ? 'día' : 'días'}`;

  const w = Math.floor(d / 7);
  if (w < 5) return `hace ${w} ${w === 1 ? 'semana' : 'semanas'}`;

  const mo = Math.floor(d / 30);
  if (mo < 12) return `hace ${mo} ${mo === 1 ? 'mes' : 'meses'}`;

  const y = Math.floor(d / 365);
  return `hace ${y} ${y === 1 ? 'año' : 'años'}`;
}
