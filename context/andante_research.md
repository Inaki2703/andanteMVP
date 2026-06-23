# Andante — Documento de Investigación UX y Comportamiento del Consumidor

> Galería itinerante digital que conecta artistas, compradores de arte y dueños de negocios mediante un modelo de comisión, con e-commerce de obra, semblanzas de artistas, feed de eventos culturales y venta de marcos/impresión.

**Versión:** 1.0 · MVP
**Autor:** Investigación UX — e-commerce de arte y entretenimiento
**Estado:** Base para desarrollo de plataforma

---

## 0. Resumen ejecutivo

Andante opera un modelo híbrido físico-digital poco explorado: cura exposiciones temporales en espacios comerciales (cafés, restaurantes, coworkings) sin cobrar al local, monetiza vía comisión por obra vendida y usa el espacio físico como canal de adquisición y prueba social para su plataforma digital. Esta investigación define los objetivos, el alcance, los criterios de éxito, los tres arquetipos de usuario (artistas, compradores, dueños de negocios), sus dolores y *jobs-to-be-done*, un análisis de seis competidores directos e indirectos, y las oportunidades de diferenciación que deben guiar el diseño del producto.

La tesis central: la fricción del mercado del arte emergente no está en la falta de plataformas de venta, sino en la **falta de confianza, contexto y descubrimiento físico**. Andante puede ganar al ser el puente entre el encuentro físico (donde se genera el deseo y la confianza) y la transacción digital (donde se cierra y se escala).

---

## 1. Objetivos de investigación

### 1.1 Objetivo general
Comprender los comportamientos, motivaciones y fricciones de los tres actores del ecosistema de Andante para informar las decisiones de producto, arquitectura de información y priorización del MVP.

### 1.2 Objetivos específicos

| # | Objetivo | Pregunta de investigación |
|---|----------|---------------------------|
| O1 | **Distribución de artistas** | ¿Cómo distribuyen, exhiben y venden su trabajo los artistas emergentes y de media carrera hoy? ¿Qué canales usan y por qué los abandonan? |
| O2 | **Descubrimiento y compra** | ¿Cómo descubren los compradores arte que les interesa y qué los lleva del interés a la compra? ¿Qué genera o rompe su confianza? |
| O3 | **Demanda de espacios comerciales** | ¿Cómo deciden los dueños de negocios qué exhibir en su espacio y qué los motiva a hostear exposiciones? |
| O4 | **Validación del modelo de comisión** | ¿Qué nivel de comisión perciben artistas como justo? ¿Qué esperan a cambio? |
| O5 | **Rol del componente físico** | ¿Qué peso tiene la experiencia física en la decisión de compra de arte y en la confianza hacia la plataforma? |
| O6 | **Servicios complementarios** | ¿Qué tan deseables son los servicios de marcos e impresión bajo demanda como parte del flujo de compra? |

---

## 2. Alcance

### 2.1 Mercados
- **Primario:** Mercados hispanohablantes con infraestructura digital y escena cultural activa (México, Colombia, Argentina, Chile, España, y comunidades latinas en EE.UU.).
- **Secundario:** Mercados globales con acceso digital donde el modelo físico-digital sea replicable en ciudades con densidad cultural.

### 2.2 Perfil demográfico
- **Ingresos:** Medios a altos (capacidad de compra discrecional para arte original entre ~USD 50 y ~USD 2,000 en piezas emergentes).
- **Rango etario:** 25–55 años.
  - 25–34: descubridores digitales, primeros compradores, alta afinidad con Instagram.
  - 35–44: compradores con poder adquisitivo creciente, decoración de hogar/oficina.
  - 45–55: coleccionistas incipientes y dueños de negocios.

### 2.3 Dentro de alcance
Comportamiento de compra de arte original y reproducciones de edición; descubrimiento vía redes y espacios físicos; relación artista-plataforma; decisión de hosteo de exposiciones; servicios de enmarcado e impresión.

### 2.4 Fuera de alcance (para esta fase)
Mercado de arte de alta gama / blue-chip y subastas; NFTs y arte puramente cripto; logística internacional compleja de obra de gran formato; segmento institucional (museos, ferias mayores).

---

## 3. Criterios de éxito de la investigación

La investigación se considera exitosa si logra:

