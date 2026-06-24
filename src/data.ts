import { Artwork, Artist, Exhibition, Venue, WallMessage, Sticker } from './types';

export const EXHIBITION_DATA: Exhibition = {
  id: 'luz-activa',
  title: 'Arte mundialista',
  subtitle: 'Exposición Activa — Café Norte',
  locationName: 'Café Norte',
  address: 'Calle General Alvear 45, Planta Baja',
  dateRange: 'Junio 23 – Agosto 25, 2026',
  curatorText: 'La luz no solo ilumina, esculpe. Los cinco creadores reunidos en esta muestra investigan el impacto de la luz natural y artificial sobre las superficies cotidianas, creando diálogos efímeros a lo largo del día. Esta exposición itinerante busca resignificar y descentralizar las paredes ordinarias, transformando un café de barrio en una verdadera sala de contemplación estética.',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', // Stylish coffee shop with art feel
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Norte+Calle+General+Alvear+45+San+Isidro',
};

export const ARTISTS_DATA: Artist[] = [
  {
    id: 'elena-del-monte',
    name: 'Elena del Monte',
    bio: '"Exploro el caos a través del orden cromático."',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    specialty: 'Pintura Abstracta & Refracciones',
    // --- Perfil completo para la página de semblanza ---
    slug: 'elena-del-monte',
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1500',
    tagline: 'Pintura abstracta & refracciones · Buenos Aires',
    quote: 'No pinto la luz: la dejo entrar y veo qué decide hacer con el color.',
    semblanza: `Empecé mezclando pigmentos en la cocina de mi abuela, buscando un azul que no existía en ningún tubo. Desde entonces no he parado de perseguir colores que todavía no tienen nombre.

Mi obra nace de una obsesión simple: entender cómo la luz cambia lo que creemos que es fijo. Trabajo con barnices difractores y microcristales minerales para que cada cuadro responda al momento del día y a quién lo mira. Una misma pieza no se ve igual a las nueve de la mañana que al atardecer, y eso, para mí, es lo más honesto que puede hacer la pintura.

Vivo y trabajo en Buenos Aires, en un taller que da al norte. Me gusta pensar que mis obras no se terminan cuando salen de ahí, sino cuando alguien las cuelga en su casa y empieza a vivir con ellas.`,
    verified: true,
    socials: {
      instagram: 'https://instagram.com/elenadelmonte.art',
      website: 'https://elenadelmonte.art'
    },
    followers: 1284,
    views: 8730,
    exhibitions: [
      {
        id: 'cv-arte-mundialista',
        title: 'Arte Mundialista',
        venue: 'Café Norte',
        city: 'San Isidro',
        year: 2026,
        type: 'Colectiva'
      },
      {
        id: 'cv-refracciones',
        title: 'Refracciones',
        venue: 'Atendido Estudio',
        city: 'Palermo',
        year: 2025,
        type: 'Individual'
      },
      {
        id: 'cv-luz-de-barrio',
        title: 'Luz de Barrio',
        venue: 'Librería del Pasaje',
        city: 'San Telmo',
        year: 2024,
        type: 'Colectiva'
      },
      {
        id: 'cv-pigmento-vivo',
        title: 'Pigmento Vivo',
        venue: 'Casa Tomada',
        city: 'Rosario',
        year: 2023,
        type: 'Individual'
      },
      {
        id: 'cv-primeros-azules',
        title: 'Primeros Azules',
        venue: 'Espacio Cabildo',
        city: 'La Plata',
        year: 2022,
        type: 'Colectiva'
      }
    ]
  },
  {
    id: 'carlos-r',
    name: 'Carlos R.',
    bio: '"La geometría es el lenguaje de lo invisible."',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    specialty: 'Arte Geométrico & Vacío'
  },
  {
    id: 'sara-m',
    name: 'Sara M.',
    bio: '"Narrativas urbanas en capas de color."',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    specialty: 'Instalaciones & Difracción'
  },
  {
    id: 'mateo-j',
    name: 'Mateo J.',
    bio: '"Capturando la luz que otros ignoran."',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    specialty: 'Fotografía & Larga Exposición'
  }
];

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 'ref-01',
    title: 'Refracción 01',
    artistId: 'elena-del-monte',
    artistName: 'Elena del Monte',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
    status: 'Disponible',
    medium: 'Acrílico polimérico fluido y barniz difractor sobre lienzo puro de algodón montado en bastidor flotante.',
    dimensions: '120 x 120 cm',
    year: 2026,
    description: 'Investigación sobre el espectro visible dispersado en superficies planas. La pintura fue formulada artesanalmente con microcristales minerales que refractan diferentes tonos del iris según el ángulo del observador.'
  },
  {
    id: 'glow-04',
    title: 'Data Glow #4',
    artistId: 'carlos-r',
    artistName: 'Carlos R.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    status: 'Disponible',
    medium: 'Panel de acrílico translúcido grabado con CNC láser de precisión, matriz LED difusa y control algorítmico dinámico.',
    dimensions: '80 x 60 x 5 cm',
    year: 2026,
    description: 'Sincronización latente. El algoritmo interno lee fluctuaciones térmicas e intensidades del ambiente, traduciéndolas en ritmos respiratorios cromáticos que actúan como un pulso biológico dentro del café.'
  },
  {
    id: 'concrete-shadow',
    title: 'Sombras en Concreto',
    artistId: 'sara-m',
    artistName: 'Sara M.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800',
    status: 'Reservado',
    medium: 'Escultura brutalista en hormigón pigmentado con base de acero corten y apliques pulidos de latón naval.',
    dimensions: '45 x 30 x 25 cm',
    year: 2025,
    description: 'Una pieza pensada para ser colocada frente a ventanales. A medida de que transcurre el día, las aristas esculpidas proyectan sombras complejas sobre el suelo mientras que el latón pulido refleja destellos cálidos de sol.'
  },
  {
    id: 'marea-01',
    title: 'Marea Abstracta 01',
    artistId: 'elena-del-monte',
    artistName: 'Elena del Monte',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    status: 'Disponible',
    medium: 'Óleo y pigmentos puros sobre lino belga. Obra de gran escala.',
    dimensions: '180 x 150 cm',
    year: 2025,
    description: 'Búsqueda del movimiento oceánico a través de pinceladas gruesas de azules cobalto y turquesas mezcladas con texturas minerales flotantes.'
  },
  {
    id: 'geo-vacuo',
    title: 'Geometría del Vacío',
    artistId: 'carlos-r',
    artistName: 'Carlos R.',
    price: 3850,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    status: 'Disponible',
    medium: 'Impresión giclée en papel de algodón de archivo, enmarcada bajo vidrio de museo antirreflejo.',
    dimensions: '100 x 80 cm',
    year: 2026,
    description: 'Toma única. Perspectiva cenital del patio central del Centro Cívico capturado durante la última hora de luz dorada, aislando formas puras y sombras proyectadas.'
  },
  {
    id: 'frag-urbano',
    title: 'Fragmento Urbano',
    artistId: 'sara-m',
    artistName: 'Sara M.',
    price: 5110,
    image: 'https://images.unsplash.com/photo-1502691876148-a846f102ca52?auto=format&fit=crop&q=80&w=800',
    status: 'Vendido',
    medium: 'Placas suspendidas de vidrio fundido coloreado con óxidos metálicos, cables tensados de acero estructural.',
    dimensions: '300 x 100 x 80 cm',
    year: 2024,
    description: 'Instalación de sitio específico. Consta de 15 piezas flotantes esculpidas al calor, suspendidas para filtrar la luz solar directa, convirtiendo las pinceladas de sombra coloreada en materia física móvil.'
  },
  {
    id: 'prisma-suspendido',
    title: 'Prisma Suspendido',
    artistId: 'elena-del-monte',
    artistName: 'Elena del Monte',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1558865869-c93f6f8482af?auto=format&fit=crop&q=80&w=800',
    status: 'Disponible',
    medium: 'Acrílico fluido y resina cristalina sobre panel de madera de abedul.',
    dimensions: '100 x 100 cm',
    year: 2025,
    description: 'Capas de resina translúcida atrapan el pigmento como si fuera luz detenida. Según el ángulo, el azul se vuelve verde y el verde se vuelve oro.'
  },
  {
    id: 'umbral-cromatico',
    title: 'Umbral Cromático',
    artistId: 'elena-del-monte',
    artistName: 'Elena del Monte',
    price: 1750,
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800',
    status: 'Disponible',
    medium: 'Óleo y barniz difractor sobre lienzo de algodón.',
    dimensions: '90 x 120 cm',
    year: 2024,
    description: 'Un degradado que nunca se queda quieto: pensado para colgarse frente a una ventana, cambia con cada hora del día.'
  },
  {
    id: 'eco-de-luz',
    title: 'Eco de Luz',
    artistId: 'elena-del-monte',
    artistName: 'Elena del Monte',
    price: 3300,
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&q=80&w=800',
    status: 'Reservado',
    medium: 'Pigmentos minerales y pan de oro sobre lino belga.',
    dimensions: '150 x 110 cm',
    year: 2026,
    description: 'La obra más reciente de la serie. El pan de oro devuelve destellos cálidos que reverberan sobre los azules fríos del fondo.'
  }
];

