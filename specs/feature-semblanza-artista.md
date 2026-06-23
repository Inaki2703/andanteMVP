# SPEC — Semblanza del Artista + Muro de Comunidad

> Fuente de verdad de la feature. Implementada para Andante · MVP.
> Estado: implementada (fases 1–8). Datos MOCK, en memoria, sin backend.

---

## FEATURE
Una página de artista (ruta mock `/artista/:slug` vía router de estado `setView('artist')`)
que cuenta su historia —retrato, semblanza, obra relevante en scroll horizontal,
trayectoria expositiva y enlaces a sus redes— e incluye un **Muro de comunidad** público
donde la comunidad deja mensajes y stickers visibles para todes.

## POR QUÉ
- **Coleccionista**: descubre al artista, entiende su historia y confía → más cerca de comprar.
- **Artista**: gana un canal narrativo + CV expositivo compartible.
- **Andante**: cada perfil compartible atrae a la comunidad del artista; un muro activo es
  prueba social que aumenta la confianza de compra.

## ALCANCE — qué SÍ
**A) Página de artista** (`/artista/:slug`, entrada desde las tarjetas de artista en Exhibición):
- Hero por capas: retrato a sangre + contenedor flotante claro (radius-2xl, shadow-md) con
  nombre (Display/H1), identidad (medio + ciudad), acento lima y badge "Artista verificada".
- Semblanza: bloque editorial en 1ª persona (Syne 400) con cita destacada (Syne Italic).
- Obra relevante: tira de scroll horizontal nativo (flechas siempre visibles, peeking,
  barra de progreso, teclado ←/→, swipe, prefers-reduced-motion). Precio siempre visible.
- Trayectoria/CV: lista cronológica (reciente primero); expo · espacio anfitrión + ciudad ·
  año · etiqueta Individual/Colectiva (metadatos en Syne Mono).
- Redes + Seguir: enlaces a Instagram y web (mock, _blank); botón Seguir con contador
  optimista; prueba social (mensajes, seguidores, vistas) cerca del CTA.

**B) Muro de comunidad** (misma página):
- Feed masonry estructurado (no canvas libre); orden DOM = orden visual (WCAG 1.3.2).
- Cada item: autor + timestamp relativo (Syne Mono) · texto y/o sticker · reacción ❤️.
- Composer: texto con límite 140 visible + contador en vivo; paleta CERRADA de stickers
  (10 opciones con texto alt); campo nombre obligatorio; CTA lima; publicación optimista.
- Moderación (cliente, mock): filtro de groserías con copy empático; anti-spam (campos
  vacíos / <3s desde que se empezó a escribir / rate-limit 1 cada 15 s); reportar (oculta
  local + confirmación); controles de "Vista artista" (toggle demo): fijar, ocultar, eliminar.
- Sembrado obligatorio: 5–7 mensajes (bienvenida de la artista [fijada], nota del espacio
  anfitrión, varios visitantes/coleccionistas). Nunca nace vacío.

## FUERA DE ALCANCE
Ficha de obra individual, checkout/carrito/pago, login/cuenta real, panel del artista,
agenda de expos, persistencia real (backend/DB/localStorage). "Vista artista" es solo un
toggle de demo, sin auth/roles. No se modifican paleta, tipografía ni tokens del DS.

## RESTRICCIONES
- Respeto estricto del design system: lima = acento (nunca fondo dominante, texto carbón
  encima), azul = CTA/links/foco, neutros de base; Syne (400–600; 700 solo display/hero),
  Syne Mono para metadatos/timestamps/contadores/labels; radios, sombras y spacing 8px;
  modo claro/oscuro con las variables del sistema.
- Reutiliza componentes; `ArtworkCard` se extrajo como primitivo reutilizable.
- Tono de voz Andante en todo el microcopy; glosario (obra, semblanza, expo, espacio
  anfitrión, coleccionista, curaduría).
- Scroll horizontal sin anti-patrones (flechas siempre visibles, sin scrolljacking, teclado).
- Accesibilidad: DOM = orden visual; alt en stickers; ornamentos aria-hidden; contraste AA;
  foco visible; toques 44×44; prefers-reduced-motion.

## LISTO CUANDO (criterios verificables) — 1 a 10
1. Página de artista en orden: hero → semblanza → obra (scroll H) → trayectoria → redes.
2. Tira de obra navegable con flechas/teclado/swipe; items que asoman; sin secuestrar el
   scroll vertical.
3. Cada obra muestra precio; hover → sombra + título azul.
4. Muro nace sembrado (artista fijado + espacio anfitrión); nunca vacío.
5. Publicar mensaje (≤140, contador, sticker, nombre) → aparece arriba con "hace un momento".
6. Palabra vetada → bloqueo empático; sin nombre / muy rápido → anti-spam.
7. ❤️ sube el contador.
8. "Vista artista" → fijar/ocultar/eliminar.
9. "Seguir" → "Siguiendo ✓" + seguidores +1.
10. Respeta el design system y el tono Andante; funciona en desktop y mobile.

---

## Mapa de implementación (archivos)
- Datos/tipos: `src/data.ts`, `src/types.ts` (Artist extendido, ExhibitionCredit, WallMessage,
  Sticker, STICKER_PALETTE, BANNED_WORDS, WALL_SEED).
- Navegación: `src/App.tsx` (vista `'artist'` + `selectedArtistSlug`), entrada desde
  `src/components/ExhibitionView.tsx` (tarjetas de artista clicables).
- Página: `src/components/ArtistView.tsx`.
- Obra: `src/components/ArtworkScroller.tsx` + `src/components/ArtworkCard.tsx` (reutilizable).
- Muro: `src/components/CommunityWall.tsx`, `WallComposer.tsx`, `WallMessageCard.tsx`.
- Utilidades: `src/utils/relativeTime.ts`, `src/utils/moderation.ts`.
