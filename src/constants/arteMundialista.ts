import { Artwork } from '../types';
import { artworkImage } from './media';

/** Piezas de Arte Mundialista — misma selección y orden en home (carrusel) y expo (cards). */
export const ARTE_MUNDIALISTA_ARTWORK_IDS = [
  'ref-01',
  'glow-04',
  'concrete-shadow',
  'marea-01',
  'geo-vacuo',
  'prisma-suspendido',
  'umbral-cromatico',
  'frag-urbano',
  'eco-de-luz',
] as const;

export const ARTE_MUNDIALISTA_CAROUSEL_IMAGES = ARTE_MUNDIALISTA_ARTWORK_IDS.map((id) =>
  artworkImage(id)
);

export function getArteMundialistaArtworks(catalog: Artwork[]): Artwork[] {
  return ARTE_MUNDIALISTA_ARTWORK_IDS.map((id) => catalog.find((a) => a.id === id)).filter(
    (a): a is Artwork => Boolean(a)
  );
}