1. **≥ 5 dolores principales** identificados y priorizados por arquetipo. ✔ (Sección 5)
2. **≥ 8 jobs-to-be-done** articulados en sus dimensiones funcional, emocional y social. ✔ (Sección 6)
3. **6 competidores** mapeados (directos e indirectos) con análisis comparativo. ✔ (Sección 7)
4. Definición de **oportunidades de diferenciación** accionables. ✔ (Sección 8)
5. **Hipótesis de producto** y recomendaciones priorizadas para el MVP. ✔ (Secciones 9–10)

---

## 4. Arquetipos de usuario

### 4.1 Artista — "Mariana, la artista emergente"

**Perfil:** 28–40 años, pintora/fotógrafa/ilustradora con 3–8 años de práctica. Vende ocasionalmente por Instagram y ferias. Tiene obra acumulada sin salida y poca infraestructura de venta.

**Motivaciones**
- Visibilidad y construcción de reputación/CV expositivo.
- Vender sin sacrificar la dignidad de su práctica ("no quiero malbaratar").
- Pertenecer a una comunidad y a una curaduría que le dé contexto.
- Liberar inventario físico y generar ingreso recurrente.

**Canales de distribución actuales**
- Instagram (principal, pero algoritmo volátil y baja conversión a venta).
- Ferias y mercados de arte (alta fricción logística, costo de stand).
- Galerías tradicionales (acceso difícil, comisiones del 40–50%).
- Marketplaces (Saatchi Art, Etsy): saturación, baja visibilidad, esfuerzo de fotografía/listado.
- Venta directa boca a boca / WhatsApp.

**Barreras para vender**
- Falta de espacio físico de exhibición y de público que vea la obra "en persona".
- Inexperiencia en pricing, fotografía de producto y logística de envío.
- Desconfianza hacia plataformas que se sienten extractivas o impersonales.
- Tiempo: la gestión de venta compite con el tiempo de creación.

**Expectativas de comisión**
- Tolerancia típica: comisión percibida como justa cuando está por **debajo del rango de galería (40–50%)**, idealmente **20–35%**, *si* la plataforma aporta curaduría, montaje, difusión y un canal físico real.
- Esperan transparencia total en el cobro y rapidez de pago tras la venta.

---

### 4.2 Comprador de arte — "Daniel, el comprador-decorador"

**Perfil:** 30–50 años, ingreso medio-alto, profesional. Compra arte para su hogar/oficina y, ocasionalmente, como regalo o inicio de colección. No se considera "coleccionista" formal, pero le importa el gusto y la historia detrás de la pieza.

**Criterios de selección**
- Conexión estética y emocional con la obra ("me habla", encaja con mi espacio).
- Historia del artista y autenticidad (semblanza, proceso, narrativa).
- Tamaño/formato adecuado al espacio y presupuesto.
- Prueba social: ¿otros lo compran? ¿es legítimo el artista?

**Presupuesto**
- Rango habitual por pieza emergente: **USD 50–800**, con disposición ocasional hasta ~USD 2,000 para una pieza "ancla".
- Sensibilidad alta al costo de envío y a costos ocultos (enmarcado, importación).

**Preferencias de descubrimiento**
- Instagram y experiencias físicas (eventos, cafés, ferias) son los principales disparadores de deseo.
- Prefiere descubrimiento curado y narrativo por encima de catálogos infinitos.
- Valora poder ver la obra en persona o en contexto realista (en una pared, en un espacio).

**Confianza en plataformas**
- Necesita certeza de autenticidad y procedencia.
- Política clara de envío, devoluciones y garantía de condición de la obra.
- Pasarela de pago segura y reconocida; reseñas/testimonios.
- La experiencia física previa (haber visto la expo) **aumenta drásticamente** la confianza para comprar online después.

---

### 4.3 Dueño de negocio — "Sofía, la dueña del café"

**Perfil:** 32–55 años, propietaria de café/restaurante/coworking/hotel boutique. Busca diferenciar su espacio y atraer flujo de clientes sin asumir costo ni riesgo operativo.

**Necesidades de decoración / experiencia**
- Renovar el ambiente periódicamente para que el espacio "se sienta vivo".
- Asociar su marca con cultura y comunidad local (posicionamiento, no solo decoración).
- Generar motivos de visita (inauguraciones, activaciones) que aumenten tráfico y ticket.

**Volumen y dinámica de "compra"**
- No compra obra: **hostea** exposiciones rotativas (modelo de cero costo).
- "Volumen" se mide en número de obras montadas por ciclo y frecuencia de rotación (p. ej. mensual/bimestral).

