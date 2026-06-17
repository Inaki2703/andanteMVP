import { MapPin, Calendar, Heart, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { EXHIBITION_DATA, ARTISTS_DATA, ARTWORKS_DATA } from '../data';
import { Artwork } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import CurvedLoop from './CurvedLoop';

interface ExhibitionViewProps {
  onSelectArtwork: (artwork: Artwork) => void;
  setView: (view: string) => void;
}

export default function ExhibitionView({ onSelectArtwork, setView }: ExhibitionViewProps) {
  // Filter pieces that are currently showcased in Cafe Norte
  const activeExhibitionWorks = ARTWORKS_DATA.filter(
    (art) => art.id === 'ref-01' || art.id === 'glow-04' || art.id === 'concrete-shadow'
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
    <div className="animate-fade-in space-y-16 sm:space-y-24 pb-20 bg-transparent text-[#333333] dark:text-[#F2F2F2]">
      
      {/* 1. HERO TITLE & BADGE CONTAINER */}
      <section className="px-6 pt-10 sm:pt-16 bg-transparent">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Breadcrumb row & Ticket row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-300/40 dark:border-neutral-800/40 pb-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider select-none">
              <button
                onClick={() => setView('landing')}
                className="hover:text-[#0084FF] dark:hover:text-[#3D9DFF] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <span>🏠 Sala Principal</span>
              </button>
              <span className="text-neutral-300 dark:text-neutral-700">/</span>
              <span className="text-neutral-800 dark:text-neutral-200">Exposición Activa</span>
            </div>

            {/* Custom notched ticket badge as reference */}
            <div className="relative self-start bg-[#111111] dark:bg-neutral-800 text-white px-6 py-2.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.152em] uppercase rounded-lg shadow-md flex items-center gap-2 select-none">
              {/* Left Notch */}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border-r border-[#111111] dark:border-neutral-800"></div>
              {/* Right Notch */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border-l border-[#111111] dark:border-neutral-800"></div>
              <span>EXH_ID: 2024_05</span>
              <span className="text-[#D4F334]">🎫</span>
            </div>
          </div>

          {/* Exhibition metadata box header display */}
          <div className="pt-4 space-y-2">
            {/* Active exhibition blue box */}
            <div className="inline-block border border-[#0084FF] text-[#0084FF] dark:text-[#3D9DFF] px-4 py-1 text-[10px] font-mono font-extrabold tracking-[0.2em] rounded-sm uppercase mb-4">
              ACTIVE EXHIBITION
            </div>

            {/* Curved Loop Marquee text animation */}
            <CurvedLoop marqueeText="ARTE ✦ MUNDIALISTA" />

            {/* Sub-text description */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mt-4">
              Una exploración sobre cómo la luz transforma el espacio y la materia a través de cinco visiones contemporáneas.
            </p>
          </div>

        </div>
      </section>

      {/* 2. HERO IMAGE BANNER REPLICATING LANDING DESIGN */}
      <section className="px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm h-[75vh] min-h-[400px] max-h-[850px] group">
            <img
              src={EXHIBITION_DATA.image}
              alt="Muestra de Exposición Activa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform duration-[8000ms] scale-102 hover:scale-105"
            />
            {/* Interactive metadata details overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex flex-col justify-end p-8 sm:p-12 md:p-16 text-white text-left">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#D4F334] uppercase font-bold mb-3 sm:mb-4 bg-lime-950/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full w-auto max-w-max">
                SEDE DIRECTAL EN {EXHIBITION_DATA.locationName.toUpperCase()}
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tighter max-w-4xl uppercase">
                {EXHIBITION_DATA.address}
              </h2>
              <p className="font-mono text-xs text-neutral-300 max-w-xl mt-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#D4F334]" />
                <span>{EXHIBITION_DATA.dateRange}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALIGNED CURATORIAL CONCEPTO BOX CENTERED */}
      <section className="px-6 bg-transparent">
        <div className="max-w-4xl mx-auto border-t border-b border-neutral-300/40 dark:border-neutral-800/40 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left aligned tag title Column */}
            <div className="md:col-span-4 flex flex-col items-start pt-1.5">
              <h3 className="font-mono text-[10px] sm:text-xs font-black tracking-[0.25em] text-neutral-600 dark:text-neutral-400 uppercase relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-neutral-400 dark:after:bg-neutral-600">
                CONCEPTO CURATORIAL
              </h3>
            </div>

            {/* Right text body Column */}
            <div className="md:col-span-8 space-y-6 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed text-left">
              <p>
                La luz no es solo un fenómeno físico; es el mediador entre nuestra percepción y la realidad. En esta muestra itinerante, nos alejamos del "cubo blanco" tradicional para habitar espacios de vida cotidiana, donde la luz natural y artificial conversan con la obra en tiempo real.
              </p>
              <p>
                A través de la pintura, la fotografía y la escultura ligera, los cinco artistas seleccionados desglosan el espectro lumínico para recordarnos que nada es estático. "Cinco artistas, una conversación sobre la luz" es una invitación a la pausa, a observar cómo el mediodía incide sobre un lienzo y cómo la penumbra de la tarde revela texturas antes invisibles.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5. ARTISTAS QUE EXPONEN */}
      <section className="px-6 bg-transparent">
        <div className="max-w-7xl mx-auto border-b border-neutral-300/40 dark:border-neutral-800/40 pb-16 pt-8">
          <div className="space-y-10">
            <div className="text-center sm:text-left space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0084FF] dark:text-[#3D9DFF] uppercase">
                — CREADORES DE LA MUESTRA
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-4xl text-neutral-800 dark:text-neutral-100 tracking-tight uppercase">
                Artistas que exponen
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-xl leading-relaxed">
                Conoce a las mentes detrás del diálogo estético de esta exposición itinerante.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ARTISTS_DATA.filter((artist) => activeExhibitionWorks.some((art) => art.artistId === artist.id)).map((artist) => (
                <div
                  key={artist.id}
                  className="group flex flex-col items-center sm:items-start text-center sm:text-left bg-white dark:bg-[#111111] border border-[#E6E6E6] dark:border-[#2D2D2D]/60 rounded-[24px] p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 text-xs font-mono font-black text-neutral-200 dark:text-neutral-800 group-hover:text-[#0084FF]/25 dark:group-hover:text-[#3D9DFF]/25 transition-colors uppercase select-none pointer-events-none">
                    {artist.specialty.split(' ')[0]}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                    {/* Perfect Avatar Frame */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 flex-shrink-0 bg-neutral-100 dark:bg-neutral-900 shadow-inner group-hover:border-[#0084FF]/55 transition-all">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-sans font-black text-lg text-neutral-800 dark:text-neutral-100 tracking-tight leading-snug">
                        {artist.name}
                      </h4>
                      <p className="text-[10px] font-mono text-[#0084FF] dark:text-[#3D9DFF] uppercase font-bold tracking-wider">
                        {artist.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Quote block */}
                  <div className="mt-5 border-t border-neutral-100 dark:border-neutral-800/40 pt-4 w-full text-left">
                    <p className="text-xs italic text-neutral-500 dark:text-neutral-400 font-serif leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE ARTWORKS USING COMPACT HOME STYLE CARDS */}
      <section className="px-6 bg-transparent">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center sm:text-left space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0084FF] dark:text-[#3D9DFF] uppercase">
              — DISPONIBLES EN SEDE
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-neutral-800 dark:text-neutral-100 tracking-tight uppercase">
              Obras Colgadas Actualmente
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-xl leading-relaxed">
              Estas obras se exponen físicamente en Café Norte. Puedes descubrirlas, examinarlas y adquirirlas de forma segura.
            </p>
          </div>

          {/* Clean grid matching homepage exact curation styling without blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeExhibitionWorks.map((artwork) => (
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
                      <h3 className="font-sans font-extrabold text-base sm:text-lg text-neutral-800 dark:text-[#F2F2F2] group-hover:text-[#0084FF] transition-colors leading-tight">
                        {artwork.title}
                      </h3>
                      <span className="flex-shrink-0 px-3 py-1 bg-[#E8F5FF] dark:bg-sky-950/40 text-[#0084FF] dark:text-sky-300 text-[11px] font-mono font-extrabold rounded-full">
                        {formatPrice(artwork.price)}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
                      {artwork.medium} ({artwork.dimensions})
                    </p>

                    {/* Artist uppercase name below */}
                    <p className="text-[10px] font-mono font-bold text-neutral-500 tracking-wider uppercase mt-2">
                      POR {artwork.artistName.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. METADATA GUARANTEES LAB */}
      <section className="px-6 bg-transparent">
        <div className="max-w-4xl mx-auto border-t border-neutral-300/40 dark:border-neutral-800/40 pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 bg-[#E8F5FF] dark:bg-sky-950/40 rounded-full flex items-center justify-center text-[#0084FF] dark:text-sky-300 flex-shrink-0">
                <Shield className="h-5 w-5" />
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
              <div className="h-10 w-10 bg-[#E8F5FF] dark:bg-sky-950/40 rounded-full flex items-center justify-center text-[#0084FF] dark:text-sky-300 flex-shrink-0">
                <Award className="h-5 w-5" />
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
