# SPEC — Semblanza del Artista + Muro de comunidad

> Fuente de verdad para construir la feature con un agente. Rellenada para Andante · MVP.
> Basada en la plantilla S5 "Construir una feature con un agente". Datos **MOCK realistas**, sin backend.

---

## 1️⃣ La spec — la fuente de verdad

```
# SPEC — SEMBLANZA DEL ARTISTA + MURO DE COMUNIDAD

FEATURE: Una página de artista que cuenta su historia (retrato, semblanza, obra
relevante con scroll horizontal, trayectoria expositiva y enlaces a sus redes) y
que incluye un "Muro" público donde la comunidad deja mensajes y stickers visibles
para todes.

POR QUÉ (el valor):
- Comprador: descubre al artista, entiende su historia y confía → más cerca de comprar.
- Artista: gana un canal narrativo + CV expositivo que puede compartir en sus redes.
- Andante: cada perfil compartible atrae la comunidad del artista a la plataforma, y
  un muro activo funciona como prueba social que aumenta la confianza de compra.

ALCANCE — qué SÍ hago hoy:

  A) PÁGINA DE ARTISTA (vista pública, ruta /artista/:slug)
  - Hero del artista (patrón Hero del design system: composición por capas):
    · Imagen de fondo a sangre (foto del artista en su taller / obra de fondo).
    · Contenedor flotante claro superpuesto (radius-2xl, shadow-md, padding 48–64px)
      con: nombre del artista (Display/H1), una línea de identidad (medio + ciudad,
      Body Large), y un acento de marca (subrayado lima o flecha ↗).
    · El contenedor no ocupa todo el ancho: deja ver la imagen por los márgenes.
  - Semblanza (la historia): bloque editorial de texto narrativo en primera persona.
    Título "Su semblanza" (H2). Cuerpo en Syne 400, ancho de lectura cómodo. Puede
    incluir una cita destacada en Syne Italic 500.
  - Obra relevante (scroll horizontal SECUNDARIO, bien implementado):
    · Tira horizontal de Tarjetas de Obra (3–6 obras mock).
    · Cada tarjeta: imagen → título de obra (Syne 600, H5) → artista + precio
      (Syne Mono, body small). Hover: shadow-md + título a azul.
    · Cada tarjeta enlaza (visualmente, con cursor pointer; navegación mock) a una
      ficha de obra. El precio SIEMPRE visible.
    · IMPLEMENTACIÓN OBLIGATORIA del scroll (ver RESTRICCIONES de scroll abajo).
  - Trayectoria / CV expositivo: lista cronológica (más reciente primero). Cada
    entrada: nombre de la expo · espacio anfitrión + ciudad · año · etiqueta
    "Individual/Colectiva". Estilo limpio, screenshot-friendly (es el artefacto que
    el artista comparte). Usar Syne Mono para metadatos (año, ciudad).
  - Enlaces a redes + Seguir:
    · Botones/íconos a Instagram y sitio web (enlaces mock, target _blank).
    · Botón "Seguir a la artista" (primario azul). Al hacer clic: estado optimista
      → cambia a "Siguiendo ✓" y suma +1 al contador visible de seguidores (mock,
      en estado local). Sin backend.
  - Señal de confianza: badge "Artista verificada" (Syne Mono UPPERCASE, badge lima
    o azul puntual) junto al nombre.

  B) MURO DE COMUNIDAD (dentro de la misma página, sección "El muro de [Nombre]")
  - Feed ESTRUCTURADO tipo masonry/grid (NO canvas libre de arrastrar).
  - Cada item del muro muestra: nombre de quien lo dejó + timestamp relativo
    ("hace 2 h") en Syne Mono · contenido (texto corto y/o sticker/emoji) ·
    una reacción (corazón/❤️) con contador.
  - Composer para dejar un mensaje:
    · Campo de texto con límite de caracteres VISIBLE (máx. 140), contador en vivo.
    · Selector de sticker/emoji de una PALETA CERRADA (8–12 opciones definidas, p. ej.
      🎨 ✨ ❤️ 👏 🙌 🌿 🔥 👀 — sin subida de imágenes arbitrarias).
    · Campo "Tu nombre" (obligatorio para atribución).
    · Botón "Dejar mi mensaje" (acento lima, uso puntual = momento de impacto).
    · Publicación OPTIMISTA: el mensaje aparece arriba del feed al instante.
  - Moderación básica (cliente, mock):
    · Filtro de groserías: lista mock de ~10 palabras vetadas; si el texto las
      contiene, se bloquea el envío con un mensaje empático (tono Andante) y no se
      publica.
    · Anti-spam: deshabilitar el botón si el nombre o el contenido están vacíos;
      bloquear envíos en menos de 3 segundos desde que se empezó a escribir
      (check de tiempo); límite de 1 envío cada 15 s (rate limit en estado local).
    · Reportar: cada item tiene una acción "⋯ → Reportar" que lo oculta localmente
      (mock) y muestra confirmación.
    · Controles de la artista (modo dueña, simulado con un toggle "Vista artista"):
      fijar (pin) un mensaje arriba, y ocultar/eliminar cualquier mensaje.
  - SEMBRADO obligatorio (el muro NUNCA nace vacío): precargar 5–7 mensajes mock
    realistas, incluyendo (1) un sticker de bienvenida de la propia artista [fijado],
    (2) una nota del espacio anfitrión (café), (3) 3–5 mensajes de compradores/
    visitantes con nombres, stickers y timestamps variados.
  - Prueba social: mostrar contadores verificables cerca (no encima) del CTA de la
    obra/seguir: nº de mensajes en el muro, nº de seguidores, nº de vistas (mock).

  Datos: MOCK, realistas (1 artista completo + su obra + su muro sembrado).
  Sin backend ni base de datos real. Todo en estado local / archivo de mocks.

FUERA DE ALCANCE — qué NO debes tocar:
- La ficha de obra individual (página de detalle/checkout): la obra solo enlaza
  visualmente, pero NO construyas la página de producto ni el flujo de compra.
- El e-commerce, el carrito, el pago, el login/registro real, la cuenta de usuario.
- El panel del artista (gestión de obra, ventas, pagos).
- El feed de eventos culturales y la agenda de expos (es otra feature).
- La "Vista artista" es solo un toggle de demo para enseñar los controles de
  moderación; NO construyas autenticación ni roles reales.
- La paleta, la tipografía y los componentes del design system (se respetan, no se
  modifican).
- Persistencia real del muro entre sesiones (es mock en memoria; no implementes
  backend, base de datos ni almacenamiento del navegador).

RESTRICCIONES:
- Respeta ESTRICTAMENTE el design system (abajo). No inventes colores ni tipografías.
  · Lima = acento, NUNCA fondo dominante. Texto sobre lima siempre carbón #333333.
  · Azul = CTA primario / links / foco.
  · La mayor parte de la interfaz vive sobre neutros (#FFFFFF, #F2F2F2).
  · Tipografía Syne; pesos 400–600, Bold 700 solo en display/hero. Syne Mono para
    metadatos, timestamps, contadores y labels.
  · Radios, sombras suaves, spacing base 8px según tokens.
  · Soporte de modo claro/oscuro con las variables del sistema.
- Reutiliza los componentes existentes (Tarjeta de Obra, Botones, Badge, Input,
  Hero); no dupliques. Si no existen aún, créalos siguiendo el design system.
- Tono de voz Andante en TODO el microcopy (ver guía de contenido): humano, cálido,
  honesto, sin urgencia falsa. Usar términos del glosario: "obra", "semblanza",
  "expo", "espacio anfitrión", "coleccionista", "curaduría". El comprador es
  "coleccionista"; el café es "espacio anfitrión".
- Scroll horizontal de obra — IMPLEMENTACIÓN OBLIGATORIA (anti-patrones prohibidos):
  · Scroll nativo (no scrolljacking, no secuestrar el scroll vertical de la página).
  · Flechas de avanzar/retroceder SIEMPRE visibles (no solo en hover).
  · Items que "asoman" (peeking) en el borde para señalar que hay más contenido.
  · Indicador de progreso o scrollbar visible.
  · Navegable por teclado (flechas ←/→, foco visible azul) y accesible
    (región con role y nombre accesible).
  · En mobile: swipe nativo con los mismos items que asoman.
- Accesibilidad:
  · Orden del DOM = orden visual (clave en el muro masonry, para lectores de
    pantalla). WCAG 1.3.2.
  · Cada sticker/emoji con texto alternativo; ornamentos decorativos aria-hidden.
  · Contraste AA; foco visible; toques mínimos 44×44px.
  · Respetar prefers-reduced-motion en animaciones del muro y del scroll.
- No rompas nada que ya funcionara en el proyecto (flujos previos, navegación, DS).

LISTO CUANDO (criterio de éxito verificable):
1. Puedo entrar a la página de una artista y ver, en este orden: hero con su retrato,
   su semblanza, su obra relevante en scroll horizontal, su trayectoria expositiva y
   sus enlaces a redes — todo con datos mock realistas.
2. Puedo arrastrar/scrollear la tira de obra horizontalmente con las flechas, con el
   teclado y con swipe en mobile, y SIEMPRE veo que hay más contenido (items que
   asoman + flechas visibles). La página NO secuestra mi scroll vertical.
3. Cada obra muestra su precio y al pasar el cursor reacciona (sombra + título azul).
4. El muro aparece YA con mensajes sembrados (incluido uno de la artista fijado y uno
   del espacio anfitrión). Nunca lo veo vacío.
5. Puedo escribir un mensaje (≤140 car., con contador visible), elegir un sticker de
   la paleta, poner mi nombre y publicarlo: aparece arriba del feed al instante con mi
   nombre y "hace un momento".
6. Si escribo una palabra vetada (mock), el envío se bloquea con un mensaje empático y
   no se publica. Si intento enviar sin nombre o muy rápido, el botón no me deja.
7. Puedo darle ❤️ a un mensaje y el contador sube.
8. Activando "Vista artista" puedo fijar, ocultar y eliminar mensajes del muro.
9. Al tocar "Seguir", el botón cambia a "Siguiendo ✓" y el contador de seguidores
   sube en 1.
10. Todo respeta el design system (colores, Syne, radios, sombras, modo claro/oscuro)
    y el tono de voz de Andante. Funciona en desktop y mobile.

DESIGN SYSTEM:
[👉 PEGA AQUÍ TU design-system.md COMPLETO antes de dárselo al agente]
```