export const VENUES_DATA: Venue[] = [
  {
    id: 'cafe-norte',
    name: 'Café Norte',
    type: 'Cafetería de Especialidad & Tostadero',
    address: 'Calle General Alvear 45, Planta Baja, San Isidro',
    activeExhibitionsCount: 1,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'atendido-estudio',
    name: 'Atendido Estudio',
    type: 'Concept Store & Taller de Encuadernación',
    address: 'Avenida Coronel Díaz 1845, Palermo',
    activeExhibitionsCount: 0,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'libreria-pasaje',
    name: 'Librería del Pasaje',
    type: 'Librería de Editores & Espacio de Té',
    address: 'Pasaje del Sol 14, San Telmo',
    activeExhibitionsCount: 0,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=500'
  }
];

export const MANIFIESTO = `
Andante nace para dinamitar el cubo blanco tradicional de las galerías de arte burguesas. Creemos que la alta cultura no debe encapsularse en templos silenciosos ni asépticos. El arte late cuando respira el aire cotidiano, cuando se mezcla con el aroma del café recién molido, la madera curtida de los talleres y las páginas húmedas de los libros.

Somos un puente nómade híbrido: curamos exposiciones físicas rigurosas que habitan los espacios donde la gente ya vive y conversa de forma orgánica, y proveemos la infraestructura digital para dar cobijo, visibilidad y sostenibilidad económica directa a los creadores independientes. 

Cada obra adquirida en Andante es una parte física que fue pensada para dialogar en comunidad, acompañada de un certificado digital encriptado de autenticidad y entrega cuidada puerta a puerta.
`;

