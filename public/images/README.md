# Imágenes locales — Andante MVP

Coloca aquí tus archivos **con estos nombres exactos**. El proyecto ya apunta a estas rutas.

**Formatos aceptados:** `.jpg`, `.jpeg` o `.webp` — usa la extensión que prefieras, pero el nombre base debe coincidir (si usas `.webp`, avisa para actualizar `src/constants/media.ts`).

**Resolución sugerida**

| Uso | Ancho orientativo |
|-----|-------------------|
| Hero / retratos | ~1500 px |
| Obras / exposición | ~1200 px |
| CV (image-trail) | ~800 px |
| Avatares / venues | ~600 px (una foto grande sirve para todo) |

---

## Checklist de archivos

### `hero/` (1)

| Archivo | Dónde se ve |
|---------|-------------|
| `landing.jpg` | Hero del home (LandingView) |

### `exhibition/` (1)

| Archivo | Dónde se ve |
|---------|-------------|
| `luz-activa.jpg` | Cover exposición activa, carrusel Expo Activa, thumb menú "Arte mundialista" |

### `artists/` (4)

| Archivo | Artista | Dónde se ve |
|---------|---------|-------------|
| `elena-del-monte.jpg` | Elena del Monte | Lista de artistas, avatar y retrato hero (semblanza) |
| `carlos-r.jpg` | Carlos R. | Lista de artistas |
| `sara-m.jpg` | Sara M. | Lista de artistas |
| `mateo-j.jpg` | Mateo J. | Lista de artistas |

> **Elena:** una sola foto en alta resolución basta para avatar y retrato.

### `artworks/` (9)

| Archivo | Obra |
|---------|------|
| `ref-01.jpg` | Refracción 01 |
| `glow-04.jpg` | Data Glow #4 |
| `concrete-shadow.jpg` | Sombras en Concreto |
| `marea-01.jpg` | Marea Abstracta 01 |
| `geo-vacuo.jpg` | Geometría del Vacío |
| `frag-urbano.jpg` | Fragmento Urbano |
| `prisma-suspendido.jpg` | Prisma Suspendido |
| `umbral-cromatico.jpg` | Umbral Cromático |
| `eco-de-luz.jpg` | Eco de Luz |

### `cv/elena-del-monte/` (20)

Cuatro fotos por muestra (image-trail al hover en semblanza). También se usan como thumbs del menú de exposiciones pasadas.

| Archivo | Muestra |
|---------|---------|
| `cv-arte-mundialista-01.jpg` … `-04.jpg` | Arte Mundialista (2026) |
| `cv-refracciones-01.jpg` … `-04.jpg` | Refracciones (2025) |
| `cv-luz-de-barrio-01.jpg` … `-04.jpg` | Luz de Barrio (2025) |
| `cv-pigmento-vivo-01.jpg` … `-04.jpg` | Pigmento Vivo (2023) |
| `cv-primeros-azules-01.jpg` … `-04.jpg` | Primeros Azules (2022) |

> Puedes reutilizar fotos de `artworks/` en el CV si corresponden a la misma pieza (copia el archivo con el nombre del CV).

### `venues/` (3)

| Archivo | Espacio |
|---------|---------|
| `cafe-norte.jpg` | Café Norte |
| `atendido-estudio.jpg` | Atendido Estudio |
| `libreria-pasaje.jpg` | Librería del Pasaje |

---

## Total: 38 archivos únicos

```
public/images/
├── hero/
│   └── landing.jpg
├── exhibition/
│   └── luz-activa.jpg
├── artists/
│   ├── elena-del-monte.jpg
│   ├── carlos-r.jpg
│   ├── sara-m.jpg
│   └── mateo-j.jpg
├── artworks/
│   ├── ref-01.jpg
│   ├── glow-04.jpg
│   ├── concrete-shadow.jpg
│   ├── marea-01.jpg
│   ├── geo-vacuo.jpg
│   ├── frag-urbano.jpg
│   ├── prisma-suspendido.jpg
│   ├── umbral-cromatico.jpg
│   └── eco-de-luz.jpg
├── cv/
│   └── elena-del-monte/
│       ├── cv-arte-mundialista-01.jpg … -04.jpg
│       ├── cv-refracciones-01.jpg … -04.jpg
│       ├── cv-luz-de-barrio-01.jpg … -04.jpg
│       ├── cv-pigmento-vivo-01.jpg … -04.jpg
│       └── cv-primeros-azules-01.jpg … -04.jpg
└── venues/
    ├── cafe-norte.jpg
    ├── atendido-estudio.jpg
    └── libreria-pasaje.jpg
```

Cuando hayas poblado la carpeta, recarga el dev server (`npm run dev`) — no hace falta tocar código.
