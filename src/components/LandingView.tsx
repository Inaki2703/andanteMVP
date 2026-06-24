import { ARTWORKS_DATA, ARTISTS_DATA } from '../data';
import { Artwork } from '../types';
import ExpoActivaSection from './ExpoActivaSection';
import CuratedStack from './CuratedStack';
import ArtistsNames from './ArtistsNames';
import EventsList from './EventsList';

interface LandingViewProps {
  setView: (view: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectArtist: (artistId: string) => void;
}

// Orden curado para el stack "Curado a mano" (se barajan en este orden).
const CURATED_IDS = ['marea-01', 'geo-vacuo', 'frag-urbano'];

export default function LandingView({ setView, onSelectArtwork, onSelectArtist }: LandingViewProps) {
  // Piezas del stack curado, en el orden definido arriba.
  const curatedArtworks = CURATED_IDS
    .map((id) => ARTWORKS_DATA.find((a) => a.id === id))
    .filter((a): a is Artwork => Boolean(a));

  return (
    <div className="animate-fade-in pb-16">

      {/* SECTION 1: HERO — llena el viewport con padding uniforme en los 4 lados */}
      <section className="snap-section relative p-6 bg-transparent h-dvh flex flex-col">
        <div className="w-full flex-1 min-h-0">
          <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm h-full group">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1500"
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform duration-[8000ms] scale-102 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex flex-col justify-end p-8 sm:p-12 md:p-16 text-white text-left">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-brand uppercase font-bold mb-3 sm:mb-4 bg-lime-950/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full w-auto max-w-max">
                ANDANTE :) GALERÍA ITINERANTE
              </span>
              <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05] max-w-4xl">
                El arte no tiene por qué quedarse quieto.
              </h1>
              <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-300 max-w-xl mt-4 sm:mt-6 leading-relaxed">
                Desmantelamos el cubo blanco convencional. Llevamos obras originales de creadores independientes a tus cafés favoritos. Descúbrelas físicamente, adquiérelas digitalmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPO ACTIVA — marquees de texto/imagen + cursor personalizado */}
      <ExpoActivaSection setView={setView} />

      {/* SECTION 3: CURADO A MANO — stack de cartas que se barajan al hacer scroll */}
      <CuratedStack
        artworks={curatedArtworks}
        onSelectArtwork={onSelectArtwork}
        onSelectArtist={onSelectArtist}
      />

      {/* SECTION 4: CONOCE A QUIENES LO CREAN — hoja de nombres con foto en hover */}
      <ArtistsNames artists={ARTISTS_DATA} onSelectArtist={onSelectArtist} />

      {/* SECTION 5: QUÉ MÁS ANDA PASANDO — lista grande de eventos */}
      <EventsList setView={setView} />

    </div>
  );
}
