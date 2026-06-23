import { useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

interface EventsListProps {
  setView: (view: string) => void;
}

interface EventItem {
  date: string;
  title: string;
  venue: string;
}

const EVENTS: EventItem[] = [
  { date: '12 JUL', title: 'El color en la ciudad', venue: 'Galería Central' },
  { date: '18 JUL', title: 'Collage analógico', venue: 'Café Norte' },
  { date: '05 AGO', title: 'Vernissage: Itinerancia', venue: 'Casa Tomada' },
  { date: '23 AGO', title: 'Luz de barrio', venue: 'Librería del Pasaje' },
];

export default function EventsList({ setView }: EventsListProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="snap-section relative min-h-dvh flex flex-col justify-center py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Encabezado */}
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 mb-8 sm:mb-12">
          <span className="h-0.5 w-12 bg-brand" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            Qué más anda pasando
          </span>
        </div>

        {/* Lista de eventos */}
        <ul
          onMouseLeave={() => setHovered(null)}
          className="border-t border-border"
        >
          {EVENTS.map((ev, i) => (
            <li
              key={ev.date + ev.title}
              onMouseEnter={() => setHovered(i)}
              onClick={() => setView('exhibition')}
              className="group border-b border-border cursor-pointer"
              style={{
                opacity: hovered !== null && hovered !== i ? 0.28 : 1,
                transition: 'opacity 0.35s ease',
              }}
            >
              <div className="flex items-center justify-between gap-6 py-5 sm:py-7">
                <div className="flex items-baseline gap-4 sm:gap-8 min-w-0">
                  <span className="font-mono font-extrabold text-accent text-xs sm:text-sm tracking-wider tabular-nums shrink-0 w-[52px] sm:w-[64px]">
                    {ev.date}
                  </span>
                  <h3 className="font-sans font-black uppercase tracking-tight text-fg text-2xl sm:text-4xl lg:text-5xl leading-none truncate transition-transform duration-300 group-hover:translate-x-2 sm:group-hover:translate-x-5">
                    {ev.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <span className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-right max-w-[180px]">
                    {ev.venue}
                  </span>
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-400 group-hover:text-accent dark:group-hover:text-sky-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          Agenda viva · se actualiza cada semana
        </p>
      </div>
    </section>
  );
}