---

## 2️⃣ Pedir el PLAN (nunca ejecutar a ciegas)

```
Aquí está la spec de la feature que quiero (pegada abajo). Primero: lee mi proyecto
entero y la spec. Luego proponme un PLAN por fases para construirla.
NO edites ningún archivo todavía. Solo quiero ver el plan: qué archivos tocarías, en
qué orden, y por qué.
[pega tu spec + el design system]
```

**Fases sugeridas para guiar al agente** (ajústalas tú al revisar):
1. **Mocks y datos** — archivo de datos mock: 1 artista completo (retrato, semblanza,
   redes, trayectoria), su obra (3–6 piezas con precio), y el muro sembrado (5–7
   mensajes). Sin tocar UI todavía.
2. **Estructura de la página** — ruta `/artista/:slug` y layout base (hero +
   secciones), reutilizando el patrón Hero y los tokens del DS.
3. **Semblanza + trayectoria** — bloques editoriales de texto y CV expositivo.
4. **Obra relevante** — tira de scroll horizontal con flechas, peeking, teclado y
   swipe (cumpliendo los anti-patrones prohibidos).
5. **Redes + Seguir** — enlaces externos y botón Seguir con contador optimista.
6. **Muro de comunidad** — feed masonry, composer (límite + paleta de stickers +
   nombre), publicación optimista, reacciones.
