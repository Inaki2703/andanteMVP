# Accesibilidad — Andante MVP

Estado de conformidad WCAG y trabajo pendiente. La auditoría se ejecutó sobre toda la app (`src/`).

## Fase 1 — Implementada (AA + quick wins)

- **Idioma y título** (3.1.1 / 2.4.2): `index.html` con `lang="es"` y `<title>` descriptivo.
- **Skip link y landmark** (2.4.1 / 1.3.1): enlace "Saltar al contenido" → `#main`; `<main id="main">`; barra inferior móvil envuelta en `<nav aria-label="Navegación principal">` con `aria-current`.
- **Contraste de tokens** (1.4.3): se oscureció `--carbon-muted` (#8A8A8A → #707070) y se aclaró `--carbon-muted-dark` (#7A7A7A → #8C8C8C); nuevo `--azul-accessible #0067CC` para texto/iconos y botones en modo claro; en oscuro el texto sobre el azul claro pasó a `--ds-on-accent: var(--black)`. Insignias de estado "Reservado" usan `text-on-accent`.
- **Formularios** (1.3.1 / 3.3.1 / 3.3.2 / 4.1.2 / 4.1.3): label asociado en suscripción del footer + estado `aria-live`; `alert()` reemplazado; en checkout, `aria-invalid` + `aria-describedby` por campo, resumen con `role="alert"`, toggle de entrega con `aria-pressed` y `role="group"`.
- **Nombres accesibles** (4.1.2): `aria-label` en cerrar de modales, papeleras de carrito/checkout, botón de suscripción `↗`, y `aria-expanded`/`aria-haspopup` en el desplegable del Header.
- **Foco visible** (2.4.7): utilidad `.focus-ring` en `index.css`; aplicada en los controles que tenían `focus:outline-none` sin sustituto (Header, MainMenu, SuccessView, ExhibitionView, CheckoutView, CartView, footer, manifiesto). `EmptySelectionView` migró a `focus-visible`.
- **Imágenes** (1.1.1 / 3.1.2): `alt=""` en imágenes decorativas (hero, fondos) y thumbnails redundantes (Header, MainMenu, CartView, CheckoutView, cards, stack).
- **Encabezados y uso del color** (1.3.1 / 2.4.6 / 1.4.1 / 3.3.2): `<h1>` en `ExhibitionView` (sr-only) y en estados vacíos; wordmark "ANDANTE :)" pasa a elemento decorativo `aria-hidden` (corrige orden h3→h2); `<h3>` extraído de dentro del `<button>` en `ArtworkCard`; indicador de expo activa con texto "Activa"; corregido el texto engañoso "Vendido (Reservado)".
- **Movimiento** (2.2.2 / 2.3.x): `DecryptedText` y `ScrollFloatText` ya respetan `prefers-reduced-motion`; se añadió override de `scroll-behavior: auto` bajo `prefers-reduced-motion`.

## Fase 2 — Pendiente (refactors mayores y AAA)

Estas tareas requieren cambios estructurales y pruebas dedicadas; se recomiendan como siguiente iteración.

### 1. Teclado en el pager por secciones (2.1.1 / 2.4.3 / 4.1.3)
`src/utils/sectionPager.ts` y `src/App.tsx` interceptan `wheel` sin equivalente de teclado.
- Añadir listener `keydown` (flechas ↑/↓, PageUp/PageDown, Home/End) que invoque `goTo`.
- Mover el foco al encabezado de la sección destino y/o anunciar el cambio (`aria-live`).
- Alternativa: permitir scroll nativo cuando el foco esté dentro de contenido.

### 2. Cards arrastrables (2.1.1 / 2.5.7)
`src/components/ExhibitionFloatingWorks.tsx`: la tarjeta es `motion.div` con `onClick` y `drag`.
- Convertir el contenido en `<button>` enfocable con activación por teclado.
- El drag queda como mejora progresiva; ofrecer la apertura del detalle sin arrastre.

### 3. Elementos click-only → button/a (2.1.1)
Convertir a controles nativos enfocables:
- `EditorialHoverList.tsx` (`<li onClick>`)
- `CuratedStack.tsx` (`<article onClick>`)
- `ExpoActivaSection.tsx` (`<section onClick>`)
- `ArtistsNames.tsx` (`<span onClick>`)

### 4. Modales accesibles (2.1.2 / 2.4.3 / 4.1.2)
`ArtworkDetailModal`, `MainMenu` (overlay) y el manifiesto en `App.tsx`:
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
- Focus trap, cierre con `Escape`, retorno de foco al disparador.
- Idealmente un wrapper `Dialog`/`useFocusTrap` reutilizable.

### 5. AAA y barridos finos
- Contraste 7:1 en texto normal (1.4.6): revisar usos de `text-neutral-400/500` (paleta Tailwind, fuera del sistema de tokens) sobre superficies claras/oscuras.
- Foco mejorado (2.4.11/2.4.13) y objetivos táctiles ≥24–44px (2.5.8).

## Verificación recomendada
- `npm run lint` (type-check).
- axe DevTools / Lighthouse por vista (landing, exposición, checkout, success).
- Validación manual de contraste de los nuevos valores de token con un checker.
