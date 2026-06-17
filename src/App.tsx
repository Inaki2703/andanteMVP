import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, ShieldAlert, Heart, HelpCircle, Sparkles } from 'lucide-react';

// Shared imports
import { Artwork, CartItem, ShippingInfo, PaymentInfo } from './types';
import { ARTWORKS_DATA, MANIFIESTO } from './data';

// Component imports
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import LandingView from './components/LandingView';
import ExhibitionView from './components/ExhibitionView';
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

  // Theme support
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Dynamic products catalog state
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS_DATA);

  // Selector / Cart selection states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Checkout order states
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'sede'>('domicilio');
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);

  // Synchronize dynamic client theme classes with the document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Page title syncer
  useEffect(() => {
    document.title = "Andante — Galería Itinerante Digital";
  }, []);

  // Sync scroll on navigating
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
    <div className="flex flex-col min-h-screen bg-[#F5F5F3] dark:bg-[#0E0E0E] grid-dot-pattern text-[#333333] dark:text-[#F2F2F2] font-sans tracking-normal relative md:pb-0 pb-16 transition-colors duration-400">
      
      {/* 1. Header Area with dynamic dark status */}
      {currentView !== 'checkout' && currentView !== 'cart' && currentView !== 'exhibition' && currentView !== 'success' && (
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

      {/* 4. Elegant Editorial Footer (Design System v3.0 standard) */}
      {currentView !== 'checkout' && currentView !== 'cart' && currentView !== 'success' && (
        <footer className="bg-[#222222] text-[#F2F2F2] py-20 px-4 sm:px-6 lg:px-8 text-xs font-sans flex-shrink-0 transition-colors duration-400 shadow-inner">
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