**Decisión de hosteo**
- Riesgo operativo y reputacional bajo: que el montaje no dañe el espacio ni interfiera con la operación.
- Confianza en la curaduría: que la obra sea coherente con su público y estética.
- Beneficio claro y medible: más visitas, más consumo, contenido para sus redes.
- Cero fricción: que Andante se encargue de montaje, difusión y desmontaje.

**Importancia de la curaduría**
- **Crítica.** La curaduría es el principal mitigador de riesgo: garantiza que la obra "encaje" con el espacio y la clientela, y que las activaciones aporten valor sin caos operativo.

---

## 5. Dolores específicos por arquetipo

### 5.1 Artistas
1. **Sin escaparate físico:** la obra no se ve "en persona", donde más se vende y se valida.
2. **Comisiones de galería prohibitivas** (40–50%) y acceso elitista a galerías.
3. **Algoritmo de Instagram volátil:** alcance impredecible y conversión a venta muy baja.
4. **Carga operativa de venta:** pricing, fotografía, envío, atención — todo recae en el artista.
5. **Falta de curaduría y contexto:** en marketplaces masivos su obra se diluye entre miles.

### 5.2 Compradores
1. **Desconfianza en autenticidad y procedencia** al comprar online a artistas desconocidos.
2. **Parálisis por exceso de catálogo** sin curaduría ni narrativa.
3. **Incertidumbre física:** no saber cómo se verá la pieza real (color, textura, tamaño) en su espacio.
4. **Costos ocultos:** envío, enmarcado y posible daño en tránsito.
5. **Falta de conexión humana:** las plataformas grandes se sienten frías e impersonales.

### 5.3 Dueños de negocios
1. **Riesgo operativo y de marca** al ceder pared a contenido que no controlan.
2. **Falta de tiempo y expertise** para curar o gestionar arte por su cuenta.
3. **Dificultad para medir el retorno** de una exposición en tráfico/ventas.
4. **Estancamiento del ambiente:** espacios que se sienten estáticos pierden recurrencia.
5. **Miedo al costo:** asumen que tener arte/eventos implica inversión o complicación.

---

## 6. Jobs-to-be-done (JTBD)

Formato: *Cuando [situación], quiero [motivación], para [resultado esperado].* Cada JTBD incluye sus dimensiones funcional (F), emocional (E) y social (S).

| # | Arquetipo | Job-to-be-done | F / E / S |
|---|-----------|----------------|-----------|
| JTBD-1 | Artista | Cuando tengo obra acumulada, quiero un canal que la exhiba físicamente y la venda, para liberar inventario y generar ingreso sin malbaratar. | **F:** vender · **E:** validación de mi práctica · **S:** ser reconocido como artista serio |
| JTBD-2 | Artista | Cuando expongo, quiero construir mi CV y reputación, para acceder a mejores oportunidades. | **F:** registrar trayectoria · **E:** orgullo · **S:** estatus en la comunidad artística |
| JTBD-3 | Artista | Cuando vendo, quiero que la plataforma maneje logística y pago, para concentrarme en crear. | **F:** delegar operación · **E:** alivio · **S:** profesionalismo percibido |
| JTBD-4 | Comprador | Cuando una obra me conmueve, quiero comprarla con confianza y sin fricción, para disfrutarla en mi espacio. | **F:** adquirir · **E:** deleite y certeza · **S:** mostrar buen gusto |
| JTBD-5 | Comprador | Cuando busco arte, quiero descubrir piezas curadas con su historia, para encontrar algo significativo sin abrumarme. | **F:** descubrir · **E:** conexión · **S:** apoyar a artistas/cultura local |
| JTBD-6 | Comprador | Cuando dudo de cómo se verá una pieza, quiero verla en contexto real (espacio físico o visualización), para decidir con seguridad. | **F:** evaluar ajuste · **E:** reducir ansiedad · **S:** decisión acertada ante otros |
| JTBD-7 | Dueño de negocio | Cuando quiero más flujo y diferenciación, quiero hostear exposiciones llave en mano sin costo ni riesgo, para atraer clientes y asociar mi marca a cultura. | **F:** atraer tráfico · **E:** tranquilidad · **S:** prestigio de marca local |
| JTBD-8 | Dueño de negocio | Cuando hosteo una expo, quiero contenido y activaciones recurrentes, para sostener la recurrencia y nutrir mis redes. | **F:** generar eventos/contenido · **E:** entusiasmo · **S:** ser referente cultural del barrio |
| JTBD-9 | Comprador | Cuando compro una obra digital o foto, quiero opciones de impresión y enmarcado, para recibirla lista para colgar. | **F:** completar la compra · **E:** conveniencia · **S:** resultado pulido |