7. **Moderación + sembrado** — filtro de groserías, anti-spam (vacío/tiempo/rate),
   reportar, controles de "Vista artista" (pin/ocultar/eliminar), y precarga del muro.
8. **Accesibilidad y modo oscuro** — foco, teclado, DOM=visual, contraste,
   prefers-reduced-motion, paso final de pulido.

---

## 3️⃣ Revisar el plan — tu D3 (Discernimiento)

```
Revisa tu propio plan con honestidad antes de que yo lo apruebe:
- Producto: ¿el plan cumple TODOS los puntos del "listo cuando" (1 al 10)? ¿hace
  exactamente lo que pedí?
- Proceso: ¿toca SOLO lo del alcance? ¿está metiendo mano en la ficha de obra, el
  checkout, el login o el panel de artista, que marqué como FUERA de alcance?
- Desempeño: ¿propone inventar colores, tipografías, pantallas o datos que no pedí?
  ¿reusa la Tarjeta de Obra, Botones, Badge e Input existentes? ¿el scroll horizontal
  respeta los anti-patrones (flechas siempre visibles, sin scrolljacking, teclado)?
Dime qué ajustarías y espera mi aprobación.
```

---

## 4️⃣ Ejecutar por fases (en pasos pequeños)

```
El plan está bien, pero [quita la fase X / ajusta Y, porque está fuera de alcance].
Ejecuta SOLO la fase 1 (mocks y datos) y muéstrame el resultado antes de seguir.
```

