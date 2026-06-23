import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Truck, MapPin, CheckCircle, Trash, ArrowClockwise } from '@phosphor-icons/react';
import { Artwork, CartItem, ShippingInfo, PaymentInfo } from '../types';
import EmptySelectionView from './EmptySelectionView';
import { formatPrice } from '../utils/formatPrice';

interface CheckoutViewProps {
  cart: CartItem[];
  artworks: Artwork[];
  onRemoveItem: (artworkId: string) => void;
  setView: (view: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onSubmitOrder: (shipping: ShippingInfo, payment: PaymentInfo, deliveryMethod: 'domicilio' | 'sede') => void;
}

export default function CheckoutView({
  cart,
  artworks,
  onRemoveItem,
  setView,
  onSelectArtwork,
  onSubmitOrder
}: CheckoutViewProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'sede'>('domicilio');

  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'España',
    notes: ''
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Autofill utility based directly on reference image schema
  const fillSampleData = () => {
    setShipping({
      fullName: 'Alejandro Sanz',
      email: 'alejandro@correo.com',
      phone: '+34 622 881 902',
      address: 'Calle Velázquez 41, Piso 2D',
      city: 'Madrid',
      zipCode: '28001',
      country: 'España',
      notes: 'Entregar en mano embalado con extrema curaduría'
    });
    setPayment({
      cardNumber: '4532 9845 2212 8820',
      cardName: 'Alejandro Sanz',
      expiryDate: '11/28',
      cvv: '882'
    });
    setFormErrors({});
  };

  // Pricing calculations
  const subtotal = cart.reduce((total, item) => total + item.artwork.price * item.quantity, 0);
  const totalVal = subtotal;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    setPayment({ ...payment, cardNumber: value.slice(0, 19) });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setPayment({ ...payment, expiryDate: value.slice(0, 5) });
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPayment({ ...payment, cvv: value.slice(0, 3) });
  };

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!shipping.fullName.trim()) {
      errors.fullName = 'Nombre obligatorio';
    }
    if (!shipping.email.trim() || !shipping.email.includes('@')) {
      errors.email = 'Email inválido';
    }
    
    if (deliveryMethod === 'domicilio') {
      if (!shipping.address.trim()) {
        errors.address = 'Dirección obligatoria';
      }
      if (!shipping.city.trim()) {
        errors.city = 'Ciudad obligatoria';
      }
    }

    const cleanCard = payment.cardNumber.replace(/\s/g, '');
    if (!payment.cardNumber.trim() || cleanCard.length < 15) {
      errors.cardNumber = 'Tarjeta inválida';
    }
    if (!payment.expiryDate.trim() || !payment.expiryDate.includes('/')) {
      errors.expiryDate = 'Requerido (MM/AA)';
    }
    if (!payment.cvv.trim() || payment.cvv.length < 3) {
      errors.cvv = 'CVC/CVV requerido';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitOrder(shipping, payment, deliveryMethod);
    }, 1500);
  };

  // Field renderer with exact custom border/padding sizes to maximize vertical budget
  const renderField = (
    label: string,
    id: string,
    value: string,
    placeholder: string,
    onChange: (val: string) => void,
    type: string = 'text'
  ) => {
    return (
      <div className="bg-input dark:bg-canvas rounded-xl px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-accent/20 border border-neutral-200/60 dark:border-neutral-800 text-left">
        <label htmlFor={id} className="text-[9px] sm:text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase font-black tracking-wider block">
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            if (formErrors[id]) {
              setFormErrors((prev) => {
                const next = { ...prev };
                delete next[id];
                return next;
              });
            }
          }}
          className="w-full bg-transparent border-none outline-none font-sans text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100 p-0 mt-0.5 focus:ring-0 focus:outline-none"
        />
      </div>
    );
  };

  const isEmpty = cart.length === 0;

  return (
    <div
      className={
        isEmpty
          ? 'viewport-fit max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 h-[100dvh] min-h-[100dvh] flex flex-col overflow-hidden text-neutral-850 dark:text-neutral-200'
          : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-neutral-850 dark:text-neutral-200 lg:h-[calc(100vh-60px)] lg:max-h-[900px] flex flex-col justify-between overflow-hidden'
      }
    >
      
      {/* Editorial breadcrumb back text on top left */}
      <div className="flex-shrink-0">
        <button
          onClick={() => setView('exhibition')}
          className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-black text-neutral-500 dark:text-neutral-400 hover:text-accent uppercase tracking-widest pb-3 sm:pb-4 transition-colors cursor-pointer select-none"
        >
          <span>←</span>
          <span>VOLVER A CATÁLOGO</span>
        </button>
      </div>

      {isEmpty ? (
        <EmptySelectionView
          artworks={artworks}
          setView={setView}
          onSelectArtwork={onSelectArtwork}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:overflow-hidden flex-grow relative pb-2">
        
        {/* Left Column: Form inside a beautiful SOLID highly accessible white container */}
        <div id="checkout-form-container" className="lg:col-span-7 flex flex-col h-full bg-transparent lg:overflow-y-auto pr-0 lg:pr-2 pb-4">
          
          <form onSubmit={validateForm} className="space-y-4">
            
            {/* Header row with Title and Autorellenar button */}
            <div className="flex items-center justify-between gap-4 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-3">
              <div>
                <h1 className="font-sans font-black text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-snug uppercase leading-none">
                  ADQUISICIÓN SEGURA
                </h1>
                <p className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 font-extrabold uppercase mt-1 tracking-wider">
                  {deliveryMethod === 'domicilio' ? 'EMBALAJE DE MUSEO • TRANSPORTE ESPECIALIZADO' : 'RECOGIDA REGISTRADA EN SEDE ACTIVA'}
                </p>
              </div>

              <button
                type="button"
                onClick={fillSampleData}
                className="bg-brand-soft hover:bg-brand-soft-hover text-brand-soft-text dark:bg-brand-soft dark:text-brand-soft-text font-mono text-[9px] font-black tracking-widest px-3.5 py-1.5 rounded-lg transition-all shadow-xs uppercase select-none border border-transparent whitespace-nowrap cursor-pointer hover:scale-[1.02]"
              >
                AUTORELLENAR
              </button>
            </div>

            {/* Form Error alert if validation triggers */}
            {Object.keys(formErrors).length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-xl text-[10px] font-mono text-red-500 space-y-1">
                <p className="font-black text-xs uppercase tracking-wider">⚠️ REVISA LAS SECCIONES SEÑALADAS EN ROJO</p>
                <p className="text-[10px] sm:text-xs">Por favor, completa correctamente todos los datos requeridos en el formulario para procesar tu adquisición de forma segura.</p>
              </div>
            )}

            {/* FORM CONTAINER - Solid white card maximizing contrast and accessibility */}
            <div className="bg-white dark:bg-deep border border-neutral-200 dark:border-neutral-800/80 rounded-[24px] p-4 sm:p-5.5 shadow-sm space-y-4">
              
              {/* 1. CONTACTO & FACTURACIÓN */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className={`text-[9px] font-mono tracking-widest font-black uppercase block ${
                    (formErrors.fullName || formErrors.email)
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}>
                    CONTACTO & FACTURACIÓN
                  </span>
                  {(formErrors.fullName || formErrors.email) && (
                    <span className="text-[10px] font-sans text-red-500 dark:text-red-400 font-bold tracking-wide">
                      Necesitas agregar la información solicitada
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {renderField(
                    'Nombre Completo *',
                    'fullName',
                    shipping.fullName,
                    'Ej: Alejandro Sanz',
                    (val) => setShipping({ ...shipping, fullName: val })
                  )}

                  {renderField(
                    'Correo Electrónico *',
                    'email',
                    shipping.email,
                    'alejandro@correo.com',
                    (val) => setShipping({ ...shipping, email: val }),
                    'email'
                  )}
                </div>
              </div>

              {/* 2. DIRECCIÓN DE DESPACHO / SCENARIO SELECTION */}
              <div className="space-y-2">
                
                {/* Scenario Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                    <span className={`text-[9px] font-mono tracking-widest font-black uppercase ${
                      (deliveryMethod === 'domicilio' && (formErrors.address || formErrors.city))
                        ? 'text-red-500 dark:text-red-400'
                        : 'text-neutral-400 dark:text-neutral-500'
                    }`}>
                      OPCIÓN DE ENTREGA
                    </span>
                    {(deliveryMethod === 'domicilio' && (formErrors.address || formErrors.city)) && (
                      <span className="text-[10px] font-sans text-red-500 dark:text-red-400 font-bold tracking-wide">
                        — Necesitas agregar la información solicitada
                      </span>
                    )}
                  </div>
                  
                  {/* Clean Segmented Control Switch */}
                  <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-0.5 rounded-lg flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('domicilio')}
                      className={`px-2.5 py-1 text-[8.5px] font-mono uppercase font-black tracking-wider rounded-md transition-all cursor-pointer ${
                        deliveryMethod === 'domicilio'
                          ? 'bg-white dark:bg-tab text-accent shadow-xs border border-neutral-200/20'
                          : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                      }`}
                    >
                      Domicilio
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('sede')}
                      className={`px-2.5 py-1 text-[8.5px] font-mono uppercase font-black tracking-wider rounded-md transition-all cursor-pointer ${
                        deliveryMethod === 'sede'
                          ? 'bg-white dark:bg-tab text-accent shadow-xs border border-neutral-200/20'
                          : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                      }`}
                    >
                      Pasar por ella
                    </button>
                  </div>
                </div>
                
                {deliveryMethod === 'domicilio' ? (
                  <div className="space-y-2.5">
                    {renderField(
                      'Dirección de Despacho *',
                      'address',
                      shipping.address,
                      'Calle Velázquez 41, Piso 2D',
                      (val) => setShipping({ ...shipping, address: val })
                    )}

                    <div className="grid grid-cols-2 gap-2.5">
                      {renderField(
                        'Ciudad *',
                        'city',
                        shipping.city,
                        'Madrid',
                        (val) => setShipping({ ...shipping, city: val })
                      )}

                      {renderField(
                        'País *',
                        'country',
                        shipping.country,
                        'España',
                        (val) => setShipping({ ...shipping, country: val })
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-brand-soft/20 dark:bg-brand-soft/10 border border-brand/20 rounded-[16px] p-3 flex gap-2.5 items-start text-left select-none">
                    <MapPin className="h-4.5 w-4.5 text-brand-soft-text flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h5 className="font-sans font-extrabold text-[11px] text-neutral-800 dark:text-brand-soft">RECOGIDA CON CORTESÍA EN EXPO</h5>
                      <p className="text-[10px] font-sans text-neutral-500 dark:text-neutral-400 leading-snug">
                        La pieza permanecerá colgada de manera segura hasta la clausura de la exposición actual en <strong>Café Norte (Sala Central)</strong>. Podrás retirar tu obra embalada sin ningún coste de logística.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. INFORMACIÓN DE PAGO (SSL SEGURO) */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className={`text-[9px] font-mono tracking-widest font-black uppercase block ${
                    (formErrors.cardNumber || formErrors.expiryDate || formErrors.cvv)
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}>
                    INFORMACIÓN DE PAGO (SSL SEGURO)
                  </span>
                  {(formErrors.cardNumber || formErrors.expiryDate || formErrors.cvv) && (
                    <span className="text-[10px] font-sans text-red-500 dark:text-red-400 font-bold tracking-wide">
                      Necesitas agregar la información solicitada
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <div className="sm:col-span-6">
                    <div className="bg-input dark:bg-canvas rounded-xl px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-accent/20 border border-neutral-200/60 dark:border-neutral-800 text-left">
                      <label htmlFor="cardNumberInput" className="text-[9px] sm:text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase font-black tracking-wider block">
                        Número de Tarjeta *
                      </label>
                      <input
                        id="cardNumberInput"
                        type="text"
                        value={payment.cardNumber}
                        placeholder="4532 •••• •••• 8820"
                        onChange={(e) => {
                          handleCardNumberChange(e);
                          if (formErrors.cardNumber) {
                            setFormErrors((prev) => {
                              const next = { ...prev };
                              delete next.cardNumber;
                              return next;
                            });
                          }
                        }}
                        className="w-full bg-transparent border-none outline-none font-sans text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100 p-0 mt-0.5 focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="bg-input dark:bg-canvas rounded-xl px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-accent/20 border border-neutral-200/60 dark:border-neutral-800 text-left">
                      <label htmlFor="expiryInput" className="text-[9px] sm:text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase font-black tracking-wider block">
                        Expiración *
                      </label>
                      <input
                        id="expiryInput"
                        type="text"
                        value={payment.expiryDate}
                        placeholder="MM/AA"
                        onChange={(e) => {
                          handleExpiryChange(e);
                          if (formErrors.expiryDate) {
                            setFormErrors((prev) => {
                              const next = { ...prev };
                              delete next.expiryDate;
                              return next;
                            });
                          }
                        }}
                        className="w-full bg-transparent border-none outline-none font-sans text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100 p-0 mt-0.5 focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="bg-input dark:bg-canvas rounded-xl px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-accent/20 border border-neutral-200/60 dark:border-neutral-800 text-left">
                      <label htmlFor="cvvInput" className="text-[9px] sm:text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase font-black tracking-wider block">
                        CVC/CVV *
                      </label>
                      <input
                        id="cvvInput"
                        type="password"
                        value={payment.cvv}
                        placeholder="•••"
                        onChange={(e) => {
                          handleCVVChange(e);
                          if (formErrors.cvv) {
                            setFormErrors((prev) => {
                              const next = { ...prev };
                              delete next.cvv;
                              return next;
                            });
                          }
                        }}
                        className="w-full bg-transparent border-none outline-none font-sans text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100 p-0 mt-0.5 focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Submit Action button matching image reference precisely */}
            <div className="pt-1.5 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-accent hover:bg-accent-hover active:scale-[0.99] text-white font-sans text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all duration-150 shadow-md flex items-center justify-center space-x-2 border border-white/5 cursor-pointer select-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>CONECTANDO CON GATEWAY SEGURO...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 stroke-[2.5]" />
                    <span>Firmar y Adquirir Obra • {formatPrice(totalVal)}</span>
                  </>
                )}
              </button>

              {/* Secure footnotes labels */}
              <div className="flex items-center justify-center gap-5 pt-0.5 text-[8.5px] font-mono font-bold text-neutral-450 uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  🛡️ Encriptación AES-256
                </span>
                <span className="flex items-center gap-1">
                  🔒 Andante Secure Gateway
                </span>
              </div>
            </div>

            {/* Conserva los disclaimers de Firma y Logística - Rendered Beautifully inside form stack at bottom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 border-t border-neutral-200/50 dark:border-neutral-800/50 pt-3.5 text-left select-none">
              <div className="flex gap-2.5 items-start">
                <ShieldCheck className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[9px] font-mono font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-wider block leading-none">
                    Firma de Autor Homologada
                  </h4>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed font-sans">
                    Todas las adquisiciones en Andante cuidan a los autores locales, asegurándoles la correspondencia directa del canon de curaduría.
                  </p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start border-t sm:border-t-0 sm:border-l border-neutral-200/50 dark:border-neutral-800/50 pt-3 sm:pt-0 sm:pl-4">
                <ArrowClockwise className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[9px] font-mono font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-wider block leading-none">
                    Logística y Despacho Físico
                  </h4>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed font-sans">
                    Ofrecemos resguardo de transporte total ante eventualidades puerta a puerta o programando recogida directa en las sedes.
                  </p>
                </div>
              </div>
            </div>

          </form>

        </div>

        {/* Right Column: "BOLSA DE ADQUISICIONES" dark mode panel fully replicated & scrollable if overflowing */}
        <div id="checkout-sidebar-container" className="lg:col-span-5 h-full bg-page text-white border border-neutral-800 rounded-[28px] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-5 select-none">
          
          <div className="space-y-5">
            
            {/* Dark heading label block */}
            <div className="border-b border-neutral-800 pb-3">
              <h2 className="font-sans font-black text-base tracking-snug text-white uppercase leading-none">
                BOLSA DE ADQUISICIONES
              </h2>
            </div>

            {/* Selected Active Artwork Listing with TRASH DELETION */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.artwork.id} className="flex gap-3 items-center bg-inset p-2.5 rounded-xl border border-neutral-800/40 relative group">
                  <img
                    src={item.artwork.image}
                    alt={item.artwork.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-lg border border-neutral-800 flex-shrink-0"
                  />
                  
                  <div className="min-w-0 flex-grow text-left">
                    <h3 className="font-sans font-black text-xs text-neutral-150 tracking-tight leading-none uppercase truncate pr-2">
                      {item.artwork.title}
                    </h3>
                    
                    <p className="text-[9px] font-sans text-neutral-400 mt-1 truncate">
                      {item.artwork.artistName} • {item.artwork.year}
                    </p>
                    
                    <p className="text-[8.5px] font-mono text-neutral-500 tracking-wider mt-0.5 truncate">
                      {item.artwork.dimensions}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="font-mono text-xs font-black text-neutral-100 pr-0.5">
                      {formatPrice(item.artwork.price)}
                    </div>
                    {/* Intuitive remove action to handle single step checkout */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.artwork.id)}
                      className="p-1 text-neutral-500 hover:text-red-400 hover:bg-elevated rounded transition-colors cursor-pointer"
                      title="Eliminar de la bolsa"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="text-center py-12 space-y-2">
                  <p className="text-neutral-500 font-mono text-[10px] uppercase font-extrabold tracking-widest">Tu bolsa está vacía</p>
                  <button
                    onClick={() => setView('exhibition')}
                    className="text-brand font-mono text-[9px] uppercase font-bold underline"
                  >
                    Examinar obras
                  </button>
                </div>
              )}
            </div>

            {/* Financial breakdown block exactly matching yellow status tags in reference */}
            <div className="border-t border-neutral-800/80 pt-4 space-y-3 text-xs text-neutral-400 font-mono">
              <div className="flex justify-between items-center text-[11px]">
                <span className="uppercase tracking-wider">Precio Obra</span>
                <span className="font-bold text-neutral-200">{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="uppercase tracking-wider text-[10px]">Embalaje Especializado</span>
                <span className="font-extrabold text-brand tracking-wider uppercase text-[9px]">CORTESÍA</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="uppercase tracking-wider text-[10px]">Seguro de Despacho</span>
                <span className="font-extrabold text-brand tracking-wider uppercase text-[9px]">INCLUIDO</span>
              </div>

              {/* Total final display with large lemon font */}
              <div className="border-t border-neutral-800 pt-3.5 flex justify-between items-baseline text-white">
                <span className="font-sans font-black text-[10px] tracking-widest uppercase">TOTAL ADQUISICIÓN</span>
                <span className="font-mono text-xl font-black text-brand tracking-tight">{formatPrice(totalVal)}</span>
              </div>

            </div>

          </div>

          {/* Guarantee container box with micro frame borders */}
          <div className="bg-panel border border-neutral-800/80 p-3.5 rounded-xl text-left">
            <h4 className="font-mono text-[8px] font-black tracking-widest text-neutral-400 uppercase mb-1.5">
              GARANTÍA COLECCIONISTA
            </h4>
            <p className="font-sans text-[10.5px] text-neutral-400 leading-relaxed antialiased">
              Cada despacho es coordinado directamente por nuestro departamento de logística con agentes autorizados de transporte de objetos de valor. Recibirá llamadas de confirmación previas a la entrega.
            </p>
          </div>

        </div>

      </div>
      )}

    </div>
  );
}
