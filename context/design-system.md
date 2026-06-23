# Andante Design System

> Galería itinerante digital. Expresiva, con carácter y buen humor. El arte no tiene por qué quedarse quieto —pero tampoco hace falta gritar.

**Versión:** 3.0 · MVP
**Base tipográfica:** Syne
**Paleta núcleo:** `#D4F334` · `#0084FF` · `#F2F2F2` · `#333333`

---

## Visión

Andante es una galería itinerante digital que lleva el arte a espacios reales y a la web. El sistema visual es **editorial, cálido y con personalidad**: verde lima como firma, azul vibrante como contrapunto, ilustraciones a línea con humor y una tipografía amable que acompaña sin imponerse.

La actitud sigue ahí —Andante tiene voz propia— pero la composición respira. El color y la ilustración aportan el carácter; el resto de la interfaz se mantiene tranquilo, limpio y legible. El protagonismo se reserva para los momentos que de verdad lo merecen.

---

## Principios de Diseño

1. **Carácter con calma.** La personalidad vive en el color, la ilustración y los titulares —no en saturar cada elemento. La interfaz base es serena para que los acentos destaquen.
2. **Contraste con criterio.** El alto contraste es un recurso de jerarquía, no un default. Se reserva para piezas hero y llamados clave; el resto usa contraste suave y agradable.
3. **Tipografía que convive.** Pesos moderados que se integran orgánicamente en la composición. Los titulares tienen presencia por tamaño y aire, no por peso extremo.
4. **El espacio respeta la obra.** Cuando entra una obra real (foto, e-commerce), el ruido baja: fondos neutros, márgenes generosos, la pieza manda.
5. **Humor y humanidad.** Ilustraciones a línea, caras sonrientes escondidas, guiños visuales. El arte es serio; comunicarlo, no.
6. **Composición por capas.** Imagen de fondo + contenedor flotante con lo esencial. Profundidad y foco sin saturación (ver patrón Hero).

---

## Paleta de Color

### Colores núcleo

| Token | Hex | Nombre | Rol |
|-------|-----|--------|-----|
| `lima` | `#D4F334` | Verde lima | Color de marca. Acentos, highlights, badges, momentos de impacto puntuales |
| `azul` | `#0084FF` | Azul Andante | Contrapunto. CTA primario, links, estados activos |
| `humo` | `#F2F2F2` | Gris humo | Superficie clara neutra. Fondos, tarjetas, contenedores |
| `carbon` | `#333333` | Carbón | Texto principal, ilustraciones a línea, fondos oscuros |

### Modo Claro

**Texto y trazo**
- `#333333` (Carbón) — Texto principal, títulos, line-art
- `#5C5C5C` (Carbón medio) — Texto secundario
- `#8A8A8A` (Gris) — Texto terciario, placeholders, captions

**Superficies**
- `#FFFFFF` (Blanco) — Fondo base / lienzo de obra / contenedores flotantes
- `#F2F2F2` (Gris humo) — Fondo de sección, tarjetas
- `#E6E6E6` (Gris humo oscuro) — Divisores, bordes sutiles, hover de superficie

**Marca y acento**
- `#0084FF` (Azul) — Botón primario, enlaces, foco
- `#D4F334` (Lima) — Acentos puntuales, badges, subrayados, highlights
- `#006FD6` (Azul sombra) — Hover sobre azul
- `#C2E02E` (Lima sombra) — Hover sobre lima

### Modo Oscuro

**Texto y trazo**
- `#F2F2F2` (Gris humo) — Texto principal, line-art invertido
- `#B8B8B8` (Gris claro) — Texto secundario
- `#7A7A7A` (Gris medio) — Terciario, placeholders

**Superficies**
- `#1A1A1A` (Casi negro) — Fondo base
- `#242424` (Carbón claro) — Tarjetas, contenedores
- `#333333` (Carbón) — Divisores, hover de superficie

**Marca y acento**
- `#3D9DFF` (Azul claro) — CTA, links (ajustado para contraste)
- `#D4F334` (Lima) — Se mantiene; acento puntual
- `#0084FF` (Azul) — Active / pressed
- `#B8D62E` (Lima apagada) — Hover de lima en oscuro

### Semánticos (ambos modos)

| Estado | Claro | Oscuro |
|--------|-------|--------|
| Éxito | `#2E7D46` | `#5FD98A` |
| Error | `#D64533` | `#FF7A66` |
| Advertencia | `#E08A1E` | `#FFB94D` |
| Información | `#0084FF` | `#3D9DFF` |

