import { Calendar, MapPin, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, AlertCircle, Sparkles, Heart, HeartOff, Megaphone, Truck, ShieldAlert } from 'lucide-react';
import { ARTWORKS_DATA, ARTISTS_DATA } from '../data';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';
import ExpoActivaSection from './ExpoActivaSection';
import CuratedStack from './CuratedStack';

interface LandingViewProps {
  setView: (view: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

// Orden curado para el stack "Curado a mano" (se barajan en este orden).
const CURATED_IDS = ['marea-01', 'geo-vacuo', 'frag-urbano', 'prisma-suspendido', 'umbral-cromatico'];

export default function LandingView({ setView, onSelectArtwork }: LandingViewProps) {
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
              alt="Andante Editorial Flower Hero Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform duration-[8000ms] scale-102 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex flex-col justify-end p-8 sm:p-12 md:p-16 text-white text-left">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#D4F334] uppercase font-bold mb-3 sm:mb-4 bg-lime-950/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full w-auto max-w-max">
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
      <CuratedStack artworks={curatedArtworks} onSelectArtwork={onSelectArtwork} />

      {/* SECTION 4: CONOCE A QUIENES LO CREAN */}
      <section className="snap-section bg-transparent px-4 sm:px-6 lg:px-8 min-h-dvh flex flex-col justify-center py-16">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center">
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-[#333333] dark:text-[#F2F2F2] tracking-tight uppercase">
              Conoce a quienes lo crean
            </h2>
          </div>

          {/* Creators cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTISTS_DATA.map((artist) => (
              <div 
                key={artist.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-[24px] border border-[#E6E6E6] dark:border-[#2D2D2D]/60 p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all duration-300"
              >
                {/* Beautiful circle avatar */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#E6E6E6] dark:border-[#333333] shadow-sm">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-black text-base sm:text-lg text-[#333333] dark:text-[#F2F2F2]">
                    {artist.name}
                  </h3>
                  <p className="font-sans italic text-xs text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed px-2">
                    {artist.bio}
                  </p>
                </div>

                {/* Semblanza Link ↗ */}
                <div className="pt-2">
                  <button 
                    onClick={() => setView('exhibition')}
                    className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-[#0084FF] dark:text-sky-300 hover:underline hover:text-[#006FD6]"
                  >
                    <span>Leer su semblanza</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: QUÉ MÁS ANDA PASANDO */}
      <section className="snap-section bg-transparent px-4 sm:px-6 lg:px-8 min-h-dvh flex flex-col justify-center py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left side text and yellow block */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-6">
              <div className="space-y-1">
                <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-[#333333] dark:text-[#F2F2F2] leading-[1.05] tracking-tighter uppercase">
                  Qué más
                </h2>
                <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-[#333333] dark:text-[#F2F2F2] leading-[1.05] tracking-tighter uppercase">
                  Anda
                </h2>
                <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-[#333333] dark:text-[#F2F2F2] leading-[1.05] tracking-tighter uppercase">
                  Pasando
                </h2>
              </div>

              {/* Loudspeaker in yellow square block */}
              <div className="h-16 w-16 bg-[#D4F334] rounded-[18px] flex items-center justify-center shadow-sm">
                <Megaphone className="h-7 w-7 text-[#333333]" />
              </div>
            </div>

            {/* Right side event cards list */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              {/* Event Row 1 */}
              <div className="white-event-card bg-white dark:bg-[#1E1E1E] rounded-[20px] p-5 sm:p-6 border border-[#E6E6E6] dark:border-[#2D2D2D]/60 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#0084FF] transition-all group">
                <div className="flex items-center space-x-6">
                  <span className="font-mono font-extrabold text-[#0084FF] dark:text-sky-300 text-sm sm:text-base tracking-wider whitespace-nowrap">
                    12 JUL
                  </span>
                  <p className="font-sans font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-tight">
                    Charla: El color en la ciudad @ <span className="font-sans font-black">Galería Central</span>
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-[#0084FF] group-hover:translate-x-1.5 transition-transform flex-shrink-0 ml-4" />
              </div>

              {/* Event Row 2 */}
              <div className="white-event-card bg-white dark:bg-[#1E1E1E] rounded-[20px] p-5 sm:p-6 border border-[#E6E6E6] dark:border-[#2D2D2D]/60 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#0084FF] transition-all group">
                <div className="flex items-center space-x-6">
                  <span className="font-mono font-extrabold text-[#0084FF] dark:text-sky-300 text-sm sm:text-base tracking-wider whitespace-nowrap">
                    18 JUL
                  </span>
                  <p className="font-sans font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-tight">
                    Workshop: Collage Analógico en <span className="font-sans font-black">Café Norte</span>
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-[#0084FF] group-hover:translate-x-1.5 transition-transform flex-shrink-0 ml-4" />
              </div>

              {/* Event Row 3 */}
              <div className="white-event-card bg-white dark:bg-[#1E1E1E] rounded-[20px] p-5 sm:p-6 border border-[#E6E6E6] dark:border-[#2D2D2D]/60 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#0084FF] transition-all group">
                <div className="flex items-center space-x-6">
                  <span className="font-mono font-extrabold text-[#0084FF] dark:text-sky-300 text-sm sm:text-base tracking-wider whitespace-nowrap">
                    05 AGO
                  </span>
                  <p className="font-sans font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-tight">
                    Vernissage: Nueva Colección <span className="font-sans font-black">"Itinerancia"</span>
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-[#0084FF] group-hover:translate-x-1.5 transition-transform flex-shrink-0 ml-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: FOUR VALUE PROPOSITIONS */}
      <section className="snap-section bg-transparent px-4 sm:px-6 lg:px-8 min-h-dvh flex flex-col justify-center py-16">
        <div className="max-w-7xl mx-auto border-t border-[#E6E6E6] dark:border-neutral-800 pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Proposition 1 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
              <div className="h-10 w-10 bg-sky-50 dark:bg-sky-950/40 rounded-full flex items-center justify-center font-bold text-[#0084FF] dark:text-sky-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-sans font-black text-sm text-[#333333] dark:text-[#F2F2F2]">
                Curaduría con criterio
              </h3>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-xs">
                Seleccionamos cada pieza para que cuente una historia real.
              </p>
            </div>

            {/* Proposition 2 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
              <div className="h-10 w-10 bg-sky-50 dark:bg-sky-950/40 rounded-full flex items-center justify-center font-bold text-[#0084FF] dark:text-sky-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-sans font-black text-sm text-[#333333] dark:text-[#F2F2F2]">
                Pago seguro
              </h3>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-xs">
                Transacciones encriptadas y múltiples métodos de pago.
              </p>
            </div>

            {/* Proposition 3 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
              <div className="h-10 w-10 bg-sky-50 dark:bg-sky-950/40 rounded-full flex items-center justify-center font-bold text-[#0084FF] dark:text-sky-300">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="font-sans font-black text-sm text-[#333333] dark:text-[#F2F2F2]">
                Envío y enmarcado claros
              </h3>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-xs">
                Todo listo para colgar. Sin sorpresas logísticas.
              </p>
            </div>

            {/* Proposition 4 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
              <div className="h-10 w-10 bg-sky-50 dark:bg-sky-950/40 rounded-full flex items-center justify-center font-bold text-[#0084FF] dark:text-sky-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-sans font-black text-sm text-[#333333] dark:text-[#F2F2F2]">
                Comisión justa
              </h3>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-xs">
                Apoyamos directamente a los artistas sin sobreprecios ocultos.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
