import { useState } from 'react';
import { ShoppingBag, Sun, Moon, ChevronDown, X } from 'lucide-react';

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
  currentView,
  setView,
  cartCount,
  menuOpen,
  setMenuOpen,
  theme,
  setTheme
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50 flex items-stretch h-16 sm:h-20 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur border border-neutral-900 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300">
      
      {/* 1. Theme and Cart Section */}
      <div className="relative flex items-center gap-3 px-4 sm:px-6 border-r border-[#333333]/30 dark:border-[#555555]/40">
        {/* Visual Corner Cutouts */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-800 dark:text-neutral-200"
          title={theme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro'}
        >
          {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-[#D4F334]" />}
        </button>

        {/* Cart with dynamic count */}
        <button
          onClick={() => {
            setMenuOpen(false);
            setView('checkout');
          }}
          className="relative p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-800 dark:text-neutral-200"
          title="Ver selección"
        >
          <ShoppingBag className="h-4.5 w-4.5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#0084FF] text-white text-[8px] font-mono rounded-full font-bold flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. Brand and Dropdown Selector Section */}
      <div className="relative flex items-center px-4 sm:px-6 border-r border-[#333333]/30 dark:border-[#555555]/40">
        {/* Visual Corner Cutouts */}
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 group text-left select-none outline-none focus:outline-none"
        >
          <span className="font-sans font-bold text-xs sm:text-sm tracking-tight text-neutral-800 dark:text-neutral-200 uppercase">
            andante <span className="text-[#0084FF] dark:text-[#3D9DFF] group-hover:text-[#D4F334]">:)</span>
          </span>
          <span className="px-1.5 py-0.5 bg-[#D4F334] text-[#333333] text-[9px] font-mono font-bold rounded">
            {currentView === 'landing' ? 'SALA PRINCIPAL' : currentView === 'exhibition' ? 'EXPO' : 'CHECKOUT'}
          </span>
          <ChevronDown className={`h-3 w-3 text-neutral-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Options Absolute Overlay with Siena-Film Styling */}
        {dropdownOpen && (
          <div className="absolute top-[102%] left-1/2 -translate-x-1/2 mt-1 w-44 bg-white dark:bg-[#1E1E1E] border border-neutral-900 dark:border-neutral-700 rounded-xl overflow-hidden shadow-2xl z-50 py-1 animate-fade-in">
            <button
              onClick={() => {
                setView('landing');
                setDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-mono font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-between ${currentView === 'landing' ? 'text-[#0084FF] bg-neutral-50 dark:bg-neutral-800/50' : 'text-neutral-700 dark:text-neutral-300'}`}
            >
              <span>01 / SALA PRINCIPAL</span>
              {currentView === 'landing' && <span className="h-1.5 w-1.5 bg-[#0084FF] rounded-full animate-ping" />}
            </button>
            <button
              onClick={() => {
                setView('exhibition');
                setDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-mono font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-between ${currentView === 'exhibition' ? 'text-[#0084FF] bg-neutral-50 dark:bg-neutral-800/50' : 'text-neutral-700 dark:text-neutral-300'}`}
            >
              <span>02 / EXHIBICIÓN</span>
              {currentView === 'exhibition' && <span className="h-1.5 w-1.5 bg-[#0084FF] rounded-full animate-ping" />}
            </button>
            <button
               onClick={() => {
                 setView('checkout');
                 setDropdownOpen(false);
               }}
               className={`w-full text-left px-4 py-2.5 text-xs font-mono font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-between ${currentView === 'checkout' || currentView === 'cart' ? 'text-[#0084FF] bg-neutral-50 dark:bg-neutral-800/50' : 'text-neutral-700 dark:text-neutral-300'}`}
             >
               <span>03 / ADQUISICIÓN</span>
               {(currentView === 'checkout' || currentView === 'cart') && <span className="h-1.5 w-1.5 bg-[#0084FF] rounded-full animate-ping" />}
             </button>
          </div>
        )}
      </div>

      {/* 3. Menu Hamburger Icon Section (siena-film standard layout lines shrinking on hover) */}
      <div className="relative flex items-center px-4 sm:px-6">
        {/* Visual Corner Cutouts */}
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#F5F5F3] dark:bg-[#0E0E0E] rounded-full border border-neutral-900 dark:border-neutral-700"></div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 group select-none outline-none focus:outline-none"
          aria-label="Alternar menú"
        >
          {menuOpen ? (
            <X className="h-5 w-5 text-neutral-800 dark:text-neutral-200 transition-transform duration-200 rotate-90 hover:rotate-180" />
          ) : (
            <>
              <div className="w-6 h-[2px] sm:w-7 bg-neutral-800 dark:bg-neutral-200 transition-all duration-200 group-hover:w-4"></div>
              <div className="w-6 h-[2px] sm:w-7 bg-neutral-800 dark:bg-neutral-200 transition-all duration-200"></div>
              <div className="w-6 h-[2px] sm:w-7 bg-neutral-800 dark:bg-neutral-200 transition-all duration-200 group-hover:w-4"></div>
            </>
          )}
        </button>
      </div>

    </nav>
  );
}
