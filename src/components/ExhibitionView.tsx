import { EXHIBITION_DATA, ARTISTS_DATA, ARTWORKS_DATA } from '../data';
import { getArteMundialistaArtworks } from '../constants/arteMundialista';
import { Artwork } from '../types';
import CurvedLoop from './CurvedLoop';
import ExhibitionFloatingWorks from './ExhibitionFloatingWorks';
import EditorialHoverList from './EditorialHoverList';
import CuratorialConceptSection from './CuratorialConceptSection';
import ExhibitionNavTicket from './ExhibitionNavTicket';

interface ExhibitionViewProps {
  onSelectArtwork: (artwork: Artwork) => void;
  setView: (view: string) => void;
  onSelectArtist: (slug: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function ExhibitionView({
  onSelectArtwork,
  setView,
  onSelectArtist,
  menuOpen,
  setMenuOpen,
}: ExhibitionViewProps) {
  const activeExhibitionWorks = getArteMundialistaArtworks(ARTWORKS_DATA);

  const exhibitingArtistIds = new Set(activeExhibitionWorks.map((art) => art.artistId));
  const exhibitingArtists = ARTISTS_DATA.filter((artist) => exhibitingArtistIds.has(artist.id));

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
      <section className="px-6 pt-6 md:pt-8 mb-16 sm:mb-24 bg-transparent">
        <div className="max-w-7xl mx-auto space-y-4">

          <div className="flex flex-col gap-3 min-w-0">
            <ExhibitionNavTicket
              setView={setView}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />

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
