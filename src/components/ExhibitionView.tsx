import { EXHIBITION_DATA, ARTISTS_DATA, ARTWORKS_DATA } from '../data';
import { Artwork } from '../types';
import CurvedLoop from './CurvedLoop';
import ExhibitionFloatingWorks from './ExhibitionFloatingWorks';
import EditorialHoverList from './EditorialHoverList';
import CuratorialConceptSection from './CuratorialConceptSection';

interface ExhibitionViewProps {
  onSelectArtwork: (artwork: Artwork) => void;
  setView: (view: string) => void;
  onSelectArtist: (slug: string) => void;
}

export default function ExhibitionView({ onSelectArtwork, setView, onSelectArtist }: ExhibitionViewProps) {
  const activeExhibitionWorks = ARTWORKS_DATA.filter(
    (art) => art.id === 'ref-01' || art.id === 'glow-04' || art.id === 'concrete-shadow'
  );

  const exhibitingArtists = ARTISTS_DATA.filter((artist) =>
    activeExhibitionWorks.some((art) => art.artistId === artist.id)
  );

  const artistListItems = exhibitingArtists.map((artist) => {
    const specialtyWord = artist.specialty.split(' ')[0].toUpperCase();
    return {
      id: artist.id,
      left: '',
      title: artist.name.toUpperCase(),
      right: `(${specialtyWord})`,
      onClick: () => onSelectArtist(artist.id),
    };
  });

  const sedeLabel = `SEDE DIRECTAL EN ${EXHIBITION_DATA.locationName.toUpperCase()} — ${EXHIBITION_DATA.address}`;

  return (
    <div className="animate-fade-in-soft pb-20 bg-transparent text-fg">

      {/* Zona superior (inicio real): scroll nativo; se clona para el bucle footer → inicio */}
      <div data-exhibition-top data-free-scroll>

      {/* 1. NAV + MARQUEE */}
      <section className="px-6 pt-5 sm:pt-8 mb-16 sm:mb-24 bg-transparent">
        <div className="max-w-7xl mx-auto space-y-4">

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider select-none">
                <button
                  onClick={() => setView('landing')}
                  className="focus-ring hover:text-accent transition-smooth flex items-center gap-1 cursor-pointer"
                >
                  <span><span aria-hidden="true">🏠</span> Sala Principal</span>
                </button>
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                <span className="text-neutral-800 dark:text-neutral-200">Exposición Activa</span>
              </div>

              {/* Título principal de la vista (h1) para anclar la jerarquía */}
              <h1 className="sr-only">{EXHIBITION_DATA.title}</h1>

              <a
                href={EXHIBITION_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit border border-accent text-accent px-3 py-1 text-[11px] sm:text-xs font-mono font-extrabold tracking-[0.12em] rounded-sm uppercase leading-snug hover:bg-accent-soft transition-smooth cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-page"
              >
                {sedeLabel}
              </a>
            </div>

            <div className="relative self-start sm:self-auto bg-deep dark:bg-neutral-800 text-white px-5 py-2 text-[10px] sm:text-xs font-mono font-bold tracking-[0.12em] uppercase rounded-lg shadow-md flex items-center gap-2 select-none whitespace-nowrap shrink-0">
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-page rounded-full border-r border-deep dark:border-neutral-800" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-page rounded-full border-l border-deep dark:border-neutral-800" />
              <span>🎟️ Junio 23 - Agosto 25, 2026</span>
            </div>
          </div>

          <div className="border-b border-neutral-300/40 dark:border-neutral-800/40 pb-4" />

          <CurvedLoop
            marqueeText="ARTE ✦ MUNDIALISTA"
            centerBadgeText="MÉXICO - JAPÓN - 17:00 HRS."
          />
        </div>
      </section>

      {/* 2. HERO CON OBRAS FLOTANTES */}
      <div className="mb-16 sm:mb-24">
        <ExhibitionFloatingWorks
          artworks={activeExhibitionWorks}
          backgroundImage={EXHIBITION_DATA.image}
          onSelectArtwork={onSelectArtwork}
        />
      </div>

      </div>

      {/* 3. CONCEPTO CURATORIAL — snap + decrypt */}
      <CuratorialConceptSection />

      {/* 4. ARTISTAS — lista hover homologada con Home */}
      <section className="exhibition-snap-section min-h-dvh flex flex-col justify-center px-6 bg-transparent">
        <div className="max-w-7xl mx-auto w-full border-b border-neutral-300/40 dark:border-neutral-800/40 pb-16 pt-8">
          <EditorialHoverList
            label="Creadores de la muestra"
            variant="nameFirst"
            items={artistListItems}
          />
        </div>
      </section>

    </div>
  );
}
