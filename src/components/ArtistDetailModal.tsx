import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, SealCheck, InstagramLogo, Globe, Check } from '@phosphor-icons/react';
import { Artist } from '../types';
import ImageTrail from './ImageTrail';

interface ArtistDetailModalProps {
  artist: Artist;
  onClose: () => void;
}

export default function ArtistDetailModal({ artist, onClose }: ArtistDetailModalProps) {
  // Seguir: estado optimista local (sin backend)
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(artist.followers ?? 0);

  const handleToggleFollow = () => {
    setFollowers((n) => (following ? n - 1 : n + 1));
    setFollowing((prev) => !prev);
  };

  // Image trail
  const [activeImages, setActiveImages] = useState<string[] | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // El trail solo en punteros finos y sin reduced-motion.
  const [trailEnabled, setTrailEnabled] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    const sync = () => setTrailEnabled(!reduce.matches && fine.matches);
    sync();
    reduce.addEventListener('change', sync);
    fine.addEventListener('change', sync);
    return () => {
      reduce.removeEventListener('change', sync);
      fine.removeEventListener('change', sync);
    };
  }, []);

  // Cerrar con Escape + lock de scroll + foco inicial.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const nf = (n: number) => n.toLocaleString('es-AR');
  const exhibitions = artist.exhibitions ?? [];

  return (
    <div className="fixed inset-0 z-55">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md"
      />

      {/* Panel casi a pantalla completa */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Semblanza de ${artist.name}`}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-3 sm:inset-6 md:inset-[40px] bg-footer text-on-inverse rounded-[28px] md:rounded-[40px] overflow-hidden shadow-2xl"
      >
        {/* Cerrar */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Cerrar semblanza"
          className="focus-ring absolute top-5 right-5 sm:top-7 sm:right-7 z-30 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-on-inverse flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Cuerpo con scroll-snap: 2 secciones (identidad / trayectoria) */}
        <div className="absolute inset-0 overflow-y-auto snap-y snap-mandatory scroll-smooth">

          {/* SNAP 1 — foto, redes, nombre, formato, semblanza + seguir */}
          <section className="snap-start snap-always min-h-full flex flex-col justify-center px-6 sm:px-10 md:px-[64px] py-16 md:py-[80px]">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-10 sm:gap-[52px]">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-[100px] lg:items-start">
                <div className="flex-1 min-w-0 flex flex-col gap-5">
                  <div className="flex items-end justify-between gap-4">
                    <img
                      src={artist.portrait || artist.image}
                      alt={`Retrato de ${artist.name}`}
                      referrerPolicy="no-referrer"
                      className="size-[120px] sm:size-[150px] md:size-[178px] rounded-[32px] object-cover shrink-0"
                    />
                    <div className="flex gap-3 items-center">
                      {artist.socials?.instagram && (
                        <a
                          href={artist.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Instagram de ${artist.name} (se abre en una pestaña nueva)`}
                          className="focus-ring h-12 w-12 flex items-center justify-center rounded-[12px] border border-white/10 text-on-inverse hover:border-white/30 transition-colors"
                        >
                          <InstagramLogo className="h-5 w-5" aria-hidden="true" />
                        </a>
                      )}
                      {artist.socials?.website && (
                        <a
                          href={artist.socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Sitio web de ${artist.name} (se abre en una pestaña nueva)`}
                          className="focus-ring h-12 w-12 flex items-center justify-center rounded-[12px] border border-white/10 text-on-inverse hover:border-white/30 transition-colors"
                        >
                          <Globe className="h-5 w-5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {artist.verified && (
                      <span className="inline-flex w-fit items-center gap-1.5 bg-brand text-on-brand px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                        <SealCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Artista verificada
                      </span>
                    )}
                    <h2 className="font-mono uppercase text-on-inverse text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] break-words">
                      {artist.name}
                    </h2>
                    {artist.tagline && (
                      <p className="text-base text-on-inverse/70">{artist.tagline}</p>
                    )}
                  </div>

                  {/* Seguir + redes */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleToggleFollow}
                      aria-pressed={following}
                      className={`focus-ring inline-flex items-center gap-2 px-6 py-3 rounded-md font-sans font-semibold text-sm transition-colors cursor-pointer ${
                        following
                          ? 'bg-white/10 text-on-inverse border border-white/20'
                          : 'bg-accent hover:bg-accent-hover text-on-accent'
                      }`}
                    >
                      {following ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          Siguiendo
                        </>
                      ) : (
                        `Seguir a ${artist.name.split(' ')[0]}`
                      )}
                    </button>
                    <span className="font-mono text-xs uppercase tracking-wider text-on-inverse/50 tabular-nums">
                      {nf(followers)} seguidores
                    </span>
                  </div>
                </div>

                {artist.semblanza && (
                  <div className="flex-1 min-w-0 font-mono text-[15px] sm:text-base leading-[1.6] text-on-inverse/75 flex flex-col gap-6">
                    {artist.semblanza.trim().split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Hint de scroll a la siguiente sección */}
              {exhibitions.length > 0 && (
                <div className="flex items-center gap-3 text-on-inverse/50">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    Scroll · trayectoria
                  </span>
                  <span aria-hidden="true" className="animate-bounce">↓</span>
                </div>
              )}
            </div>
          </section>

          {/* SNAP 2 — "Dónde ha colgado" (lista + image trail) */}
          {exhibitions.length > 0 && (
            <section className="snap-start snap-always min-h-full flex flex-col justify-center px-6 sm:px-10 md:px-[64px] py-16 md:py-[80px]">
              <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-8 sm:gap-10">
                <p className="font-mono text-xs uppercase tracking-widest text-on-inverse/70">
                  — Dónde ha colgado
                </p>
                <ul
                  ref={listRef}
                  onMouseLeave={() => {
                    setActiveImages(null);
                    setHovered(null);
                  }}
                  className="border-b border-white/10"
                >
                  {exhibitions.map((expo, i) => (
                    <li
                      key={expo.id}
                      onMouseEnter={() => {
                        setHovered(i);
                        setActiveImages(expo.images && expo.images.length ? expo.images : null);
                      }}
                      className="group border-t border-white/10 py-6"
                      style={{
                        opacity: hovered !== null && hovered !== i ? 0.4 : 1,
                        transition: 'opacity 0.35s ease',
                      }}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex flex-col gap-1.5 min-w-0">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-on-inverse truncate transition-transform duration-300 group-hover:translate-x-2">
                            {expo.title}
                          </h3>
                          <p className="font-mono text-[13px] text-on-inverse/60">
                            <span>{expo.venue}</span>
                            <span className="text-white/20"> · </span>
                            <span>{expo.city}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                          <span className="font-mono text-sm text-on-inverse/60 tabular-nums">
                            {expo.year}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider border border-white/30 rounded-[4px] px-2 py-1 text-on-inverse/70">
                            {expo.type}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Capa del image trail (sobre el contenido, bajo el botón cerrar) */}
        <ImageTrail
          activeImages={activeImages}
          panelRef={panelRef}
          listRef={listRef}
          enabled={trailEnabled}
        />
      </motion.div>
    </div>
  );
}
