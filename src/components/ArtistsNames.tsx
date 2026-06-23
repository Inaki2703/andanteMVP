import { useRef, useState, useMemo, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Artist } from '../types';

interface ArtistsNamesProps {
  artists: Artist[];
  setView: (view: string) => void;
}

// Envolventes geométricas distintas por artista real (estilo brandnewschool /about)
const SHAPES: { borderRadius?: string; clipPath?: string; rotate: number }[] = [
  { borderRadius: '49% 51% 70% 30% / 30% 49% 51% 70%', rotate: -4 }, // blob orgánico
  { borderRadius: '50%', rotate: 3 }, // círculo
  { borderRadius: '160px 160px 28px 28px', rotate: -2 }, // arco
  { clipPath: 'polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)', rotate: 2 }, // hexágono
  { borderRadius: '0 130px 0 130px', rotate: -3 }, // hoja
];

// Versión más grande de la foto para el preview en hover.
const preview = (a: Artist) => (a.portrait || a.image).replace(/w=\d+/, 'w=700');

// Nombres ficticios para dar densidad de "hoja de libro" (no interactivos).
const FILLER_NAMES = [
  'Valentina Ríos', 'Tomás Aguirre', 'Lucía Bran', 'Nicolás Paz', 'Camila Ferro',
  'Joaquín Vidal', 'Renata Sosa', 'Bruno Ledesma', 'Paula Quiroga', 'Ignacio Mena',
  'Florencia Daract', 'Gael Moreno', 'Antonia Cisneros', 'Thiago Pérez', 'Malena Ortiz',
  'Benicio Lara', 'Catalina Ferreyra', 'Ramiro Solís', 'Delfina Acosta', 'Lautaro Gómez',
  'Pilar Navarro', 'Emiliano Roldán', 'Abril Montes', 'Santino Vega', 'Olivia Carranza',
  'Mateo Funes', 'Juana Belén', 'Felipe Arriagada', 'Mora Linares', 'Dante Salinas',
  'Isabela Ponce', 'Bautista Cuevas',
];

type Entry =
  | { kind: 'artist'; artist: Artist; artistIndex: number }
  | { kind: 'filler'; name: string };

export default function ArtistsNames({ artists, setView }: ArtistsNamesProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  const moveFloat = (e: MouseEvent) => {
    const el = floatRef.current;
    if (el) {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  // Intercala los artistas reales entre los nombres ficticios para densidad.
  const entries = useMemo<Entry[]>(() => {
    const list: Entry[] = FILLER_NAMES.map((name) => ({ kind: 'filler', name }));
    // Posiciones repartidas para los reales.
    const slots = artists.map((_, i) =>
      Math.floor(((i + 1) / (artists.length + 1)) * (FILLER_NAMES.length + artists.length))
    );
    artists.forEach((artist, i) => {
      list.splice(slots[i] + i, 0, { kind: 'artist', artist, artistIndex: i });
    });
    return list;
  }, [artists]);

  return (
    <section className="snap-section relative min-h-dvh flex flex-col justify-center py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Encabezado */}
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 mb-3">
          <span className="h-0.5 w-12 bg-brand" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            Conoce a quienes lo crean
          </span>
        </div>
        <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-fg mb-8 sm:mb-10">
          Comunidad Andante
        </h2>

        {/* Hoja de nombres */}
        <p className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl leading-snug sm:leading-snug text-fg [text-wrap:pretty]">
          {entries.map((entry, idx) => {
            const sep = idx < entries.length - 1 ? <span className="text-neutral-400 dark:text-neutral-600"> • </span> : null;

            if (entry.kind === 'filler') {
              return (
                <span key={`f-${idx}`} className="text-neutral-400 dark:text-neutral-600">
                  {entry.name}
                  {sep}
                </span>
              );
            }

            const ai = entry.artistIndex;
            return (
              <span key={entry.artist.id}>
                <span
                  onMouseEnter={(e) => {
                    setHovered(ai);
                    moveFloat(e);
                  }}
                  onMouseMove={moveFloat}
                  onMouseLeave={() => setHovered((h) => (h === ai ? null : h))}
                  onClick={() => setView('exhibition')}
                  className="cursor-pointer transition-colors duration-200"
                  style={{ color: hovered === ai ? '#0084FF' : undefined }}
                >
                  {entry.artist.name}
                </span>
                {sep}
              </span>
            );
          })}
        </p>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          La comunidad sigue creciendo ↗
        </p>
      </div>

      {/* Foto flotante con envolvente geométrica — portal a <body> para que
          `fixed` sea relativo al viewport (sin recortes por transforms). */}
      {createPortal(
        <div
          ref={floatRef}
          className="pointer-events-none fixed left-0 top-0 z-[80] w-[clamp(200px,20vw,300px)] aspect-[4/5]"
        >
          {artists.map((a, i) => {
            const sh = SHAPES[i % SHAPES.length];
            const active = hovered === i;
            return (
              <div
                key={a.id}
                className="absolute inset-0 overflow-hidden shadow-2xl"
                style={{
                  borderRadius: sh.borderRadius,
                  clipPath: sh.clipPath,
                  opacity: active ? 1 : 0,
                  transform: `scale(${active ? 1 : 0.82}) rotate(${sh.rotate}deg)`,
                  transition: 'opacity 0.28s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <img
                  src={preview(a)}
                  alt={a.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </section>
  );
}
