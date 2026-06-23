import { Trash, ArrowLeft, ArrowRight, ShieldCheck, Truck, ArrowClockwise, Smiley } from '@phosphor-icons/react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface CartViewProps {
  cart: CartItem[];
  onRemoveItem: (artworkId: string) => void;
  onClearCart: () => void;
  setView: (view: string) => void;
}

export default function CartView({
  cart,
  onRemoveItem,
  setView,
}: CartViewProps) {
  
  // Calculate total price structure
  const subtotal = cart.reduce((total, item) => total + item.artwork.price * item.quantity, 0);
  
  // Custom insured packaging and logistics fee per design system rules ($50 MXN)
  const shippingFee = subtotal > 0 ? 50 : 0;
  const totalVal = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in max-w-xl mx-auto py-20 px-4 text-center">
        <div className="inline-flex p-5 rounded-full bg-elevated dark:bg-elevated border border-border text-fg-muted mb-6 shadow-sm">
          <Trash className="h-10 w-10" weight="light" />
        </div>
        <h2 className="font-sans font-bold text-3xl text-fg tracking-tight">
          Tu Selección está vacía.
        </h2>
        <p className="font-sans text-sm text-fg-secondary mt-4 leading-relaxed max-w-sm mx-auto">
          ¿Aún no has encontrado una obra original que dialogue con tu mirada? Recorre la muestra activa y añade una de nuestras piezas únicas.
        </p>
        <button
          onClick={() => setView('exhibition')}
          className="mt-8 bg-accent hover:bg-accent-hover dark:hover:bg-accent text-on-accent font-sans font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-md shadow-md transition-all cursor-pointer"
        >
          Explorar sala activa
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-canvas transition-colors duration-400">
      
      {/* HEADER INDEX STEPS */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-widest text-accent font-bold block mb-1 uppercase">
          PASO 01 / 02
        </span>
        <h1 className="font-sans font-bold text-3xl sm:text-4xl text-fg tracking-tight">
          Tu Selección (Bolsa de Obra)
        </h1>
        <p className="text-xs text-fg-secondary font-mono mt-1">
          Valida los detalles de adquisición de tu pieza de arte original y continúa al checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Curated selected items */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-[10px] font-mono tracking-wider text-fg-muted block mb-2 uppercase font-bold">
            — PIEZAS SELECCIONADAS
          </span>

          {cart.map((item) => (
            <div
              key={item.artwork.id}
              className="bg-elevated dark:bg-elevated border border-border rounded-2xl p-5 flex gap-4 sm:gap-6 items-center transition-colors shadow-sm"
            >
              {/* Thumbnail of art block */}
              <img
                src={item.artwork.image}
                alt={item.artwork.title}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-border flex-shrink-0 bg-surface-raised"
              />

              {/* Text specifics */}
              <div className="flex-grow flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider block font-bold">
                      {item.artwork.artistName}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.artwork.id)}
                      className="p-1.5 text-fg-secondary hover:text-error rounded-full hover:bg-neutral-200 dark:hover:bg-border transition-colors focus:outline-none flex-shrink-0 cursor-pointer"
                      title="Quitar de mi selección"
                    >
                      <Trash className="h-4.5 w-4.5" />
                    </button>
                  </div>
                  
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-fg truncate pr-4 mt-0.5">
                    {item.artwork.title}
                  </h3>
                  
                  <p className="text-[10px] text-fg-secondary font-mono mt-1">
                    {item.artwork.medium}
                  </p>
                  <p className="text-[10px] text-fg-muted font-mono mt-0.5">
                    {item.artwork.dimensions} • Original de Autor
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border mt-4 pt-3">
                  <span className="bg-canvas border border-border text-[9px] text-fg-secondary rounded px-2.5 py-0.5 font-mono font-bold uppercase tracking-wider">
                    Cantidad: {item.quantity} (Pieza Única)
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-fg">
                    {formatPrice(item.artwork.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Return anchor link */}
          <button
            onClick={() => setView('exhibition')}
            className="inline-flex items-center text-xs font-mono text-accent hover:underline font-bold mt-4 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            <span>Seguir recorriendo la sala</span>
          </button>
        </div>

        {/* Right Column: Pricing details summary */}
        <div className="lg:col-span-5 bg-elevated dark:bg-elevated border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <span className="text-[10px] font-mono tracking-wider text-fg-muted block mb-6 uppercase font-bold">
            — RESUMEN DE ADQUISICIÓN
          </span>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-mono text-fg-secondary">
              <span>Valor total de la obra</span>
              <span className="font-bold text-fg">{formatPrice(subtotal)}</span>
            </div>
            
            <div className="flex justify-between text-xs font-mono text-fg-secondary">
              <span className="flex items-center">
                <Truck className="h-4 w-4 mr-1 text-accent" />
                <span>Embalaje Especial Asegurado</span>
              </span>
              <span className="font-bold text-fg">{formatPrice(shippingFee)}</span>
            </div>

            <hr className="border-border" />

            <div className="flex justify-between text-sm font-mono text-fg pt-2 pb-6 items-baseline">
              <span className="font-bold">Monto Total</span>
              <span className="text-xl sm:text-2xl font-bold">{formatPrice(totalVal)}</span>
            </div>
          </div>

          <button
            onClick={() => setView('checkout')}
            id="proceed-to-checkout"
            className="w-full bg-accent hover:bg-accent-hover dark:hover:bg-accent text-on-accent font-sans font-semibold text-xs uppercase tracking-wider py-4 rounded-md transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Paso 2: Continuar al Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Guarantee Badges panel with responsive design details */}
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono text-fg font-bold uppercase leading-none">
                  Firma de Autor Homologada
                </p>
                <p className="text-[10px] text-fg-secondary mt-1.5 leading-relaxed font-sans">
                  Todas las adquisiciones en Andante cuidan a los autores locales, asegurándoles la correspondencia directa del canon de curaduría.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-border/60 dark:border-border/50 pt-4">
              <ArrowClockwise className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono text-fg font-bold uppercase leading-none">
                  Logística y Despacho Físico
                </p>
                <p className="text-[10px] text-fg-secondary mt-1.5 leading-relaxed font-sans">
                  Ofrecemos resguardo de transporte total ante eventualidades puerta a puerta o programando recogida directa en las sedes.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
