import { Shield, Medal } from '@phosphor-icons/react';
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
      onClick: artist.slug ? () => onSelectArtist(artist.slug!) : undefined,
    };
  });

  const sedeLabel = `SEDE DIRECTAL EN ${EXHIBITION_DATA.locationName.toUpperCase()} — ${EXHIBITION_DATA.address}`;

  return (
    <div className="animate-fade-in space-y-16 sm:space-y-24 pb-20 bg-transparent text-fg">

      {/* 1. NAV + MARQUEE */}
      <section className="px-6 pt-5 sm:pt-8 bg-transparent">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* Fila 1: breadcrumbs + ticket */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider select-none">
                <button
                  onClick={() => setView('landing')}
                  className="hover:text-accent transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  <span>🏠 Sala Principal</span>
                </button>
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                <span className="text-neutral-800 dark:text-neutral-200">Exposición Activa</span>
              </div>

              <a
                href={EXHIBITION_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit border border-accent text-accent px-3 py-0.5 text-[9px] sm:text-[10px] font-mono font-extrabold tracking-[0.12em] rounded-sm uppercase leading-snug hover:bg-accent-soft transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-page"
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
            centerBadgeText="MÉXICO - JAPÓN - 1700 HRS."
          />
        </div>
      </section>

      {/* 2. HERO CON OBRAS FLOTANTES */}
      <ExhibitionFloatingWorks
        artworks={activeExhibitionWorks}
        backgroundImage={EXHIBITION_DATA.image}
        onSelectArtwork={onSelectArtwork}
      />

      {/* 3. CONCEPTO CURATORIAL — snap + decrypt */}
      <CuratorialConceptSection />

      {/* 4. ARTISTAS — lista hover homologada con Home */}
      <section className="px-6 bg-transparent">
        <div className="max-w-7xl mx-auto border-b border-neutral-300/40 dark:border-neutral-800/40 pb-16 pt-8">
          <EditorialHoverList
            label="Creadores de la muestra"
            variant="nameFirst"
            items={artistListItems}
          />
        </div>
      </section>

      {/* 5. GARANTÍAS */}
      <section className="px-6 bg-transparent">
        <div className="max-w-4xl mx-auto border-t border-neutral-300/40 dark:border-neutral-800/40 pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 bg-accent-soft rounded-full flex items-center justify-center text-accent flex-shrink-0">
                <Shield className="h-5 w-5" weight="regular" />
              </div>
              <div className="space-y-1">
                <h4 className="font-mono text-xs font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
                  Garantía de Coleccionista Andante
                </h4>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                  Todas las obras de la colección son piezas únicas respaldadas por un certificado de autenticidad firmado por el autor y su respectivo registro inalterable.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 bg-accent-soft rounded-full flex items-center justify-center text-accent flex-shrink-0">
                <Medal className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-mono text-xs font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
                  Sostén del Ecosistema
                </h4>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                  El 85% de los fondos de venta se depositan de manera directa al autor, impulsando e impactando directamente en su taller y labor creativa de producción.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