> **Reglas de color**
> - Lima y azul nunca compiten como fondo a sangre en la misma vista. Uno acentúa, el otro descansa.
> - **El lima es acento, no fondo dominante.** Úsese en dosis pequeñas (badges, subrayados, detalles); los fondos a sangre de lima se reservan para piezas de campaña puntuales.
> - El texto sobre lima siempre es carbón (`#333333`), nunca blanco.
> - La mayor parte de la interfaz vive sobre neutros (`#FFFFFF`, `#F2F2F2`). El color entra como puntuación, no como base.

---

## Tipografía

### Familia

**Syne** es la tipografía única del sistema. Su personalidad geométrica encaja con la marca, pero se usa con **pesos moderados** para que conviva con la composición sin pesar.

- **Syne** — Pesos: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Syne Mono** para etiquetas, números de paso, metadatos y microcopy técnico.
- **Fallback:** `"Syne", "Inter", system-ui, -apple-system, sans-serif`

> El peso 800 (Extrabold) se retira como default. Reservar Bold (700) como tope para titulares hero; el resto vive entre 400 y 600.

### Roles tipográficos

| Uso | Familia | Peso |
|-----|---------|------|
| Display / Hero | Syne | 700 (Bold) |
| Títulos H1–H2 | Syne | 600 (Semibold) |
| Subtítulos H3–H5 | Syne | 500/600 |
| Cuerpo | Syne | 400 |
| Énfasis en cuerpo | Syne | 600 |
| Etiquetas / metadatos / pasos | Syne Mono | 400 |
| Citas editoriales | Syne Italic | 500 |

### Escala tipográfica

| Nivel | Familia | Tamaño | Peso | Espaciado | Caso |
|-------|---------|--------|------|-----------|------|
| Display | Syne | 64px | 700 | -0.02em | Title / UPPERCASE selectivo |
| H1 | Syne | 48px | 700 | -0.015em | Title case |
| H2 | Syne | 36px | 600 | -0.015em | Title case |
| H3 | Syne | 28px | 600 | -0.01em | Title case |
| H4 | Syne | 22px | 500 | -0.01em | Title case |
| H5 | Syne | 18px | 500 | 0em | Title case |
| Body Large | Syne | 18px | 400 | 0em | Sentence case |
| Body | Syne | 16px | 400 | 0em | Sentence case |
| Body Small | Syne | 14px | 400 | 0.1px | Sentence case |
| Label / Step | Syne Mono | 12px | 400 | 0.5px | UPPERCASE |
| Caption | Syne Mono | 11px | 400 | 0.4px | Sentence case |

**Notas de uso editorial**
- Los titulares tienen presencia por **tamaño y aire generoso**, no por peso extremo. Peso 700 como máximo, y solo en display/hero.
- Las mayúsculas se usan con mesura: en titulares hero puntuales o en labels mono, no en todo título.
- El cuerpo descriptivo puede usar Syne Mono para un aire técnico, pero sin abusar.
- Las citas de marca pueden ir en Syne Italic.

---

## Densidad de Interfaz: Espaciosa

### Spacing System (Base 8px)

| Token | Valor | Uso |
|-------|-------|-----|
| `spacing-xs` | 8px | Gaps inline |
| `spacing-sm` | 16px | Padding de botones, gaps pequeños |
| `spacing-md` | 24px | Entre tarjetas y componentes |
| `spacing-lg` | 32px | Secciones, gaps medianos |
| `spacing-xl` | 48px | Entre bloques grandes |
| `spacing-2xl` | 64px | Márgenes de página |
| `spacing-3xl` | 96px | Espacios heroicos, respiros editoriales |

### Layout Grid

- **Desktop:** 12 columnas, gutter 32px, márgenes laterales 48px
- **Tablet:** 8 columnas, gutter 24px, márgenes laterales 32px
- **Mobile:** 4 columnas, gutter 16px, márgenes laterales 16px

### Padding de componentes

- **Botones:** 14px vertical × 26px horizontal
- **Tarjetas:** 24–32px interior
- **Inputs:** 14px vertical × 18px horizontal
- **Modales:** 40px interior
- **Contenedor hero flotante:** 48–64px interior

---

## Design Tokens

### Border Radius

Bordes redondeados de forma consistente —nada de cantos a 0px como default. La suavidad es parte de la nueva apariencia.

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | 8px | Inputs, badges, chips |
| `radius-md` | 12px | Botones, tarjetas pequeñas |
| `radius-lg` | 16px | Tarjetas, contenedores medianos |
| `radius-xl` | 24px | Tarjetas de obra, contenedor hero, sheets |
| `radius-2xl` | 32px | Bloques grandes, modales, contenedores flotantes |
| `radius-full` | 50% | Avatares, badges circulares |

