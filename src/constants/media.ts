/**
 * Rutas exactas de imágenes en `public/images/`.
 * Generado tras renombrar assets del usuario (extensiones mixtas).
 */

export const MEDIA = {
  hero: {
    landing: '/images/hero/landing.gif',
  },
  exhibition: {
    luzActiva: '/images/exhibition/luz-activa.jpg',
  },
  artists: {
    'elena-del-monte': '/images/artists/elena-del-monte.webp',
    'carlos-r': '/images/artists/carlos-r.webp',
    'sara-m': '/images/artists/sara-m.JPG',
    'mateo-j': '/images/artists/mateo-j.jpg',
  },
  artworks: {
    'ref-01': '/images/artworks/ref-01.jpg',
    'glow-04': '/images/artworks/glow-04.gif',
    'concrete-shadow': '/images/artworks/concrete-shadow.jpg',
    'marea-01': '/images/artworks/marea-01.webp',
    'geo-vacuo': '/images/artworks/geo-vacuo.webp',
    'frag-urbano': '/images/artworks/frag-urbano.webp',
    'prisma-suspendido': '/images/artworks/prisma-suspendido.webp',
    'umbral-cromatico': '/images/artworks/umbral-cromatico.jpg',
    'eco-de-luz': '/images/artworks/eco-de-luz.png',
  },
  venues: {
    'cafe-norte': '/images/venues/cafe-norte.jpg',
    'atendido-estudio': '/images/venues/atendido-estudio.JPG',
    'libreria-pasaje': '/images/venues/libreria-pasaje.png',
  },
} as const;

export const artistImage = (slug: keyof typeof MEDIA.artists) => MEDIA.artists[slug];

export const artworkImage = (id: keyof typeof MEDIA.artworks) => MEDIA.artworks[id];

export const venueImage = (id: keyof typeof MEDIA.venues) => MEDIA.venues[id];

const CV_EXHIBITIONS = [
  'cv-arte-mundialista',
  'cv-refracciones',
  'cv-luz-de-barrio',
  'cv-pigmento-vivo',
  'cv-primeros-azules',
] as const;

const CV_FILES = [
  'cv-arte-mundialista-01.jpeg',
  'cv-arte-mundialista-02.jpeg',
  'cv-arte-mundialista-03.jpeg',
  'cv-arte-mundialista-04.png',
  'cv-refracciones-01.jpg',
  'cv-refracciones-02.jpg',
  'cv-refracciones-03.jpeg',
  'cv-refracciones-04.jpeg',
  'cv-luz-de-barrio-01.jpg',
  'cv-luz-de-barrio-02.jpg',
  'cv-luz-de-barrio-03.jpeg',
  'cv-luz-de-barrio-04.jpeg',
  'cv-pigmento-vivo-01.jpeg',
  'cv-pigmento-vivo-02.jpeg',
  'cv-pigmento-vivo-03.png',
  'cv-pigmento-vivo-04.png',
  'cv-primeros-azules-01.jpeg',
  'cv-primeros-azules-02.jpeg',
  'cv-primeros-azules-03.jpeg',
  'cv-primeros-azules-04.jpeg',
] as const;

export const cvImage = (artistSlug: string, exhibitionId: string, index: number) => {
  const groupIndex = CV_EXHIBITIONS.indexOf(exhibitionId as (typeof CV_EXHIBITIONS)[number]);
  if (groupIndex === -1) return '';
  const fileIndex = groupIndex * 4 + (index - 1);
  const file = CV_FILES[fileIndex];
  return file ? `/images/cv/${artistSlug}/${file}` : '';
};

export const cvImages = (artistSlug: string, exhibitionId: string, count = 4) =>
  Array.from({ length: count }, (_, i) => cvImage(artistSlug, exhibitionId, i + 1)).filter(Boolean);
