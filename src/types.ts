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

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  specialty: string;
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