### Borde de marca

- Trazo estándar: `1.5px solid #E6E6E6` para bordes sutiles de UI.
- Trazo gráfico (cuando se busca el look line-art): `2px solid #333333`, usado con mesura.
- Sobre fondos oscuros: `1.5px solid #333333` o acento lima puntual.

### Shadows

Sombras **suaves y discretas**; la jerarquía la da la composición por capas y el contraste reservado, no la elevación dramática.

**Modo Claro**
| Token | Valor |
|-------|-------|
| `shadow-sm` | 0 2px 8px rgba(51, 51, 51, 0.06) |
| `shadow-md` | 0 8px 24px rgba(51, 51, 51, 0.10) |
| `shadow-lg` | 0 16px 48px rgba(51, 51, 51, 0.14) |

**Modo Oscuro**
| Token | Valor |
|-------|-------|
| `shadow-sm` | 0 2px 8px rgba(0, 0, 0, 0.4) |
| `shadow-md` | 0 8px 24px rgba(0, 0, 0, 0.5) |
| `shadow-lg` | 0 16px 48px rgba(0, 0, 0, 0.6) |

### Estados Interactivos

- **Hover:** desplazamiento de color (azul→`#006FD6`, lima→`#C2E02E`) o fondo +4% contraste.
- **Active/pressed:** escala 0.98 + color sombra.
- **Focus:** outline `2px` azul (`#0084FF`), offset `2px`.
- **Disabled:** opacidad 45%, cursor not-allowed.

---

## Componentes Clave

### Hero (patrón principal)

El hero define el tono de la nueva apariencia: **profundidad por capas, foco en lo esencial.**

- **Capa de fondo:** imagen a sangre (obra, foto de campaña, textura) cubriendo el viewport.
- **Capa flotante:** contenedor claro (`#FFFFFF` o `#F2F2F2`) superpuesto, con `radius-2xl` (32px), `shadow-md` y padding `48–64px`.
- **Contenido del contenedor:** solo lo más relevante —titular grande (Display/H1), una línea de apoyo (Body Large), y un CTA primario. Nada más compite.
- **Acentos:** un detalle de color (subrayado lima, ilustración a línea, flecha) aporta el carácter; el resto descansa sobre neutro.
- El contenedor no ocupa todo el ancho: deja ver la imagen de fondo por los márgenes para mantener la sensación de capas.

> Referencia de composición (no de estilo): imagen de fondo + contenedor flotante con titular y CTA centrados. Tomar la *estructura por capas*, no los colores ni la tipografía de la referencia.

### Botones

**Primario (azul)**
- Background: `#0084FF` (claro) / `#3D9DFF` (oscuro)
- Texto: `#FFFFFF`, Syne 600, 16px
- Padding: 14px × 26px · Radius: `radius-md`
- Hover: `#006FD6`

**Acento (lima)**
- Background: `#D4F334`
- Texto: `#333333` (siempre carbón), Syne 600
- Padding: 14px × 26px · Radius: `radius-md`
- Hover: `#C2E02E`
- Uso puntual: CTA de campaña, momentos de impacto. No como botón por defecto.

**Secundario (outline)**
- Background: transparente
- Borde: `1.5px solid #333333` (claro) / `1.5px solid #F2F2F2` (oscuro)
- Texto: carbón / humo, Syne 500
- Padding: 13px × 24px · Radius: `radius-md`

**Terciario (texto)**
- Solo texto azul con flecha ↗; subrayado en hover.

### Tarjeta de Obra

- Lienzo de imagen sobre fondo `#FFFFFF` / `#242424`.
- Radius: `radius-xl` (24px).
- Padding interior: 24px.
- Jerarquía: imagen → título de obra (Syne 600, H5) → artista + precio (Syne Mono, body small).
- Hover: leve `shadow-md` + título a azul.

### Tarjeta de Proceso / Paso

- Número en Syne 700 (carbón) en la esquina superior izquierda, tamaño contenido.
- Imagen/ilustración dentro de contenedor `radius-lg` sobre fondo neutro o lima puntual.
- Texto en Syne Mono o Syne 400, debajo.
- Flecha ↗ opcional como continuidad.

### Bloque Editorial a Color