> Se documentan 9 JTBD (supera el mínimo de 8), cubriendo las tres dimensiones para cada arquetipo.

---

## 7. Análisis competitivo

### 7.1 Mapa de competidores

| Plataforma | Tipo | Modelo | Fortalezas | Debilidades | Relevancia para Andante |
|------------|------|--------|-----------|-------------|-------------------------|
| **Artsy** | Directo | Marketplace + datos de mercado; galerías y subastas | Autoridad, data de precios, alcance global | Enfoque mid/high-end; poco para emergentes locales; sin componente físico propio | Referente de confianza y procedencia |
| **Saatchi Art** | Directo | Marketplace de artistas (comisión ~35–40% al artista) | Gran catálogo de emergentes, envío global, "View in a Room" | Saturación, baja visibilidad por artista, experiencia impersonal | Benchmark de UX de e-commerce de arte |
| **Etsy** | Indirecto | Marketplace artesanal/handmade (comisiones + fees) | Tráfico masivo, facilidad de listado | No especializado en arte; ruido; baja curaduría; percepción "craft" | Lección de saturación sin curaduría |
| **Instagram Shop / Instagram** | Indirecto | Red social + comercio social | Descubrimiento visual, comunidad, gratis | Algoritmo volátil, baja conversión, sin confianza transaccional ni curaduría | Canal de adquisición y prueba social clave |
| **Galerías tradicionales** | Indirecto | Representación física, comisión 40–50% | Prestigio, curaduría experta, contexto físico, confianza | Elitista, alto costo, poco escalable y poco digital | Inspiración en curaduría + experiencia física |
| **Ferias / mercados de arte locales** | Indirecto | Stands temporales, costo de participación | Contacto físico directo, descubrimiento, comunidad | Costoso/efímero, logística pesada, sin continuidad digital | Validación del valor del encuentro físico |

### 7.2 Lectura estratégica
- Los **directos** (Artsy, Saatchi) dominan lo digital pero **carecen de presencia física** y de curaduría hiperlocal.
- Los **indirectos físicos** (galerías, ferias) tienen el encuentro presencial pero son **caros, poco escalables y débiles en lo digital**.
- **Instagram** genera deseo pero no resuelve confianza ni transacción.
- **Nadie integra de forma nativa el ciclo completo:** descubrimiento físico curado → confianza → transacción digital → servicios complementarios → recurrencia.

---

## 8. Oportunidades de diferenciación

1. **Modelo físico-digital nativo (galería itinerante).** Convertir cafés y espacios comerciales en escaparates rotativos curados. El encuentro físico genera deseo y confianza; la web cierra y escala la venta. Ningún competidor digital tiene este canal de adquisición físico.
2. **Curaduría como producto, no como adorno.** La curaduría reduce la parálisis del comprador, mitiga el riesgo del dueño de negocio y dignifica al artista. Es el activo diferencial frente a la saturación de Etsy/Saatchi.
3. **Cero costo para el espacio = red de adquisición escalable.** El modelo ganar-ganar permite expandir la red de escaparates físicos sin CAC tradicional, usando cada local como punto de descubrimiento y contenido.
4. **Confianza heredada del contexto físico.** "Lo vi en el café" baja la barrera de compra online posterior. Diseñar el puente físico→digital (QR en obra, ficha online, continuidad post-expo).
5. **Comisión justa y transparente vs. galería.** Posicionarse explícitamente por debajo del 40–50% de galería, con servicios incluidos (montaje, difusión, logística), como propuesta de valor para atraer y retener artistas.
6. **Servicios complementarios integrados (marcos e impresión).** Capturar margen adicional y elevar el ticket, resolviendo el JTBD del comprador de "recibirla lista para colgar", especialmente en arte digital y fotografía.
7. **Comunidad y feed cultural.** El feed de eventos y las semblanzas de artistas convierten a Andante en un destino cultural (no solo una tienda), aumentando recurrencia y retención.

---

## 9. Hipótesis de producto (a validar)

