export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  price: number;
  image: string;
  status: 'Disponible' | 'Reservado' | 'Vendido';
  medium: string;
  dimensions: string;
  year: number;
  description: string;
}

export interface ArtistSocials {
  instagram?: string;
  website?: string;
}

// Una entrada del CV expositivo (trayectoria), más reciente primero.
export interface ExhibitionCredit {
  id: string;
  title: string;
  venue: string; // espacio anfitrión
  city: string;
  year: number;
  type: 'Individual' | 'Colectiva';
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  specialty: string;
  // --- Campos de la página de semblanza (opcionales: solo artistas con perfil completo) ---
  slug?: string;
  portrait?: string; // retrato a sangre para el hero
  tagline?: string; // medio + ciudad (Body Large)
  semblanza?: string; // narrativa en 1ª persona (puede tener varios párrafos con \n\n)
  quote?: string; // cita destacada (Syne Italic)
  verified?: boolean;
  socials?: ArtistSocials;
  followers?: number;
  views?: number;
  exhibitions?: ExhibitionCredit[];
}

// --- Muro de comunidad ---
export type WallAuthorRole = 'artista' | 'espacio' | 'visitante';

export interface WallMessage {
  id: string;
  artistId: string; // a qué muro pertenece
  author: string;
  role: WallAuthorRole;
  text?: string;
  sticker?: string; // emoji de la paleta cerrada
  createdAt: string; // ISO timestamp
  hearts: number;
  pinned?: boolean;
  hidden?: boolean;
}

// Sticker de la paleta cerrada, con texto alternativo accesible.
export interface Sticker {
  emoji: string;
  alt: string;
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  locationName: string;
  address: string;
  dateRange: string;
  curatorText: string;
  image: string;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  address: string;
  activeExhibitionsCount: number;
  image: string;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  notes?: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}