// --- Muro de comunidad ---

// Paleta CERRADA de stickers (sin subida de imágenes). Cada uno con texto alternativo accesible.
export const STICKER_PALETTE: Sticker[] = [
  { emoji: '🎨', alt: 'paleta de pintura' },
  { emoji: '✨', alt: 'destellos' },
  { emoji: '❤️', alt: 'corazón' },
  { emoji: '👏', alt: 'aplausos' },
  { emoji: '🙌', alt: 'manos en alto' },
  { emoji: '🌿', alt: 'rama de hojas' },
  { emoji: '🔥', alt: 'fuego' },
  { emoji: '👀', alt: 'ojos mirando' },
  { emoji: '🪄', alt: 'varita mágica' },
  { emoji: '☕', alt: 'taza de café' }
];

// Lista mock de palabras vetadas para la moderación del cliente (~10).
export const BANNED_WORDS: string[] = [
  'idiota',
  'estúpido',
  'estúpida',
  'basura',
  'imbécil',
  'tonto',
  'feo',
  'horrible',
  'spam',
  'estafa'
];

// Helper para sembrar timestamps relativos al momento en que corre la demo,
// así "hace 2 h" siempre es coherente sin importar la fecha.
const minutesAgo = (m: number): string => new Date(Date.now() - m * 60_000).toISOString();

// SEMBRADO del muro de Elena del Monte: nunca nace vacío.
export const WALL_SEED: WallMessage[] = [
  {
    id: 'wall-welcome',
    artistId: 'elena-del-monte',
    author: 'Elena del Monte',
    role: 'artista',
    text: '¡Bienvenides a mi muro! Acá voy dejando lo que voy descubriendo en el taller. Gracias por pasar a mirar.',
    sticker: '🎨',
    createdAt: minutesAgo(60 * 24 * 6), // hace 6 días
    hearts: 42,
    pinned: true
  },
  {
    id: 'wall-cafe',
    artistId: 'elena-del-monte',
    author: 'Café Norte',
    role: 'espacio',
    text: 'Es un gusto tener las obras de Elena colgadas en nuestras paredes. Vení a verlas con un café de por medio. ☕',
    sticker: '🌿',
    createdAt: minutesAgo(60 * 26), // hace ~1 día
    hearts: 18
  },
  {
    id: 'wall-v1',
    artistId: 'elena-del-monte',
    author: 'Mariana T.',
    role: 'visitante',
    text: 'Vi "Eco de Luz" en persona y no pude dejar de mirarla. El oro cambia con cada paso. Una genia.',
    sticker: '✨',
    createdAt: minutesAgo(60 * 5), // hace 5 h
    hearts: 9
  },
  {
    id: 'wall-v2',
    artistId: 'elena-del-monte',
    author: 'Joaco',
    role: 'visitante',
    sticker: '🔥',
    createdAt: minutesAgo(135), // hace ~2 h
    hearts: 4
  },
  {
    id: 'wall-v3',
    artistId: 'elena-del-monte',
    author: 'Coleccionista anónime',
    role: 'visitante',
    text: 'Me llevé "Prisma Suspendido" para el living. Cada mañana se ve distinta. Gracias, Elena.',
    sticker: '🙌',
    createdAt: minutesAgo(48), // hace 48 min
    hearts: 12
  },
  {
    id: 'wall-v4',
    artistId: 'elena-del-monte',
    author: 'Sol',
    role: 'visitante',
    text: '¿Va a haber una activación con vos este mes? Me encantaría ir.',
    createdAt: minutesAgo(15), // hace 15 min
    hearts: 2
  }
];
