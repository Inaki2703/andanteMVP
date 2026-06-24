import type { RefObject } from 'react';

// Duración/curva homologadas con el sistema de motion (--dur-snap / --ease-snap).
const DUR = 720;
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
// Margen para considerar que ya estamos al fondo de la página (footer).
const BOTTOM_EPS = 4;
// "Un buen scroll": delta de rueda hacia abajo que hay que acumular en el footer
// antes de disparar el bucle (≈ varios notches de rueda / un gesto deliberado).
const OVERSCROLL_THRESHOLD = 900;
// Si pasas este tiempo sin seguir empujando, el acumulador se reinicia: el gesto
// debe ser continuo, no toques sueltos.
const WHEEL_GAP = 220;

export interface ForwardLoopOptions {
  pageRef: RefObject<HTMLDivElement | null>;
  /** Elemento superior (hero/inicio) que entra desde abajo al completar el bucle. */
  getTopElement: () => HTMLElement | null;
}

// Bucle infinito SUAVE footer → inicio, sin secuestrar la rueda. Un único listener
// `wheel` PASIVO (no llama preventDefault, así no añade jank al scroll) detecta
// el gesto hacia abajo cuando ya estás al fondo (footer) y anima el inicio
// entrando desde abajo —como si siguieras bajando—, en vez de saltar de jalón al
// top. La técnica clona la zona superior, la desliza hacia arriba mientras la
// página sube, y al terminar reposiciona el scroll en 0 bajo el clon.
export function setupForwardLoop({ pageRef, getTopElement }: ForwardLoopOptions): () => void {
  let animating = false;
  let lastScrollTime = 0;
  let overscroll = 0;
  let lastWheelTime = 0;

  const atBottom = () =>
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - BOTTOM_EPS;

  // Marca de tiempo del último movimiento de scroll: ignoramos el momentum con el
  // que llegas al footer (mientras la página aún se mueve / el snap se asienta).
  const onScroll = () => { lastScrollTime = performance.now(); };
  const settled = () => performance.now() - lastScrollTime > 140;

  const loopToTop = () => {
    const page = pageRef.current;
    const topEl = getTopElement();
    if (!page || !topEl) return;
    animating = true;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo({ top: 0 });
      requestAnimationFrame(() => { animating = false; });
      return;
    }

    // Clon de la zona superior, fijo y posicionado justo debajo del viewport.
    const clone = topEl.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      margin: '0',
      overflow: 'hidden',
      zIndex: '60',
      pointerEvents: 'none',
      transform: 'translateY(100%)',
    });
    document.body.appendChild(clone);
    void clone.offsetHeight; // fuerza reflow para que la transición arranque

    // La página (footer a la vista) sube; el inicio entra desde abajo.
    page.style.transition = `transform ${DUR}ms ${EASE}`;
    page.style.transform = 'translateY(-100vh)';
    clone.style.transition = `transform ${DUR}ms ${EASE}`;
    clone.style.transform = 'translateY(0)';

    window.setTimeout(() => {
      page.style.transition = 'none';
      page.style.transform = 'none';
      window.scrollTo({ top: 0 });
      clone.remove();
      requestAnimationFrame(() => { animating = false; });
    }, DUR + 30);
  };

  const onWheel = (e: WheelEvent) => {
    if (animating) return;

    // Fuera del footer o subiendo: reinicia el acumulador.
    if (e.deltaY <= 0 || !atBottom()) {
      overscroll = 0;
      return;
    }

    const now = performance.now();
    // Aún llegando (momentum/snap asentándose): no cuenta, espera a estar quieto.
    if (!settled()) {
      overscroll = 0;
      lastWheelTime = now;
      return;
    }
    // El gesto debe ser continuo: una pausa reinicia el acumulado.
    if (now - lastWheelTime > WHEEL_GAP) overscroll = 0;
    lastWheelTime = now;

    overscroll += e.deltaY;
    if (overscroll >= OVERSCROLL_THRESHOLD) {
      overscroll = 0;
      loopToTop();
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', onWheel, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', onWheel);
  };
}

/** @deprecated Usar setupForwardLoop */
export function setupLandingLoop(options: {
  pageRef: RefObject<HTMLDivElement | null>;
  getHero: () => HTMLElement | null;
}): () => void {
  return setupForwardLoop({ pageRef: options.pageRef, getTopElement: options.getHero });
}
