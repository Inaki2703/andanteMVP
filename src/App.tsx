import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, ShieldWarning, Heart, Question, Sparkle } from '@phosphor-icons/react';

// Shared imports
import { Artwork, CartItem, ShippingInfo, PaymentInfo } from './types';
import { ARTWORKS_DATA, ARTISTS_DATA, MANIFIESTO } from './data';

// Component imports
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import LandingView from './components/LandingView';
import ExhibitionView from './components/ExhibitionView';
import ArtistDetailModal from './components/ArtistDetailModal';
import ArtworkDetailModal from './components/ArtworkDetailModal';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import SuccessView from './components/SuccessView';
import ClickSpark from './components/ClickSpark';
import SiteFooter from './components/SiteFooter';
import { absTop, setupSectionPager } from './utils/sectionPager';

export default function App() {
  // Navigation structure
  const [currentView, setView] = useState<string>('landing');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showManifesto, setShowManifesto] = useState<boolean>(false);

  // Artista seleccionado para el pop-up de semblanza (por id, disponible en cualquier vista).
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const handleSelectArtist = (artistId: string) => {
    // Abre la semblanza como pop-up encima de la vista actual (sin cambiar de ruta).
    setSelectedArtistId(artistId);
    setMenuOpen(false);
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

  // ── Pager por secciones (landing + exposición) ─────────────────────────────
  useEffect(() => {
    if (currentView !== 'landing' && currentView !== 'exhibition') return;
    if (menuOpen || showManifesto || selectedArtwork) return;

    if (currentView === 'landing') {
      return setupSectionPager({
        getSections: () => Array.from(document.querySelectorAll<HTMLElement>('.snap-section')),
        pageRef,
        enableWrap: true,
      });
    }

    return setupSectionPager({
      getSections: () =>
        Array.from(document.querySelectorAll<HTMLElement>('.exhibition-snap-section')),
      pageRef,
      enableWrap: false,
      wrapForward: true,
      loopUpAtTop: true,
      wrapForwardCloneSource: () =>
        document.querySelector<HTMLElement>('[data-exhibition-top]'),
      shouldIntercept: () => {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>('.exhibition-snap-section')
        );
        if (sections.length === 0) return false;
        const firstTop = absTop(sections[0]!);
        const last = sections[sections.length - 1]!;
        const lastBottom = absTop(last) + last.offsetHeight;
        // Solo paginar cuando el centro del viewport ya entró a la zona snap.
        // Arriba (hero con cards) y abajo queda el scroll nativo libre.
        const center = window.scrollY + window.innerHeight / 2;
        return center > firstTop && center < lastBottom;
      },
    });
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
    <div ref={pageRef} className="flex flex-col min-h-screen bg-page grid-dot-pattern text-fg font-sans tracking-normal relative md:pb-0 pb-16 transition-colors duration-400">

      {/* Skip link — primer elemento enfocable (WCAG 2.4.1) */}
      <a href="#main" className="skip-link">Saltar al contenido</a>

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
      <main id="main" className="flex-grow">
        {currentView === 'landing' && (
          <LandingView
            setView={setView}
            onSelectArtist={handleSelectArtist}
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

      {/* 4. Footer editorial compartido (Home + Exposición) */}
      {(currentView === 'landing' || currentView === 'exhibition') && (
        <SiteFooter variant={currentView === 'landing' ? 'home' : 'exhibition'} />
      )}

      {/* 5. Floating Action Strip helper for mobile screens */}
      {currentView !== 'checkout' && currentView !== 'cart' && currentView !== 'success' && (
        <nav
          aria-label="Navegación principal"
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-canvas/90 backdrop-blur-md border-t border-border px-4 py-3.5 flex justify-around select-none"
        >
          <button
            onClick={() => setView('landing')}
            aria-current={currentView === 'landing' ? 'page' : undefined}
            className={`focus-ring flex flex-col items-center gap-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${currentView === 'landing' ? 'text-accent' : 'text-fg-muted'}`}
          >
            <span>Inicio</span>
          </button>
          <button
            onClick={() => setView('exhibition')}
            aria-current={currentView === 'exhibition' ? 'page' : undefined}
            className={`focus-ring flex flex-col items-center gap-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${currentView === 'exhibition' ? 'text-accent' : 'text-fg-muted'}`}
          >
            <span>Exhibición</span>
          </button>
          <button
            onClick={() => setView('cart')}
            aria-current={currentView === 'cart' ? 'page' : undefined}
            className={`focus-ring relative flex flex-col items-center gap-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${currentView === 'cart' ? 'text-accent' : 'text-fg-muted'}`}
          >
            <span>Selección</span>
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 h-3.5 w-3.5 bg-accent text-on-accent text-[8px] font-bold flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </nav>
      )}

      {/* MODAL OVERLAY: Semblanza del artista (pop-up) */}
      <AnimatePresence>
        {selectedArtistId && (() => {
          const artist = ARTISTS_DATA.find((a) => a.id === selectedArtistId);
          if (!artist) return null;
          return (
            <ArtistDetailModal
              artist={artist}
              onClose={() => setSelectedArtistId(null)}
            />
          );
        })()}
      </AnimatePresence>

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
              className="relative max-w-2xl bg-surface-raised border border-border p-6 sm:p-10 rounded-2xl shadow-xl z-10 max-h-[85vh] overflow-y-auto transition-colors"
            >
              <div className="flex items-start justify-between border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-wider block">
                    MANIFIESTO CULTURAL
                  </span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-fg mt-1 tracking-tight">
                    — Declaración de Principios
                  </h3>
                </div>
                <button
                  onClick={() => setShowManifesto(false)}
                  aria-label="Cerrar manifiesto"
                  className="focus-ring p-1.5 hover:bg-elevated text-fg rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Substantive editorial core readings */}
              <div className="font-sans text-sm sm:text-base text-fg-secondary leading-relaxed space-y-5 antialiased">
                {MANIFIESTO.trim().split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[9px] text-fg-muted">
                <span className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkle className="h-4.5 w-4.5 text-brand" />
                  Dirección Colegiada, Andante Lab 2026
                </span>
                <button
                  type="button"
                  onClick={() => setShowManifesto(false)}
                  className="focus-ring w-full sm:w-auto px-5 py-3.5 bg-accent hover:bg-accent-hover text-on-accent font-sans font-bold uppercase tracking-wider rounded-md text-xs cursor-pointer"
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