- Reservado para momentos de campaña, no para uso frecuente.
- Fondo a sangre en `#D4F334` o `#0084FF`, con `radius-2xl` si es contenedor (no a sangre total salvo hero de campaña).
- Titular en mayúsculas o title case (carbón sobre lima; blanco sobre azul).
- Ilustración a línea integrada.
- Generoso `spacing-2xl`–`3xl`.

### Input Fields

- Fondo: `#FFFFFF` / `#242424`
- Borde: `1.5px solid #E6E6E6` / `#333333`
- Padding: 14px × 18px · Radius: `radius-sm` (8px)
- Focus: borde azul `#0084FF` + `shadow-sm`
- Placeholder: gris, Syne 400, 14px

### Badge / Etiqueta

- Lima o azul de fondo (uso puntual), texto en Syne Mono UPPERCASE.
- Radius: `radius-sm` (8px) o `radius-full`.
- Uso: "EXPO ACTIVA", "NUEVO", categorías.

---

## Iconografía e Ilustración

- **Estilo:** line-art monolínea en negro (`#333333`), trazo orgánico, ligeramente hecho a mano, con caritas sonrientes ocultas como guiño de marca.
- **Logo conversacional:** el wordmark `andante :)` aparece como sticker/etiqueta.
- **Collage:** para piezas hero de campaña, collage fotográfico surrealista, con marco o acento de color.
- **Flecha ↗:** ícono firma para navegación y continuidad.
- **Tamaño mínimo de toque:** 44 × 44px.

> La ilustración es el principal portador del carácter de marca. Donde antes recurríamos a peso tipográfico o color a sangre, ahora dejamos que la línea y el humor hagan ese trabajo.

---

## Transiciones y Movimiento

- **Estándar:** 250ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Rápida:** 150ms (hover, taps)
- **Lenta:** 450ms (cambio de modo de color, transiciones de sección)
- El nombre "andante" (tempo musical) invita a un movimiento **fluido, caminante, nunca brusco**. Microinteracciones con personalidad y mesura.

---

## Modo de Color: Soporte Dual

- La **lima es constante** en ambos modos: ancla de marca, siempre como acento.
- El azul se aclara en oscuro (`#3D9DFF`) para mantener contraste.
- Transición suave sin flash (`prefers-color-scheme`).
- Texto sobre lima = carbón en ambos modos.

---

## Accesibilidad

- Contraste mínimo WCAG AA: 4.5:1 en texto pequeño, 3:1 en texto grande.
  - Azul `#0084FF` con blanco: verificar en cuerpo pequeño; si falla, usar `#006FD6`.
  - Lima `#D4F334` solo se combina con carbón `#333333`, nunca con blanco.
  - Sobre imágenes de fondo (hero), el contenido vive en el contenedor flotante neutro para garantizar legibilidad —nunca texto directo sobre la imagen.
- Foco visible en azul con offset.
- Espaciado generoso para legibilidad y navegación por teclado.
- Tamaños mínimos de toque: 44 × 44px.
- No comunicar estados solo por color; reforzar con texto/ícono.

---

## Resumen de tokens (referencia rápida)

```css
:root {
  /* Núcleo */
  --color-lima: #D4F334;
  --color-azul: #0084FF;
  --color-humo: #F2F2F2;
  --color-carbon: #333333;

  /* Claro */
  --bg-base: #FFFFFF;
  --bg-surface: #F2F2F2;
  --border-subtle: #E6E6E6;
  --text-primary: #333333;
  --text-secondary: #5C5C5C;
  --accent: #0084FF;
  --accent-hover: #006FD6;
  --brand: #D4F334;
  --brand-hover: #C2E02E;

  /* Tipografía */
  --font-display: "Syne", "Inter", system-ui, sans-serif;
  --font-mono: "Syne Mono", ui-monospace, monospace;
  --weight-body: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700; /* tope, solo display/hero */

  /* Radios */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;

  /* Sombras */
  --shadow-sm: 0 2px 8px rgba(51, 51, 51, 0.06);
  --shadow-md: 0 8px 24px rgba(51, 51, 51, 0.10);
  --shadow-lg: 0 16px 48px rgba(51, 51, 51, 0.14);
}

[data-theme="dark"] {
  --bg-base: #1A1A1A;
  --bg-surface: #242424;
  --border-subtle: #333333;
  --text-primary: #F2F2F2;
  --text-secondary: #B8B8B8;
  --accent: #3D9DFF;
  --accent-hover: #0084FF;
  --brand: #D4F334;
  --brand-hover: #B8D62E;
}
```

---

*Documento vivo. El sistema visual de Andante prioriza el carácter con calma: personalidad en el color y la ilustración, serenidad en la composición, contraste reservado para lo que importa.*