- **H1:** Los compradores que vieron una obra físicamente en una expo Andante convierten a compra online a una tasa significativamente mayor que el tráfico frío.
- **H2:** Los artistas aceptarán una comisión del 20–35% si Andante provee curaduría, montaje, difusión y canal físico.
- **H3:** Los dueños de negocio hostearán recurrentemente si el proceso es 100% llave en mano y perciben aumento de tráfico/contenido.
- **H4:** El servicio de marcos/impresión incrementa el ticket promedio y la satisfacción en obra digital y fotografía.
- **H5:** Una experiencia de descubrimiento curada y narrativa supera a un catálogo masivo en conversión y NPS.

---

## 10. Recomendaciones priorizadas para el MVP

| Prioridad | Recomendación | Justificación (JTBD / dolor) |
|-----------|---------------|------------------------------|
| **P0** | E-commerce con ficha de obra rica: fotos, dimensiones, precio total transparente (incl. envío), semblanza del artista y procedencia. | JTBD-4/5; dolores de confianza y costos ocultos |
| **P0** | Puente físico→digital: QR en obra expuesta que lleve a la ficha online y continuidad post-expo. | Diferenciador #4; H1 |
| **P0** | Páginas de artista (semblanzas) como prueba social y narrativa. | JTBD-2/5; dolor de impersonalidad |
| **P1** | Visualización "ver en mi espacio" (mockup en pared) para reducir incertidumbre física. | JTBD-6; dolor de incertidumbre física |
| **P1** | Checkout con marcos e impresión como upsell para formatos aplicables. | JTBD-9; oportunidad #6 |
| **P1** | Feed de eventos culturales + agenda de exposiciones activas. | Oportunidad #7; recurrencia |
| **P2** | Panel de artista (estado de obra, ventas, pagos transparentes). | JTBD-3; dolor de carga operativa |
| **P2** | Materiales/landing para dueños de negocio (modelo cero costo, casos, proceso llave en mano). | JTBD-7/8; dolores de riesgo y medición |

---

## 11. Métricas sugeridas (post-lanzamiento)

- **Conversión físico→digital:** % de escaneos de QR que terminan en compra.
- **Tasa de comisión efectiva y retención de artistas.**
- **Ticket promedio** y % de uplift por servicios de marco/impresión.
- **Recurrencia de espacios** (expos hosteadas por local / año).
- **NPS** por arquetipo y **tasa de devolución/disputa** (proxy de confianza).

---

## 12. Fuentes y referencias

> Nota metodológica: las cifras de mercado y comportamiento citadas provienen de reportes de la industria del arte y estudios de consumo ampliamente reconocidos. Se recomienda verificar las ediciones más recientes al momento de la toma de decisiones, ya que los datos se actualizan anualmente.

1. **The Art Basel & UBS Global Art Market Report** (Dr. Clare McAndrew, Arts Economics) — Tamaño del mercado, ventas online, comportamiento de compradores. https://www.artbasel.com/about/initiatives/the-art-market
2. **Hiscox Online Art Trade Report** — Comportamiento de compra de arte online, confianza, rol de Instagram en el descubrimiento. https://www.hiscox.co.uk/online-art-trade-report
3. **Art Basel & UBS — "The Survey of Global Collecting"** — Perfiles de coleccionistas, presupuestos, motivaciones. https://www.artbasel.com
4. **TEFAF Art Market Report** — Estructura del mercado y dinámica de galerías. https://www.tefaf.com
5. **Artsy — Art Industry / Art Collector reports** — Tendencias de descubrimiento digital y precios. https://www.artsy.net
6. **Statista — Online art market & e-commerce statistics** — Tamaño y proyecciones del mercado de arte online. https://www.statista.com
7. **McKinsey & Company — Consumer & retail / "The State of Fashion & Luxury"** — Comportamiento de consumo discrecional y experiencias físico-digitales. https://www.mckinsey.com
8. **Christensen, C. — "Competing Against Luck" (Jobs-to-be-Done framework)** — Marco teórico de JTBD. (HarperBusiness)
9. **Nielsen Norman Group — E-commerce UX research** — Confianza, fricción de checkout, descubrimiento de producto. https://www.nngroup.com
10. **Saatchi Art / Etsy — términos de comisión y vendedor (sitios oficiales)** — Referencia de modelos de comisión vigentes. https://www.saatchiart.com · https://www.etsy.com

---

*Documento vivo. Recomendado complementar con investigación primaria: 8–12 entrevistas por arquetipo y pruebas de concepto del puente físico→digital antes de escalar.*
