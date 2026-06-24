import type { RefObject } from 'react';

export interface SectionPagerOptions {
  getSections: () => HTMLElement[];
  pageRef: RefObject<HTMLDivElement | null>;
  enableWrap?: boolean;
  /** Si retorna false, el wheel no se intercepta (scroll nativo). */
  shouldIntercept?: () => boolean;
}

const THRESHOLD = 420;
const MAX_PEEK = 70;
const DUR = 760;
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

export function absTop(el: HTMLElement): number {
  let y = 0;
  let n: HTMLElement | null = el;
  while (n) {
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return y;
}

export function centerScroll(el: HTMLElement, behavior: ScrollBehavior): void {
  const top =
    el.offsetHeight > window.innerHeight
      ? absTop(el)
      : absTop(el) + el.offsetHeight / 2 - window.innerHeight / 2;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function resolveEnterIndex(sections: HTMLElement[]): number {
  if (sections.length === 0) return 0;

  const anchor = window.scrollY + window.innerHeight * 0.38;

  for (let i = 0; i < sections.length; i++) {
    const top = absTop(sections[i]!);
    const bottom = top + sections[i]!.offsetHeight;
    if (anchor >= top && anchor < bottom) return i;
  }

  const firstTop = absTop(sections[0]!);
  if (anchor < firstTop) return 0;

  return syncIndexToViewport(sections);
}

function syncIndexToViewport(sections: HTMLElement[]): number {
  if (sections.length === 0) return 0;

  const scrollCenter = window.scrollY + window.innerHeight / 2;

  for (let i = 0; i < sections.length; i++) {
    const top = absTop(sections[i]!);
    const bottom = top + sections[i]!.offsetHeight;
    if (scrollCenter >= top && scrollCenter < bottom) {
      return i;
    }
  }

  let best = 0;
  let bestDist = Infinity;
  sections.forEach((el, i) => {
    const mid = absTop(el) + el.offsetHeight / 2;
    const dist = Math.abs(scrollCenter - mid);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}

export function setupSectionPager({
  getSections,
  pageRef,
  enableWrap = false,
  shouldIntercept = () => true,
}: SectionPagerOptions): () => void {
  let index = 0;
  let locked = false;
  let accum = 0;
  let resetTimer = 0;
  let peekEl: HTMLElement | null = null;
  let wasIntercepting = false;

  const syncIndex = () => {
    const sections = getSections();
    index = syncIndexToViewport(sections);
  };

  syncIndex();

  const applyPeek = (dir: 1 | -1, mag: number) => {
    const el = getSections()[index] as HTMLElement & { __pagerStep?: unknown };
    if (!el || typeof el.__pagerStep === 'function') return;
    peekEl = el;
    const y = -dir * Math.min(mag, MAX_PEEK);
    el.style.transition = 'transform 100ms linear';
    el.style.transform = `translateY(${y}px)`;
  };

  const clearPeek = () => {
    if (!peekEl) return;
    peekEl.style.transition = '';
    peekEl.style.transform = '';
    peekEl = null;
  };

  const goTo = (i: number) => {
    const sections = getSections();
    const el = sections[i];
    if (!el) return;
    clearPeek();
    locked = true;
    index = i;
    centerScroll(el, 'smooth');
    window.setTimeout(() => {
      locked = false;
    }, 720);
  };

  const wrap = (dir: 1 | -1) => {
    if (!enableWrap) return;
    const page = pageRef.current;
    const sections = getSections();
    if (!page || sections.length === 0) return;
    locked = true;
    clearPeek();

    const source = dir === 1 ? sections[0] : sections[sections.length - 1];
    const clone = source.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      margin: '0',
      zIndex: '60',
      pointerEvents: 'none',
      transform: dir === 1 ? 'translateY(100%)' : 'translateY(-100%)',
    });
    document.body.appendChild(clone);
    void clone.offsetHeight;

    page.style.transition = `transform ${DUR}ms ${EASE}`;
    page.style.transform = dir === 1 ? 'translateY(-100vh)' : 'translateY(100vh)';
    clone.style.transition = `transform ${DUR}ms ${EASE}`;
    clone.style.transform = 'translateY(0)';

    window.setTimeout(() => {
      page.style.transition = 'none';
      page.style.transform = 'none';
      const now = getSections();
      if (dir === 1) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        index = 0;
      } else {
        const last = now.length - 1;
        if (now[last]) centerScroll(now[last], 'instant' as ScrollBehavior);
        index = last;
      }
      clone.remove();
      requestAnimationFrame(() => {
        locked = false;
      });
    }, DUR + 30);
  };

  const onWheel = (e: WheelEvent) => {
    const intercepting = shouldIntercept();

    if (!intercepting) {
      wasIntercepting = false;
      return;
    }

    const sections = getSections();
    if (sections.length === 0) return;

    // Al entrar en la zona snap, anclar a la sección correcta antes de paginar.
    if (!wasIntercepting) {
      wasIntercepting = true;
      index = e.deltaY > 0 ? resolveEnterIndex(sections) : syncIndexToViewport(sections);
      if (e.deltaY > 0) {
        goTo(index);
        e.preventDefault();
        return;
      }
    }

    syncIndex();

    const activeSection = sections[index] as HTMLElement & {
      __pagerWheel?: (deltaY: number) => void;
    };
    activeSection?.__pagerWheel?.(e.deltaY);

    e.preventDefault();

    if (locked) {
      accum = 0;
      return;
    }

    accum += e.deltaY;
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      accum = 0;
      clearPeek();
    }, 160);

    const dir: 1 | -1 = accum > 0 ? 1 : -1;

    if (Math.abs(accum) < THRESHOLD) {
      applyPeek(dir, Math.abs(accum) * 0.22);
      return;
    }

    accum = 0;

    const cur = sections[index] as HTMLElement & { __pagerStep?: (d: 1 | -1) => boolean };
    if (typeof cur?.__pagerStep === 'function' && cur.__pagerStep(dir)) {
      clearPeek();
      locked = true;
      window.setTimeout(() => {
        locked = false;
      }, 620);
      return;
    }

    const n = sections.length;
    const target = index + dir;

    if (target < 0) {
      if (enableWrap) {
        wrap(-1);
      } else {
        clearPeek();
        const first = sections[0];
        if (first && index === 0) {
          window.scrollTo({
            top: Math.max(0, absTop(first) - window.innerHeight * 0.85),
            behavior: 'smooth',
          });
          wasIntercepting = false;
        }
      }
    } else if (target >= n) {
      if (enableWrap) wrap(1);
      else clearPeek();
    } else {
      goTo(target);
      (sections[target] as HTMLElement & { __pagerEnter?: (d: 1 | -1) => void })?.__pagerEnter?.(dir);
    }
  };

  window.addEventListener('wheel', onWheel, { passive: false });

  return () => {
    window.clearTimeout(resetTimer);
    clearPeek();
    window.removeEventListener('wheel', onWheel);
  };
}
