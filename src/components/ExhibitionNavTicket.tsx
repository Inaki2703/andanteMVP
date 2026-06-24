interface ExhibitionNavTicketProps {
  setView: (view: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  dateLabel?: string;
}

/** Ticket negro de navegación en detalle de exposición (diseño original + menú). */
export default function ExhibitionNavTicket({
  setView,
  menuOpen,
  setMenuOpen,
  dateLabel = '🎟️ Junio 23 - Agosto 25, 2026',
}: ExhibitionNavTicketProps) {
  return (
    <nav
      aria-label="Navegación de exposición"
      className="relative w-full bg-deep dark:bg-neutral-800 text-white px-5 py-2 text-[10px] sm:text-xs font-mono font-bold tracking-[0.12em] uppercase rounded-lg shadow-md flex items-center gap-3 sm:gap-4 select-none min-w-0"
    >
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-page rounded-full border-r border-deep dark:border-neutral-800" />
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-page rounded-full border-l border-deep dark:border-neutral-800" />

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setView('landing')}
          className="focus-ring hover:text-brand transition-smooth flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span aria-hidden="true">🏠</span>
          <span>Sala Principal</span>
        </button>
        <span className="text-white/35 shrink-0">/</span>
        <span className="truncate">Arte Mundialista</span>
      </div>

      <span className="shrink-0 whitespace-nowrap text-[9px] sm:text-[10px] md:text-xs opacity-95">
        {dateLabel}
      </span>

      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="focus-ring flex flex-col items-center justify-center gap-[5px] w-8 h-8 shrink-0 group outline-none"
        aria-label="Menú"
        aria-expanded={menuOpen}
      >
        <span className="block w-[22px] h-[1.5px] bg-white transition-all duration-[var(--dur-fast)] group-hover:w-3.5" />
        <span className="block w-[22px] h-[1.5px] bg-white" />
        <span className="block w-[22px] h-[1.5px] bg-white transition-all duration-[var(--dur-fast)] group-hover:w-3.5" />
      </button>
    </nav>
  );
}
