import { useEffect, useRef, useState, RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TrailItem {
  id: number;
  x: number; // posición relativa al panel
  y: number;
  src: string;
  rot: number;
}

interface ImageTrailProps {
  /** Pool de imágenes de la fila activa; null cuando el cursor sale de la lista. */
  activeImages: string[] | null;
  /** Panel del modal: sistema de coordenadas para posicionar las imágenes. */
  panelRef: RefObject<HTMLElement | null>;
  /** Lista de trayectoria: solo se generan imágenes mientras el cursor está dentro. */
  listRef: RefObject<HTMLElement | null>;
  /** Desactiva el efecto (touch / prefers-reduced-motion). */
  enabled: boolean;
}

const SPAWN_DISTANCE = 90; // px que debe moverse el cursor para soltar otra imagen
const MAX_ITEMS = 7;

// Image trail orgánico: al mover el cursor sobre una fila de trayectoria, suelta
// imágenes de esa muestra que siguen al puntero y permanecen hasta cambiar de
// fila o salir de la lista.
export default function ImageTrail({ activeImages, panelRef, listRef, enabled }: ImageTrailProps) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const lastSpawn = useRef<{ x: number; y: number } | null>(null);
  const cycle = useRef(0);
  const nextId = useRef(0);

  // Al cambiar de fila (o salir de la lista) se limpia el set actual (fade-out).
  useEffect(() => {
    setItems([]);
    lastSpawn.current = null;
    cycle.current = 0;
  }, [activeImages]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      const pool = activeImages;
      const panel = panelRef.current;
      const list = listRef.current;
      if (!pool || pool.length === 0 || !panel || !list) return;

      // Solo generamos imágenes mientras el cursor está sobre la lista.
      const lr = list.getBoundingClientRect();
      const inside =
        e.clientX >= lr.left && e.clientX <= lr.right && e.clientY >= lr.top && e.clientY <= lr.bottom;
      if (!inside) return;

      const last = lastSpawn.current;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (Math.hypot(dx, dy) < SPAWN_DISTANCE) return;
      }
      lastSpawn.current = { x: e.clientX, y: e.clientY };

      const pr = panel.getBoundingClientRect();
      const x = e.clientX - pr.left;
      const y = e.clientY - pr.top;
      const src = pool[cycle.current % pool.length];
      cycle.current += 1;
      const rot = (Math.random() - 0.5) * 18;
      const id = nextId.current++;

      setItems((prev) => {
        const next = [...prev, { id, x, y, src, rot }];
        return next.length > MAX_ITEMS ? next.slice(next.length - MAX_ITEMS) : next;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled, activeImages, panelRef, listRef]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20" aria-hidden="true">
      <AnimatePresence>
        {items.map((it) => (
          <motion.img
            key={it.id}
            src={it.src}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: it.x,
              top: it.y,
              translateX: '-50%',
              translateY: '-50%',
              rotate: it.rot,
            }}
            className="w-[140px] h-[180px] sm:w-[160px] sm:h-[200px] object-cover rounded-[20px] shadow-2xl"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