> Sugerencia: aprueba fase por fase. Pon especial atención al pasar de la fase 4
> (scroll de obra) y la fase 7 (moderación), que son las de mayor riesgo de que el
> agente improvise o caiga en anti-patrones.

---

## 5️⃣ Verificar — tu D4 (Diligencia)

```
Antes de cerrar:
1) Confírmame que la feature nueva cumple los 10 puntos del "listo cuando" de la spec.
2) Confírmame que el flujo anterior del proyecto sigue funcionando igual (navegación,
   otras pantallas, design system intacto).
Si algo del flujo anterior se rompió, dímelo y arréglalo sin tocar la feature nueva ni
la paleta.
```

**Pruébalo tú mismo, de punta a punta:**
- [ ] Recorro la página completa de la artista en desktop y en mobile.
- [ ] El scroll de obra: flechas visibles, items que asoman, teclado, swipe; NO me
      secuestra el scroll vertical.
- [ ] Dejo un mensaje con sticker y aparece al instante con mi nombre.
- [ ] Pruebo una palabra vetada → se bloquea con copy empático.
- [ ] Pruebo enviar sin nombre / muy rápido / dos veces seguidas → el anti-spam actúa.
- [ ] Doy ❤️ y sube el contador.
- [ ] "Vista artista" → fijo, oculto y elimino un mensaje.
- [ ] "Seguir" → cambia a "Siguiendo ✓" y +1 seguidor.
- [ ] Cambio a modo oscuro y todo se ve correcto.
- [ ] El muro nunca se ve vacío.

Luego **guarda** el proyecto con esta spec dentro (ej: `/specs/feature-semblanza-artista.md`).

---

## ⚠️ Recordatorios de criterio (de tu Ficha 4D)
- **D1 — qué NO delegas:** *cuál* es la feature, qué entra en alcance y qué cuenta como
  "listo" ya está decidido por ti en esta spec. El muro y la semblanza son el corazón;
  la ficha de obra y el checkout quedan fuera a propósito.
- **D2 — describir:** esta spec ES tu D2 hecha documento. Cuanto más clara, menos
  improvisa el agente. Aquí los puntos de riesgo (scroll y moderación) están descritos
  con detalle a propósito.
- **D3 — discernir:** revisar el plan ANTES de ejecutar es donde se juega tu criterio.
  No apruebes a ciegas, sobre todo el scroll horizontal y la moderación.
- **D4 — diligencia:** verifica a mano; el responsable del resultado eres tú. Datos
  MOCK, nunca datos reales de usuarios.
- **Alcance:** ¿te tienta pedir "una feature más" (ficha de obra, notificaciones
  reales, mensaje directo privado)? Anótala al backlog. Hoy: **una feature, una spec.**

---

## 📎 Notas de research que respaldan decisiones clave (para tu contexto, no para el agente)
- **Muro estructurado (masonry), no canvas libre:** escala mejor con muchos mensajes y
  es mucho más accesible (orden DOM = orden visual, WCAG 1.3.2).
- **Sembrado obligatorio:** un muro vacío parece roto y la gente se va. Por eso se
  precarga con la voz de la artista y del espacio anfitrión.
- **Anti-spam sin CAPTCHA:** honeypot + check de tiempo + rate limit; el CAPTCHA puede
  tirar la conversión hasta ~40% (Stanford / casos CRO).
- **Scroll horizontal secundario y bien señalizado:** NN/G demuestra que en desktop la
  gente NO descubre el contenido lateral, y peor si las flechas solo salen en hover.
  Por eso: flechas siempre visibles + peeking + scrollbar + teclado.
- **Precio visible siempre:** los costos ocultos/sorpresa son la causa #1 de abandono
  de carrito (Baymard ~39%).
- **CV expositivo compartible:** es el artefacto que el artista empuja a sus redes →
  trae a su comunidad a Andante (efecto de adquisición buscado).
- **Prueba social verificable** (mensajes, seguidores, vistas) > testimonios anónimos
  para generar confianza (NN/G).

*Las cifras de conversión citadas son direccionales (mezcla de NN/G/Baymard sólidos y
blogs de CRO); úsalas para justificar el rumbo, no como metas.*
