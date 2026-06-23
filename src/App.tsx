import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, ShieldAlert, Heart, HelpCircle, Sparkles } from 'lucide-react';

// Shared imports
import { Artwork, CartItem, ShippingInfo, PaymentInfo } from './types';
import { ARTWORKS_DATA, ARTISTS_DATA, MANIFIESTO } from './data';

// Component imports
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import LandingView from './components/LandingView';
import ExhibitionView from './components/ExhibitionView';
import ArtistView from './components/ArtistView';
import ArtworkDetailModal from './components/ArtworkDetailModal';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import SuccessView from './components/SuccessView';
import ClickSpark from './components/ClickSpark';

export default function App() {
  // Navigation structure
  const [currentView, setView] = useState<string>('landing');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showManifesto, setShowManifesto] = useState<boolean>(false);

  // Selected artist for the semblanza page (mock "route" /artista/:slug)
  const [selectedArtistSlug, setSelectedArtistSlug] = useState<string | null>(null);

  const handleSelectArtist = (slug: string) => {
    setSelectedArtistSlug(slug);
    setMenuOpen(false);
    setView('artist');
  };

  // Theme support — el tema inicial sigue la preferencia del sistema; el toggle la sobrescribe.
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  // Dynamic products catalog state
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS_DATA);

  // Selector / Cart selection states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Ref al contenedor scrolleable (para animar el wrap del scroll infinito)
  const pageRef = useRef<HTMLDivElement>(null);

  // Checkout order states
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'sede'>('domicilio');
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);

  // Synchronize dynamic client theme classes with the document element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Page title syncer
  useEffect(() => {
    document.title = "Andante — Galería Itinerante Digital";
  }, []);

  // Sync scroll on navigating
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // ── Pager por secciones (solo en la landing) ──────────────────────────────
  // Cada gesto de scroll avanza exactamente UNA sección, animada y bloqueada,
  // para que se sienta como bloques que encajan al viewport (no scroll libre).
  // En los extremos hace un "wrap" orgánico: al bajar desde el footer, el hero
  // se desliza desde abajo (sensación de seguir bajando) y luego resetea sin
  // costura; al subir desde el hero, el footer entra desde arriba.
  useEffect(() => {
    if (currentView !== 'landing') return;
    // No interceptar cuando hay overlays que necesitan scroll propio.
    if (menuOpen || showManifesto || selectedArtwork) return;

    let index = 0;
    let locked = false;
    let accum = 0;            // delta acumulado del gesto en curso
    let resetTimer = 0;       // limpia el acumulado si el usuario pausa
    let peekEl: HTMLElement | null = null;
    const THRESHOLD = 420;    // intención requerida (más permisivo que antes)
    const MAX_PEEK = 70;      // px máximos del adelanto/“peek” de la sección
    const DUR = 760; // ms de la animación de wrap
    const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));

    // Posición de layout (ignora transforms del reveal/peek) para centrar bien.
    const absTop = (el: HTMLElement) => {
      let y = 0;
      let n: HTMLElement | null = el;
      while (n) { y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
      return y;
    };
    const centerScroll = (el: HTMLElement, behavior: ScrollBehavior) => {
      const top = absTop(el) + el.offsetHeight / 2 - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(0, top), behavior });
    };

    // “Peek”: desplaza un poco la sección activa en la dirección del scroll para
    // sugerir que se puede continuar; al pausar o cambiar de sección, regresa.
    const applyPeek = (dir: 1 | -1, mag: number) => {
      const el = getSections()[index];
      if (!el) return;
      peekEl = el;
      const y = -dir * Math.min(mag, MAX_PEEK);
      el.style.transition = 'transform 100ms linear';
      el.style.transform = `translateY(${y}px)`;
    };
    const clearPeek = () => {
      if (!peekEl) return;
      peekEl.style.transition = ''; // vuelve a la transición de reveal (0.7s)
      peekEl.style.transform = '';
      peekEl = null;
    };

    const goTo = (i: number) => {
      const el = getSections()[i];
      if (!el) return;
      clearPeek();
      locked = true;
      index = i;
      centerScroll(el, 'smooth');
      window.setTimeout(() => { locked = false; }, 720);
    };

    // Clona una sección a pantalla completa fija y la desliza desde un borde,
    // mientras la página se desplaza en paralelo. Al terminar, reset sin costura.
    const wrap = (dir: 1 | -1) => {
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
      void clone.offsetHeight; // reflow para que la transición arranque

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
        requestAnimationFrame(() => { locked = false; });
      }, DUR + 30);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (locked) { accum = 0; return; }

      // Acumula la intención del gesto; se reinicia si el usuario pausa.
      accum += e.deltaY;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => { accum = 0; clearPeek(); }, 160);

      const dir: 1 | -1 = accum > 0 ? 1 : -1;

      if (Math.abs(accum) < THRESHOLD) {
        // Aún no hay intención suficiente: sólo “asoma” la sección como pista.
        applyPeek(dir, Math.abs(accum) * 0.22);
        return;
      }

      accum = 0;
      const sections = getSections();

      // La sección activa puede "consumir" el gesto (p.ej. el stack curado baraja
      // una carta). Sólo si no lo consume, el pager cambia de sección.
      const cur = sections[index] as HTMLElement & { __pagerStep?: (d: 1 | -1) => boolean };
      if (typeof cur?.__pagerStep === 'function' && cur.__pagerStep(dir)) {
        clearPeek();
        locked = true;
        window.setTimeout(() => { locked = false; }, 620);
        return;
      }

      const n = sections.length;
      const target = index + dir;

      if (target < 0) wrap(-1);
      else if (target >= n) wrap(1);
      else {
        goTo(target);
        (sections[target] as HTMLElement & { __pagerEnter?: (d: 1 | -1) => void })
          ?.__pagerEnter?.(dir);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.clearTimeout(resetTimer);
      clearPeek();
      window.removeEventListener('wheel', onWheel);
    };
  }, [currentView, menuOpen, showManifesto, selectedArtwork]);

  // ── Reveal homologado de secciones (solo en la landing) ──
  // Cada sección se anima al entrar al viewport; se re-activa cada vez que
  // vuelve a entrar, así el motion es consistente en todo el recorrido.
  useEffect(() => {
    if (currentView !== 'landing') return;
    const root = window.document.documentElement;
    root.classList.add('landing-reveal');

    const els = Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle('reveal-in', e.isIntersecting);
        });
      },
      { threshold: 0.45 }
    );

    els.forEach((el) => {
      // Evita el parpadeo inicial: revela de una la sección ya centrada.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.55 && r.bottom > window.innerHeight * 0.45) {
        el.classList.add('reveal-in');
      }
      io.observe(el);
    });

    return () => {
      io.disconnect();
      root.classList.remove('landing-reveal');
      els.forEach((el) => el.classList.remove('reveal-in'));
    };
  }, [currentView]);

  // Cart operations
  const handleAddToCart = (artwork: Artwork) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.artwork.id === artwork.id);
      if (exists) {
        return prev; // original pieces can only have quantity 1
      }
      return [...prev, { artwork, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (artworkId: string) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Checkout submit callback
  const handleSubmitOrder = (
    shipping: ShippingInfo,
    payment: PaymentInfo,
    delivery: 'domicilio' | 'sede'
  ) => {
    setShippingInfo(shipping);
    setDeliveryMethod(delivery);
    setPurchasedItems([...cart]);

    // Update artworks list status locally
    const purchasedIds = cart.map((item) => item.artwork.id);
    setArtworks((prev) =>
      prev.map((art) =>
        purchasedIds.includes(art.id) ? { ...art, status: 'Vendido' } : art
      )
    );

    // Proceed to success screen
    setView('success');
  };

  // Helper selectors
  const isSelectedArtworkInCart = selectedArtwork
    ? cart.some((item) => item.artwork.id === selectedArtwork.id)
    : false;

  return (
    <ClickSpark>
    <div ref={pageRef} className="flex flex-col min-h-screen bg-[#F5F5F3] dark:bg-[#0E0E0E] grid-dot-pattern text-[#333333] dark:text-[#F2F2F2] font-sans tracking-normal relative md:pb-0 pb-16 transition-colors duration-400">
      
      {/* 1. Header Area with dynamic dark status */}
      {currentView !== 'checkout' && currentView !== 'cart' && currentView !== 'exhibition' && currentView !== 'success' && currentView !== 'artist' && (
        <Header
          currentView={currentView}
          setView={setView}
          cartCount={cart.length}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      {/* 2. Main Menu Coordinates Drawer overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MainMenu
            setView={setView}
            setMenuOpen={setMenuOpen}
            onOpenManifesto={() => setShowManifesto(true)}
          />
        )}
      </AnimatePresence>

      {/* 3. Core App Content router */}
      <main className="flex-grow">
        {currentView === 'landing' && (
          <LandingView
            setView={setView}
            onSelectArtwork={(art) => {
              // Get live reactive artwork status from state
              const activeArt = artworks.find(a => a.id === art.id) || art;
              setSelectedArtwork(activeArt);
            }}
          />
        )}

        {currentView === 'exhibition' && (
          <ExhibitionView
            setView={setView}
            onSelectArtwork={(art) => {
              // Get live reactive artwork status from state
              const activeArt = artworks.find(a => a.id === art.id) || art;
              setSelectedArtwork(activeArt);
            }}
            onSelectArtist={handleSelectArtist}
          />
        )}

        {currentView === 'artist' && (() => {
          const artist = ARTISTS_DATA.find((a) => a.slug === selectedArtistSlug);
          if (!artist) return null;
          return (
            <ArtistView
              artist={artist}
              artworks={artworks}
              setView={setView}
              onSelectArtwork={(art) => {
                const activeArt = artworks.find((a) => a.id === art.id) || art;
                setSelectedArtwork(activeArt);
              }}
            />
          );
        })()}

        {(currentView === 'cart' || currentView === 'checkout') && (
          <CheckoutView
            cart={cart}
            artworks={artworks}
            onRemoveItem={handleRemoveFromCart}
            setView={setView}
            onSelectArtwork={(art) => {
              const activeArt = artworks.find((a) => a.id === art.id) || art;
              setSelectedArtwork(activeArt);
            }}
            onSubmitOrder={handleSubmitOrder}
          />
        )}

        {currentView === 'success' && (
          <SuccessView
            purchasedItems={purchasedItems}
            shippingInfo={shippingInfo}
            deliveryMethod={deliveryMethod}
            setView={setView}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      {/* 4. Elegant Editorial Footer (Design System v3.0 standard) */}
      {currentView !== 'checkout' && currentView !== 'cart' && currentView !== 'success' && (
        <footer
          className={`flex-shrink-0 transition-colors duration-400 ${
            currentView === 'landing'
              ? 'snap-section p-6 min-h-dvh flex flex-col justify-center'
              : ''
          }`}
        >
          <div
            className={`bg-[#222222] text-[#F2F2F2] text-xs font-sans transition-colors duration-400 ${
              currentView === 'landing'
                ? 'rounded-[32px] md:rounded-[40px] w-full py-16 px-6 sm:px-10'
                : 'py-20 px-4 sm:px-6 lg:px-8 shadow-inner'
            }`}
          >
          <div className="max-w-7xl mx-auto space-y-16">

            {/* Top Row: Brand & Subscription */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-b border-neutral-800 pb-16">
              <div className="space-y-4">
                <h2 className="font-sans font-black text-4xl sm:text-5xl tracking-tighter text-[#D4F334] select-none">
                  ANDANTE :)
                </h2>
                <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">
                  Un proyecto vanguardista de descentralización artística. Curamos espacios físicos, articulando miradas, cultura local y obras originales de creadores independientes.
                </p>
              </div>

              {/* Subscribe form aligned beautifully */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#D4F334] font-bold block uppercase">
                  SUSCRIPCIÓN
                </span>
                <div className="relative border-b border-neutral-600 pb-3 flex items-center justify-between">
                  <input 
                    type="email" 
                    placeholder="TU EMAIL AQUÍ" 
                    className="bg-transparent border-none outline-none font-sans font-bold text-sm text-white placeholder-neutral-500 w-full uppercase focus:ring-0 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => alert("¡Gracias por suscribirte a Andante!")}
                    className="p-1 text-[#D4F334] hover:text-[#C2E02E] font-bold text-lg cursor-pointer"
                  >
                    ↗
                  </button>
                </div>
                <div className="flex gap-6 text-[10px] font-mono text-neutral-400 justify-end pt-2">
                  <a href="#instagram" className="hover:text-white transition-colors">INSTAGRAM</a>
                  <a href="#twitter" className="hover:text-white transition-colors">TWITTER</a>
                  <a href="#behance" className="hover:text-white transition-colors">BEHANCE</a>
                </div>
              </div>
            </div>

            {/* Middle Row: Links Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Explora</h4>
                <ul className="space-y-2 text-sm text-neutral-300 font-medium">
                  <li><button onClick={() => setView('exhibition')} className="hover:text-white transition-colors">Galería</button></li>
                  <li><button onClick={() => setView('landing')} className="hover:text-white transition-colors">Artistas</button></li>
                  <li><button onClick={() => setView('landing')} className="hover:text-white transition-colors">Eventos</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Únete</h4>
                <ul className="space-y-2 text-sm text-neutral-300 font-medium">
                  <li><a href="#portales" className="hover:text-white transition-colors">Portales</a></li>
                  <li><a href="#espacios" className="hover:text-white transition-colors">Espacios</a></li>
                  <li><a href="#prensa" className="hover:text-white transition-colors">Prensa</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Legal</h4>
                <ul className="space-y-2 text-sm text-neutral-300 font-medium">
                  <li><button onClick={() => setShowManifesto(true)} className="hover:text-white transition-colors">Términos</button></li>
                  <li><button onClick={() => setShowManifesto(true)} className="hover:text-white transition-colors">Privacidad</button></li>
                  <li><button onClick={() => setShowManifesto(true)} className="hover:text-white transition-colors">Cookies</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Contacto</h4>
                <ul className="space-y-2 text-sm text-neutral-300 font-medium">
                  <li><a href="mailto:hola@andante.art" className="hover:text-white transition-colors text-xs">hola@andante.art</a></li>
                  <li><a href="tel:+34900080808" className="hover:text-white transition-colors text-xs">+34 900 080 808</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Row: Disclaimer */}
            <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500">
              <span>© 2026 ANDANTE ITINERANT GALLERY</span>
              <span className="font-mono">HECHO CON CALMA :)</span>
            </div>

          </div>
          </div>
        </footer>
      )}

      {/* 5. Floating Action Strip helper for mobile screens */}
      {currentView !== 'checkout' && currentView !== 'cart' && currentView !== 'success' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-t border-[#E6E6E6] dark:border-[#333333] px-4 py-3.5 flex justify-around select-none">
          <button
            onClick={() => setView('landing')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${currentView === 'landing' ? 'text-[#0084FF] dark:text-[#3D9DFF]' : 'text-[#8A8A8A]'}`}
          >
            <span>Inicio</span>
          </button>
          <button
            onClick={() => setView('exhibition')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${currentView === 'exhibition' ? 'text-[#0084FF] dark:text-[#3D9DFF]' : 'text-[#8A8A8A]'}`}
          >
            <span>Exhibición</span>
          </button>
          <button
            onClick={() => setView('cart')}
            className={`relative flex flex-col items-center gap-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${currentView === 'cart' ? 'text-[#0084FF] dark:text-[#3D9DFF]' : 'text-[#8A8A8A]'}`}
          >
            <span>Selección</span>
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 h-3.5 w-3.5 bg-[#0084FF] text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* 6. MODAL DETAIL OVERLAY: Artwork Dossier specifications panel */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkDetailModal
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
            onAddToCart={(art) => {
              handleAddToCart(art);
            }}
            onRemoveFromCart={(artId) => {
              handleRemoveFromCart(artId);
            }}
            onCheckoutDirectly={(art) => {
              handleAddToCart(art);
              setSelectedArtwork(null);
              setView('checkout');
            }}
            isInCart={isSelectedArtworkInCart}
          />
        )}
      </AnimatePresence>

      {/* 7. MODAL OVERLAY: Cultural Declarations Manifesto detailed pop-up */}
      <AnimatePresence>
        {showManifesto && (
          <div className="fixed inset-0 z-55 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowManifesto(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-2xl bg-white dark:bg-[#1F1F1F] border border-[#E6E6E6] dark:border-[#333333] p-6 sm:p-10 rounded-2xl shadow-xl z-10 max-h-[85vh] overflow-y-auto transition-colors"
            >
              <div className="flex items-start justify-between border-b border-[#E6E6E6] dark:border-[#333333] pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-[#0084FF] dark:text-[#3D9DFF] uppercase font-bold tracking-wider block">
                    MANIFIESTO CULTURAL
                  </span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#333333] dark:text-[#F2F2F2] mt-1 tracking-tight">
                    — Declaración de Principios
                  </h3>
                </div>
                <button
                  onClick={() => setShowManifesto(false)}
                  className="p-1.5 hover:bg-[#F2F2F2] dark:hover:bg-[#242424] text-[#333333] dark:text-[#F2F2F2] rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Substantive editorial core readings */}
              <div className="font-sans text-sm sm:text-base text-[#5C5C5C] dark:text-[#B8B8B8] leading-relaxed space-y-5 antialiased">
                {MANIFIESTO.trim().split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 border-t border-[#E6E6E6] dark:border-[#333333] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[9px] text-[#8A8A8A]">
                <span className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkles className="h-4.5 w-4.5 text-[#D4F334]" />
                  Dirección Colegiada, Andante Lab 2026
                </span>
                <button
                  type="button"
                  onClick={() => setShowManifesto(false)}
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#0084FF] hover:bg-[#006FD6] dark:bg-[#3D9DFF] text-white font-sans font-bold uppercase tracking-wider rounded-md text-xs cursor-pointer"
                >
                  Entendido, cerrar manifiesto
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </ClickSpark>
  );
}
