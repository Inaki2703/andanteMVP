import { Artwork, Artist, Exhibition, Venue } from './types';

export const EXHIBITION_DATA: Exhibition = {
  id: 'luz-activa',
  title: 'Arte mundialista',
  subtitle: 'Exposición Activa — Café Norte',
  locationName: 'Café Norte',
  address: 'Calle General Alvear 45, Planta Baja',
  dateRange: 'Junio 01 – Julio 15, 2026',
  curatorText: 'La luz no solo ilumina, esculpe. Los cinco creadores reunidos en esta muestra investigan el impacto de la luz natural y artificial sobre las superficies cotidianas, creando diálogos efímeros a lo largo del día. Esta exposición itinerante busca resignificar y descentralizar las paredes ordinarias, transformando un café de barrio en una verdadera sala de contemplación estética.',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200' // Stylish coffee shop with art feel
};

export const ARTISTS_DATA: Artist[] = [
  {
    id: 'elena-del-monte',
    name: 'Elena del Monte',
    bio: '"Exploro el caos a través del orden cromático."',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    specialty: 'Pintura Abstracta & Refracciones'
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
