import { useState, useMemo } from 'react';
import { BadgeCheck, Instagram, Globe, Check, MessageCircle, Users, Eye } from 'lucide-react';
import { Artist, Artwork, WallMessage } from '../types';
import { WALL_SEED } from '../data';
import ArtworkScroller from './ArtworkScroller';
import CommunityWall from './CommunityWall';

interface ArtistViewProps {
  artist: Artist;
  artworks: Artwork[];
  setView: (view: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function ArtistView({ artist, artworks, setView, onSelectArtwork }: ArtistViewProps) {
  const artistWorks = artworks.filter((art) => art.artistId === artist.id);

  // Seguir: estado optimista local (sin backend)
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(artist.followers ?? 0);

  const handleToggleFollow = () => {
    // Updaters puros y separados (seguros ante la doble invocación de StrictMode)
    setFollowers((n) => (following ? n - 1 : n + 1));
    setFollowing((prev) => !prev);
  };

  // Muro: estado en el padre para que la prueba social refleje el conteo real
  const initialMessages = useMemo(
    () => WALL_SEED.filter((m) => m.artistId === artist.id),
    [artist.id]
  );
  const [messages, setMessages] = useState<WallMessage[]>(initialMessages);
  const visibleMessageCount = messages.filter((m) => !m.hidden).length;

  const nf = (n: number) => n.toLocaleString('es-AR');
  return (
    <div className="animate-fade-in pb-20 bg-transparent text-fg">

      {/* BREADCRUMB */}
      <section className="px-6 pt-10 sm:pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider select-none">
            <button
              onClick={() => setView('landing')}
              className="hover:text-[#0084FF] dark:hover:text-[#3D9DFF] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              🏠 Sala Principal
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <button
              onClick={() => setView('exhibition')}
              className="hover:text-[#0084FF] dark:hover:text-[#3D9DFF] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Exposición
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span className="text-neutral-800 dark:text-neutral-200">{artist.name}</span>
          </div>
        </div>
      </section>

      {/* HERO — composición por capas (imagen a sangre + contenedor flotante claro) */}
      <section className="px-6 pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm min-h-[460px] sm:min-h-[560px] flex items-end">
            {/* Imagen de fondo */}
            <img
              src={artist.portrait || artist.image}
              alt={`Retrato de ${artist.name}`}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" aria-hidden="true" />

            {/* Contenedor flotante claro superpuesto (no ocupa todo el ancho) */}
            <div className="relative m-5 sm:m-8 md:m-10 max-w-xl bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-sm rounded-[32px] shadow-md p-8 sm:p-12 md:p-14">
              {/* Badge verificada */}
              {artist.verified && (
                <span className="inline-flex items-center gap-1.5 bg-brand text-on-brand px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Artista verificada
                </span>
              )}

              {/* Nombre (Display / H1) */}
              <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[1.05] text-fg">
                {artist.name}
              </h1>

              {/* Línea de identidad (medio + ciudad) con acento lima */}
              {artist.tagline && (
                <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed relative inline-block">
                  {artist.tagline}
                  <span className="block h-1 w-16 bg-brand mt-2 rounded-full" aria-hidden="true" />
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIONES */}
      <div className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24 space-y-16 sm:space-y-24">

        {/* SEMBLANZA — bloque editorial narrativo */}
        {artist.semblanza && (
          <section aria-labelledby="semblanza-title">
            <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
              — En primera persona
            </span>
            <h2 id="semblanza-title" className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-fg mt-2">
              Su semblanza
            </h2>

            <div className="mt-8 max-w-2xl space-y-6 text-base sm:text-lg font-sans font-normal leading-relaxed text-neutral-700 dark:text-neutral-300">
              {artist.semblanza.trim().split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Cita destacada (Syne Italic) */}
            {artist.quote && (
              <blockquote className="mt-10 max-w-2xl border-l-2 border-[#D4F334] pl-6">
                <p className="font-sans italic font-medium text-xl sm:text-2xl leading-snug text-fg">
                  «{artist.quote}»
                </p>
              </blockquote>
            )}
          </section>
        )}

        {/* Obra relevante (scroll horizontal) */}
        {artistWorks.length > 0 && (
          <section>
            <ArtworkScroller
              artworks={artistWorks}
              artistName={artist.name}
              onSelectArtwork={onSelectArtwork}
            />
          </section>
        )}

        {/* TRAYECTORIA / CV EXPOSITIVO — cronológico, reciente primero */}
        {artist.exhibitions && artist.exhibitions.length > 0 && (
          <section aria-labelledby="trayectoria-title">
            <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
              — Dónde ha colgado
            </span>
            <h2 id="trayectoria-title" className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-fg mt-2">
              Trayectoria
            </h2>

            <ul className="mt-8 border-t border-border">
              {artist.exhibitions.map((expo) => (
                <li
                  key={expo.id}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-5 border-b border-border"
                >
                  <div className="flex-grow">
                    <h3 className="font-sans font-semibold text-lg text-fg leading-snug">
                      {expo.title}
                    </h3>
                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wide">
                      {expo.venue} · {expo.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 tabular-nums">
                      {expo.year}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-neutral-600 dark:text-neutral-300">
                      {expo.type}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Redes + Seguir + prueba social */}
        <section aria-labelledby="seguir-title" className="bg-canvas border border-border rounded-[32px] shadow-sm p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Texto + CTA + redes */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
                  — Acompañá su andar
                </span>
                <h2 id="seguir-title" className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-fg mt-2">
                  Seguí a {artist.name.split(' ')[0]}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* CTA Seguir (primario azul) con estado optimista */}
                <button
                  type="button"
                  onClick={handleToggleFollow}
                  aria-pressed={following}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-sans font-semibold text-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1A1A1A] focus-visible:ring-accent ${
                    following
                      ? 'bg-[#E8F5FF] dark:bg-sky-950/40 text-accent border border-[#0084FF]/30'
                      : 'bg-accent hover:bg-[#006FD6] dark:bg-[#3D9DFF] text-white'
                  }`}
                >
                  {following ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Siguiendo
                    </>
                  ) : (
                    'Seguir a la artista'
                  )}
                </button>

                {/* Enlaces a redes (mock, _blank) */}
                {artist.socials?.instagram && (
                  <a
                    href={artist.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram de ${artist.name} (se abre en una pestaña nueva)`}
                    className="h-11 w-11 flex items-center justify-center rounded-md border border-border text-fg hover:border-accent hover:text-[#0084FF] dark:hover:text-[#3D9DFF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Instagram className="h-5 w-5" aria-hidden="true" />
                  </a>
                )}
                {artist.socials?.website && (
                  <a
                    href={artist.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Sitio web de ${artist.name} (se abre en una pestaña nueva)`}
                    className="h-11 w-11 flex items-center justify-center rounded-md border border-border text-fg hover:border-accent hover:text-[#0084FF] dark:hover:text-[#3D9DFF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Globe className="h-5 w-5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {/* Prueba social verificable (cerca, no encima del CTA) */}
            <dl className="flex gap-8 sm:gap-10 lg:border-l lg:border-[#E6E6E6] lg:dark:border-[#333333] lg:pl-12">
              <div className="flex flex-col">
                <dt className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" /> Seguidores
                </dt>
                <dd className="font-mono font-bold text-2xl text-fg tabular-nums mt-1">
                  {nf(followers)}
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> Mensajes
                </dt>
                <dd className="font-mono font-bold text-2xl text-fg tabular-nums mt-1">
                  {nf(visibleMessageCount)}
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Vistas
                </dt>
                <dd className="font-mono font-bold text-2xl text-fg tabular-nums mt-1">
                  {nf(artist.views ?? 0)}
                </dd>
              </div>
            </dl>
          </div>
        </section>
        {/* Muro de comunidad */}
        <CommunityWall
          artistId={artist.id}
          artistName={artist.name}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
