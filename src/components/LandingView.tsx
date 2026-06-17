import { Calendar, MapPin, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, AlertCircle, Sparkles, Heart, HeartOff, Megaphone, Truck, ShieldAlert } from 'lucide-react';
import { ARTWORKS_DATA, ARTISTS_DATA, EXHIBITION_DATA } from '../data';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { useState, MouseEvent } from 'react';

interface LandingViewProps {
  setView: (view: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function LandingView({ setView, onSelectArtwork }: LandingViewProps) {
  // Filter core featured works to showcase in the curated selection (Marea Abstracta, Geometría del Vacío, Fragmento Urbano)
  const featuredArtworks = ARTWORKS_DATA.filter(
    (art) => art.id === 'marea-01' || art.id === 'geo-vacuo' || art.id === 'frag-urbano'
  );

  const [likedArtworks, setLikedArtworks] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setLikedArtworks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="animate-fade-in space-y-16 sm:space-y-24 pb-16">
      
      {/* SECTION 1: HERO - FLOWER IMAGE CHASSIS (CONSERVED) */}
      <section className="relative px-6 pt-6 bg-transparent">
        <div className="w-full">
          <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm h-[75vh] min-h-[400px] max-h-[850px] group">
            {/* The actual Unsplash flower illustration is preserved as requested by the user */}
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1500"
              alt="Andante Editorial Flower Hero Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform duration-[8000ms] scale-102 hover:scale-105"
            />
            {/* Soft sophisticated overlay */}
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

      {/* SECTION 2: EXPOSITION CONTINUOUS HIGHLIGHT ("AHORA COLGADO EN CAFÉ NORTE") */}
      <section className="bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Section Accent Header */}
          <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
            <span className="h-0.5 w-12 bg-[#D4F334]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              AHORA COLGADO EN {EXHIBITION_DATA.locationName.toUpperCase()}
            </span>
          </div>

          {/* Exhibition Epic Dark Card Frame */}
          <div 
            className="relative rounded-[32px] overflow-hidden bg-cover bg-center h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center p-6 sm:p-12 text-center text-white"
            style={{ backgroundImage: `url(${EXHIBITION_DATA.image})` }}
          >
            {/* Shadow Overlay */}
            <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[2px]" />

            <div className="relative z-10 max-w-3xl space-y-6 sm:space-y-8">
              {/* Activa Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#D4F334] text-[#333333] px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                <span className="h-2 w-2 bg-[#0084FF] rounded-full animate-ping" />
                <span>EXPO ACTIVA</span>
              </div>

              {/* Centered Title */}
              <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl leading-[1.15] text-white tracking-tight">
                {EXHIBITION_DATA.title}. Visítala en persona o descúbrela aquí.
              </h2>

              {/* White Capsule Interactive CTA Button */}
              <div>
                <button
                  onClick={() => setView('exhibition')}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-100 text-[#333333] font-sans font-extrabold text-xs sm:text-sm px-6 py-4 rounded-full transition-transform active:scale-98 shadow-md hover:shadow-lg cursor-pointer text-center"
                >
                  <span>Ver qué hay colgado ahora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CURATED EDITIONS GRID ("CURADO A MANO, ESTA SEMANA") */}
      <section className="bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header titles */}
          <div className="text-center space-y-2 pb-2">
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-[#333333] dark:text-[#F2F2F2] tracking-tight uppercase">
              Curado a mano, esta semana
            </h2>
            <div className="inline-flex items-center space-x-2 text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 px-4 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 stroke-[2]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wide uppercase">
                NO ES UN CATÁLOGO INFINITO. CADA OBRA PASÓ POR UNA MIRADA.
              </span>
            </div>
          </div>

          {/* Cards curation grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => onSelectArtwork(artwork)}
                className="group flex flex-col bg-white dark:bg-[#1E1E1E] rounded-[24px] border border-[#E6E6E6] dark:border-[#2D2D2D]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden p-4 cursor-pointer"
              >
                {/* Image panel bounds */}
                <div className="relative overflow-hidden aspect-square rounded-[18px] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Curated status tag colored per state */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded font-black uppercase shadow-sm ${
                      artwork.status === 'Disponible'
                        ? 'bg-[#D4F334] text-[#333333]'
                        : artwork.status === 'Reservado'
                        ? 'bg-[#0084FF] text-white'
                        : 'bg-neutral-800 text-white'
                    }`}>
                      {artwork.status}
                    </span>
                  </div>

                  {/* Floating Top-Right Heart Icon Button */}
                  <button
                    onClick={(e) => toggleLike(artwork.id, e)}
                    className="absolute top-4 right-4 z-10 h-8 w-8 bg-white/90 dark:bg-neutral-900/90 rounded-full flex items-center justify-center shadow-md text-neutral-500 hover:text-red-500 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Heart 
                      className={`h-4.5 w-4.5 stroke-[1.5] ${likedArtworks[artwork.id] ? 'fill-red-500 text-red-500 stroke-red-500' : 'text-neutral-500 dark:text-neutral-400'}`} 
                    />
                  </button>
                </div>

                {/* Meta descriptions panel */}
                <div className="mt-5 space-y-1.5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Title & Price Single-Line flex */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-sans font-extrabold text-base sm:text-lg text-[#333333] dark:text-[#F2F2F2] group-hover:text-[#0084FF] transition-colors leading-tight">
                        {artwork.title}
                      </h3>
                      <span className="flex-shrink-0 px-3 py-1 bg-[#E8F5FF] dark:bg-sky-950/40 text-[#0084FF] dark:text-sky-300 text-[11px] font-mono font-extrabold rounded-full">
                        {formatPrice(artwork.price)}
                      </span>
                    </div>

                    {/* Artist uppercase name below */}
                    <p className="text-[10px] font-mono font-bold text-neutral-500 tracking-wider uppercase mt-1">
                      POR {artwork.artistName.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: CONOCE A QUIENES LO CREAN */}
      <section className="bg-transparent px-4 sm:px-6 lg:px-8">
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
      <section className="bg-transparent px-4 sm:px-6 lg:px-8">
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
      <section className="bg-transparent px-4 sm:px-6 lg:px-8">
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
