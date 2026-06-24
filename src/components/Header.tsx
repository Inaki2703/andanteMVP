import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CaretDown, Sun, Moon } from '@phosphor-icons/react';

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

// Nav dimensions — Figma node 67:476
const W = 368;
const H = 105;
const DX = 226;

// Radios en escala 8px (design-system): hero usa 32/40 → ticket un paso abajo: 24/32.
const TICKET_CR_MOBILE = 24; // radius-xl
const TICKET_CR_DESKTOP = 32; // radius-2xl — armónico con hero md (40px)
const TICKET_NR = 16; // perforación (2× base 8px)

function buildTicketGeometry(cr: number, nr: number) {
  const body = [
    `M${cr},0`,
    `H${W - cr}`,
    `A${cr},${cr} 0 0 1 ${W},${cr}`,
    `V${H - cr}`,
    `A${cr},${cr} 0 0 1 ${W - cr},${H}`,
    `H${cr}`,
    `A${cr},${cr} 0 0 1 0,${H - cr}`,
    `V${cr}`,
    `A${cr},${cr} 0 0 1 ${cr},0`,
    'Z',
  ].join(' ');

  const topPunch = [
    `M${DX - nr},0`,
    `A${nr},${nr} 0 0 0 ${DX + nr},0`,
    `L${DX - nr},0`,
    'Z',
  ].join(' ');

  const bottomPunch = [
    `M${DX - nr},${H}`,
    `A${nr},${nr} 0 0 1 ${DX + nr},${H}`,
    `L${DX - nr},${H}`,
    'Z',
  ].join(' ');

  const stroke = [
    `M${cr},0`,
    `H${DX - nr}`,
    `A${nr},${nr} 0 0 0 ${DX + nr},0`,
    `H${W - cr}`,
    `A${cr},${cr} 0 0 1 ${W},${cr}`,
    `V${H - cr}`,
    `A${cr},${cr} 0 0 1 ${W - cr},${H}`,
    `H${DX + nr}`,
    `A${nr},${nr} 0 0 0 ${DX - nr},${H}`,
    `H${cr}`,
    `A${cr},${cr} 0 0 1 0,${H - cr}`,
    `V${cr}`,
    `A${cr},${cr} 0 0 1 ${cr},0`,
    'Z',
  ].join(' ');

  return { fill: `${body} ${topPunch} ${bottomPunch}`, stroke };
}

function useTicketCornerRadius(): number {
  const [cr, setCr] = useState(TICKET_CR_MOBILE);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setCr(mq.matches ? TICKET_CR_DESKTOP : TICKET_CR_MOBILE);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return cr;
}

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Modo claro activo. Cambiar a oscuro.' : 'Modo oscuro activo. Cambiar a claro.'}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="focus-ring relative w-[55px] h-[24px] rounded-full bg-brand p-[2px] shrink-0"
    >
      <motion.span
        className="flex items-center justify-center w-[24px] h-[20px] bg-white shadow-sm"
        style={{
          borderRadius: '80px 100px 100px 80px',
        }}
        animate={{ x: isLight ? 27 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isLight ? 'sun' : 'moon'}
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#333]"
            aria-hidden
          >
            {isLight ? (
              <Sun size={16} weight="fill" />
            ) : (
              <Moon size={16} weight="fill" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}

export default function Header({
  setView,
  cartCount,
  menuOpen,
  setMenuOpen,
  theme,
  setTheme,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ticketCr = useTicketCornerRadius();
  const ticket = useMemo(
    () => buildTicketGeometry(ticketCr, TICKET_NR),
    [ticketCr],
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-[38px] right-[38px] z-50" ref={dropdownRef}>

      {/* ── Ticket nav (Figma 67:476) ── */}
      <div
        className="relative drop-shadow-[0_1px_3px_rgba(51,51,51,0.08)] dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
        style={{ width: W, height: H }}
      >

        {/* Forma ticket: fill = fondo de página (sin patrón de puntos) + stroke sutil */}
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          aria-hidden
        >
          <path
            d={ticket.fill}
            fill="var(--ds-bg-page)"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          <path
            d={ticket.stroke}
            fill="none"
            stroke="var(--ds-border)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative z-10 flex items-stretch h-full">

          {/* Izquierda: marca + toggle */}
          <div
            className="flex flex-col justify-center shrink-0"
            style={{ width: DX, paddingLeft: 20, paddingRight: 16 }}
          >
            <div className="flex flex-col gap-2 w-[158px]">
              <div className="flex items-center justify-between w-full h-8">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="Cambiar de exposición"
                  className="focus-ring flex items-center gap-0 outline-none select-none"
                >
                  <span
                    className="text-[#333] dark:text-[#F2F2F2] text-[24px] leading-none whitespace-nowrap"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                  >
                    andante
                  </span>
                </button>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="Abrir lista de exposiciones"
                  className="focus-ring flex items-center justify-center w-8 h-8 shrink-0 outline-none"
                >
                  <motion.span
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#333] dark:text-[#F2F2F2]"
                  >
                    <CaretDown size={20} weight="bold" />
                  </motion.span>
                </button>
              </div>

              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </div>

          {/* Divisor punteado — alineado con las muescas del ticket */}
          <div
            className="absolute w-[2px] -translate-x-1/2 pointer-events-none"
            style={{
              left: DX,
              top: TICKET_NR,
              bottom: TICKET_NR,
              backgroundImage:
                'repeating-linear-gradient(to bottom, var(--ds-fg-muted) 0px, var(--ds-fg-muted) 7px, transparent 7px, transparent 13px)',
            }}
            aria-hidden
          />

          {/* Derecha: carrito + menú */}
          <div className="flex flex-1 items-center justify-end gap-6 pr-6">
            <button
              onClick={() => { setMenuOpen(false); setView('checkout'); }}
              className="focus-ring relative flex items-center justify-center w-8 h-8 text-[#333] dark:text-[#F2F2F2] hover:opacity-70 transition-opacity duration-[var(--dur-fast)]"
              aria-label="Ver carrito"
            >
              <ShoppingBag size={24} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-brand text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus-ring flex flex-col items-center justify-center gap-[5px] w-8 h-8 group select-none outline-none"
              aria-label="Menú"
              aria-expanded={menuOpen}
            >
              <span className="block w-[22px] h-[1.5px] bg-[#333] dark:bg-[#F2F2F2] transition-all duration-[var(--dur-fast)] group-hover:w-3.5" />
              <span className="block w-[22px] h-[1.5px] bg-[#333] dark:bg-[#F2F2F2]" />
              <span className="block w-[22px] h-[1.5px] bg-[#333] dark:bg-[#F2F2F2] transition-all duration-[var(--dur-fast)] group-hover:w-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ── Dropdown exposiciones ── */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top', width: W }}
            className="mt-2 bg-page border border-[var(--ds-border)] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl"
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
