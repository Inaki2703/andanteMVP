import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CaretDown } from '@phosphor-icons/react';

interface Exhibition {
  id: string;
  title: string;
  venue: string;
  year: string;
  active?: boolean;
  image: string;
}

const EXHIBITIONS: Exhibition[] = [
  {
    id: 'arte-mundialista',
    title: 'Arte mundialista',
    venue: 'Café Norte',
    year: '2026',
    active: true,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=80',
  },
  {
    id: 'refracciones',
    title: 'Refracciones',
    venue: 'Librería Sur',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=80',
  },
  {
    id: 'luz-de-barrio',
    title: 'Luz de Barrio',
    venue: 'Bar La Bruja',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=80',
  },
  {
    id: 'pigmento-vivo',
    title: 'Pigmento Vivo',
    venue: 'Estudio Abierto',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=80',
  },
  {
    id: 'primeros-azules',
    title: 'Primeros Azules',
    venue: 'Casa Cultural',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=80',
  },
];

// Nav dimensions
const W = 352;
const H = 106;
const CR = 12; // corner radius
const NR = 18; // notch (semicircle) radius — prominently visible
const DX = 216; // divider X position (left section = 216px, right = 136px)

// SVG path: rounded rect + two concave semicircle notches at top & bottom of divider
const TICKET_PATH = [
  `M${CR},0`,
  `L${DX - NR},0`,
  `A${NR},${NR} 0 0,1 ${DX + NR},0`,   // top notch — arc goes DOWN into nav
  `L${W - CR},0`,
  `A${CR},${CR} 0 0,1 ${W},${CR}`,       // top-right corner
  `L${W},${H - CR}`,
  `A${CR},${CR} 0 0,1 ${W - CR},${H}`,   // bottom-right corner
  `L${DX + NR},${H}`,
  `A${NR},${NR} 0 0,1 ${DX - NR},${H}`, // bottom notch — arc goes UP into nav
  `L${CR},${H}`,
  `A${CR},${CR} 0 0,1 0,${H - CR}`,      // bottom-left corner
  `L0,${CR}`,
  `A${CR},${CR} 0 0,1 ${CR},0`,          // top-left corner
  'Z',
].join(' ');

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export default function Header({
  setView,
  cartCount,
  menuOpen,
  setMenuOpen,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeExhibition = EXHIBITIONS.find((e) => e.active) ?? EXHIBITIONS[0];

  return (
    <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>

      {/* ── Ticket nav ── */}
      <div className="relative" style={{ width: W, height: H }}>

        {/* Fill — clipped to ticket shape */}
        <div
          className="absolute inset-0 bg-[#FAFAF7] dark:bg-[#1A1A1A]"
          style={{ clipPath: `path("${TICKET_PATH}")` }}
        />

        {/* SVG border — traces the same ticket path */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={W} height={H}
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
        >
          <path
            d={TICKET_PATH}
            stroke="#D0CFC9"
            strokeWidth="1"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex items-stretch h-full">

          {/* Left: brand + pill — ancho fijo = DX para que el divisor alinee con el notch */}
          <div
            className="flex flex-col justify-center gap-2 shrink-0"
            style={{ width: DX, paddingLeft: 24, paddingRight: 16 }}
          >
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-label="Cambiar de exposición"
              className="focus-ring flex items-center gap-1.5 w-fit select-none outline-none"
            >
              <span
                className="text-fg text-[22px] leading-none"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
              >
                andante
              </span>
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="text-fg"
              >
                <CaretDown size={17} weight="bold" />
              </motion.span>
            </button>

            <button
              onClick={() => setView('exhibition')}
              className="focus-ring flex items-center gap-1.5 w-fit px-2 py-[3px] rounded bg-brand hover:bg-brand-hover transition-colors"
            >
              <span className="text-[10px]" aria-hidden="true">🎨</span>
              <span
                className="text-[11px] text-black leading-none"
                style={{ fontFamily: "'Syne Mono', monospace" }}
              >
                {activeExhibition.title}
              </span>
            </button>
          </div>

          {/* Dashed vertical divider — positioned at DX */}
          <div
            className="self-stretch w-px shrink-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #C4C3BD 0px, #C4C3BD 5px, transparent 5px, transparent 10px)',
            }}
          />

          {/* Right: cart + hamburger */}
          <div className="flex items-center gap-4 px-5">
            <button
              onClick={() => { setMenuOpen(false); setView('checkout'); }}
              className="focus-ring relative text-fg hover:opacity-70 transition-opacity"
              aria-label="Ver carrito"
            >
              <ShoppingBag size={22} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-brand text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus-ring flex flex-col gap-[5px] group select-none outline-none"
              aria-label="Menú"
              aria-expanded={menuOpen}
            >
              <span className="block w-[22px] h-[1.5px] bg-[#1A1A1A] dark:bg-[#F2F2F2] transition-all duration-200 group-hover:w-3.5" />
              <span className="block w-[22px] h-[1.5px] bg-[#1A1A1A] dark:bg-[#F2F2F2]" />
              <span className="block w-[22px] h-[1.5px] bg-[#1A1A1A] dark:bg-[#F2F2F2] transition-all duration-200 group-hover:w-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ── Dropdown exhibitions list ── */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top', width: W }}
            className="mt-2 bg-[#FAFAF7] dark:bg-[#1A1A1A] border border-[#D0CFC9] dark:border-[#333] rounded-xl overflow-hidden shadow-xl"
          >
            <div className="px-5 py-3 border-b border-[#E8E7E2] dark:border-[#2A2A2A]">
              <span
                className="text-[10px] text-[#888] uppercase tracking-widest"
                style={{ fontFamily: "'Syne Mono', monospace" }}
              >
                Exposiciones
              </span>
            </div>

            {EXHIBITIONS.map((expo, i) => (
              <motion.button
                key={expo.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.18 }}
                onClick={() => { setView('exhibition'); setDropdownOpen(false); }}
                className="focus-ring w-full flex items-center gap-3 px-5 py-3 hover:bg-elevated dark:hover:bg-elevated transition-colors border-b border-[#E8E7E2] dark:border-[#2A2A2A] last:border-0"
              >
                <div className="shrink-0 w-9 h-9 rounded overflow-hidden bg-[#E0DED8]">
                  <img src={expo.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p
                    className="text-[13px] text-fg leading-tight truncate"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}
                  >
                    {expo.title}
                  </p>
                  <p
                    className="text-[10px] text-[#888] truncate mt-0.5"
                    style={{ fontFamily: "'Syne Mono', monospace" }}
                  >
                    {expo.venue} · {expo.year}
                  </p>
                </div>
                {expo.active && (
                  <span className="shrink-0 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand" aria-hidden="true" />
                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-fg-secondary">Activa</span>
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
