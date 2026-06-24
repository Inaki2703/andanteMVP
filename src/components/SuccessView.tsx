import { useState } from 'react';
import { ArrowRight, CheckCircle, FileText, DownloadSimple, Copy, ShareNetwork, ShieldWarning, Sparkle, Check } from '@phosphor-icons/react';
import { CartItem, ShippingInfo } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface SuccessViewProps {
  purchasedItems: CartItem[];
  shippingInfo: ShippingInfo | null;
  deliveryMethod: 'domicilio' | 'sede';
  setView: (view: string) => void;
  onClearCart: () => void;
}

export default function SuccessView({
  purchasedItems,
  shippingInfo,
  deliveryMethod,
  setView,
  onClearCart
}: SuccessViewProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [downloadedPdf, setDownloadedPdf] = useState(false);
  const [showCertificate, setShowCertificate] = useState(true); // Open by default for maximum impact

  // Generate unique order ID and cryptographic transaction hashes
  const orderId = `AND-749${Math.floor(100 + Math.random() * 900)}-2026`;
  const cryptoHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  const handleReturnToGallery = () => {
    onClearCart();
    setView('landing');
  };

  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(cryptoHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const copyReceiptLink = () => {
    navigator.clipboard.writeText(`https://andantegaleria.com/recibos/${orderId}`);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const downloadMockPdf = () => {
    setDownloadedPdf(true);
    setTimeout(() => setDownloadedPdf(false), 3000);
  };

  const totalPaid = purchasedItems.reduce((acc, item) => acc + item.artwork.price * item.quantity, 0) + (deliveryMethod === 'domicilio' ? 50 : 0);

  return (
    <div className="animate-fade-in py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8 bg-canvas transition-colors duration-400">
      
      {/* SUCCESS CONFIRMATION HEADER */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4.5 bg-brand text-on-brand rounded-full mb-2 shadow-sm animate-pulse">
          <CheckCircle className="h-10 w-10 stroke-[2]" />
        </div>
        <h1 className="font-sans font-bold text-4xl sm:text-6xl text-fg leading-tight tracking-tight">
          ¡Es tuya!
        </h1>
        <p className="font-sans text-xs sm:text-sm text-fg-secondary leading-relaxed max-w-md mx-auto">
          Adquisición procesada exitosamente. Se ha registrado tu certificado y la obra física ha sido declarada como <span className="font-bold text-accent uppercase tracking-wider text-[11px]">VENDIDA</span> en la red itinerante.
        </p>
      </div>

      {/* CORE ADQUIRED DETAILS PANEL */}
      <div className="bg-elevated dark:bg-elevated border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <span className="text-[10px] font-mono text-fg-muted uppercase leading-none block font-bold">ID DE ADQUISICIÓN</span>
            <span className="font-mono text-sm font-bold text-fg">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-fg-muted uppercase leading-none block font-bold">FECHA REGISTRO</span>
            <span className="font-mono text-sm text-fg">17 Jun, 2026</span>
          </div>
        </div>

        {/* List of items acquired */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-wider text-fg-muted block uppercase font-bold">
            — PIEZA ADQUIRIDA
          </span>
          {purchasedItems.map((item) => (
            <div key={item.artwork.id} className="flex gap-4 sm:gap-6 items-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border border-border rounded-xl overflow-hidden bg-white">
                <img
                  src={item.artwork.image}
                  alt={item.artwork.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale-30"
                />
                <span className="absolute inset-0 bg-fg/80 text-white text-[9px] uppercase font-mono font-bold flex items-center justify-center tracking-wider">
                  VENDIDO
                </span>
              </div>

              <div className="min-w-0 flex-grow">
                <span className="text-[9px] font-mono text-accent uppercase leading-none block font-bold">
                  {item.artwork.artistName}
                </span>
                <h3 className="font-sans font-bold text-base sm:text-lg text-fg truncate mt-0.5">
                  {item.artwork.title}
                </h3>
                <p className="text-[10px] text-fg-secondary font-mono mt-0.5">
                  {item.artwork.medium}
                </p>
              </div>

              <div className="font-mono text-sm sm:text-base font-bold text-fg flex-shrink-0">
                {formatPrice(item.artwork.price)}
              </div>
            </div>
          ))}
        </div>

        {/* Dispatch details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border text-xs text-fg-secondary">
          <div className="space-y-1">
            <h4 className="font-mono text-[10px] font-bold text-fg uppercase tracking-wider mb-2">
              {deliveryMethod === 'domicilio' ? 'Logística de Despacho:' : 'Espacio de Recogida:'}
            </h4>
            {deliveryMethod === 'domicilio' && shippingInfo ? (
              <p className="space-y-1 font-sans">
                <span className="block text-fg font-semibold">Destinatario: {shippingInfo.fullName}</span>
                <span className="block">Dirección: {shippingInfo.address}</span>
                <span className="block">Despacho: {shippingInfo.zipCode}, {shippingInfo.city}</span>
                <span className="block text-fg-muted">Móvil: {shippingInfo.phone}</span>
              </p>
            ) : (
              <p className="space-y-1 font-sans">
                <span className="block text-fg font-semibold">Establecimiento: Café Norte</span>
                <span className="block text-emerald-600 dark:text-emerald-450 font-semibold flex items-center gap-1">
                  Coordinado por curador al culminar show
                </span>
                <span className="block">Ubicación: Calle General Alvear 45</span>
              </p>
            )}
          </div>

          <div className="bg-canvas p-4 border border-border/60 rounded-xl self-start">
            <h4 className="font-mono text-[10px] font-bold text-fg uppercase tracking-wider mb-2">
              Resumen Financiero:
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(totalPaid - (deliveryMethod === 'domicilio' ? 50 : 0))}</span>
              </div>
              <div className="flex justify-between">
                <span>Tránsito Seguro:</span>
                <span>{deliveryMethod === 'domicilio' ? formatPrice(50) : `${formatPrice(0)} (Retiro)`}</span>
              </div>
              <hr className="border-border/80 my-1" />
              <div className="flex justify-between font-bold text-fg">
                <span>Total Abonado:</span>
                <span>{formatPrice(totalPaid)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ACCORDION: CERTIFICATE OF AUTHENTICITY WITH STUNNING EDITORIAL ART */}
      <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setShowCertificate(!showCertificate)}
          aria-expanded={showCertificate}
          className="focus-ring w-full bg-elevated dark:bg-elevated hover:bg-neutral-200 dark:hover:bg-elevated p-5 flex items-center justify-between text-left font-mono text-xs cursor-pointer border-none"
        >
          <div className="flex items-center space-x-3 text-fg">
            <FileText className="h-5 w-5 text-accent stroke-[1.5]" />
            <div>
              <span className="font-bold text-fg block uppercase tracking-wide">Certificación de Autenticidad</span>
              <span className="text-[9px] text-fg-muted font-normal leading-none mt-1 inline-block">
                Proof-of-Art Cryptographic Blockchain Ledger ID
              </span>
            </div>
          </div>
          <span className="text-accent text-xs font-bold hover:underline">
            {showCertificate ? 'Ocultar documento' : 'Visualizar Documento'}
          </span>
        </button>

        {showCertificate && (
          <div className="bg-canvas p-6 sm:p-8 space-y-6 border-t border-border">
            {/* Real aesthetic certificate borders with high visual fidelity and pairing */}
            <div className="border-4 border-double border-border-strong p-6 sm:p-10 bg-canvas dark:bg-surface-raised text-center space-y-6 relative rounded-sm shadow-md">
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-brand text-on-brand text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                <Sparkle className="h-3.5 w-3.5" />
                <span>Original 1/1</span>
              </div>

              {/* Header design detail */}
              <div className="space-y-1.5 text-center pt-2">
                <span className="font-sans font-bold text-3xl text-fg tracking-normal">andante</span>
                <p className="text-[7px] font-mono tracking-[4px] uppercase text-fg-muted block">
                  GALERÍA DIGITAL ITINERANTE DE ARTE LOCAL
                </p>
              </div>

              <div className="w-16 h-[1.5px] bg-accent mx-auto" />

              {/* Title specs */}
              <div className="space-y-2">
                <p className="text-[8px] font-mono text-fg-muted uppercase tracking-widest leading-none">
                  CERTIFICADO COMPLETO DE AUTENTICIDAD Y ORIGEN
                </p>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-fg tracking-tight leading-none italic">
                  "{purchasedItems[0]?.artwork.title}"
                </h3>
                <p className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
                  de: {purchasedItems[0]?.artwork.artistName}
                </p>
              </div>

              {/* Art data values */}
              <div className="max-w-md mx-auto bg-elevated dark:bg-elevated p-4.5 border border-border rounded-xl grid grid-cols-2 gap-4 text-left font-mono text-[9px] text-fg-secondary transition-colors">
                <div>
                  <span className="block text-fg-muted font-bold">MATERIALIDAD</span>
                  <span className="font-bold block truncate text-fg mt-0.5">{purchasedItems[0]?.artwork.medium}</span>
                </div>
                <div>
                  <span className="block text-fg-muted font-bold">DIMENSIONES</span>
                  <span className="font-bold block text-fg mt-0.5">{purchasedItems[0]?.artwork.dimensions}</span>
                </div>
                <div>
                  <span className="block text-fg-muted font-bold">FECHA EDICIÓN</span>
                  <span className="font-bold block text-fg mt-0.5">Año {purchasedItems[0]?.artwork.year}</span>
                </div>
                <div>
                  <span className="block text-fg-muted font-bold">NÚMERO DE EDICIÓN</span>
                  <span className="font-bold block text-fg mt-0.5">Pieza Original Única (1 de 1)</span>
                </div>
              </div>

              {/* Criptographic stamp */}
              <div className="max-w-md mx-auto text-center space-y-1 bg-fg dark:bg-black p-3 rounded-lg border border-neutral-700">
                <span className="text-[7px] font-mono text-brand block uppercase tracking-wider font-bold">
                  HASH CRIPTOGRÁFICO DE REGISTRO UNIFICADO DE ANDANTE LAB
                </span>
                <p className="font-mono text-[8.5px] tracking-wide text-on-inverse truncate max-w-xs mx-auto">
                  {cryptoHash}
                </p>
              </div>

              {/* Autograph and verification */}
              <div className="grid grid-cols-2 gap-8 pt-8 text-[9px] font-mono max-w-sm mx-auto text-center text-fg-secondary">
                <div className="space-y-2">
                  <div className="font-sans font-bold text-xs text-fg select-none italic">
                    {purchasedItems[0]?.artwork.artistName}
                  </div>
                  <hr className="border-border mx-4" />
                  <span className="block uppercase font-bold text-[8px] text-fg-muted">FIRMA AUTOR</span>
                </div>
                <div className="space-y-2">
                  <div className="font-sans font-bold text-xs text-fg select-none italic">
                    andante lab
                  </div>
                  <hr className="border-border mx-4" />
                  <span className="block uppercase font-bold text-[8px] text-fg-muted">VALIDEZ CURATORIAL</span>
                </div>
              </div>

            </div>

            {/* Actions on Certificate */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-xs font-mono text-fg-secondary">
              <button
                type="button"
                onClick={copyHashToClipboard}
                className="focus-ring w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-elevated dark:bg-elevated hover:bg-border dark:hover:bg-border px-4 py-2.5 rounded-lg border border-border transition-colors cursor-pointer"
              >
                <Copy className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>{copiedHash ? '¡Hash copiado!' : 'Copiar Hash de adqusición'}</span>
              </button>

              <button
                type="button"
                className="focus-ring w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-elevated dark:bg-elevated hover:bg-border dark:hover:bg-border px-4 py-2.5 rounded-lg border border-border transition-colors cursor-pointer"
                onClick={downloadMockPdf}
              >
                {downloadedPdf ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>¡PDF Descargado exitosamente!</span>
                  </>
                ) : (
                  <>
                    <DownloadSimple className="h-4 w-4 text-accent" />
                    <span>Descargar PDF Firmado</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}
      </div>

      {/* FOOTER ACTIONS RETURN */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-border pt-8">
        <button
          onClick={copyReceiptLink}
          className="focus-ring text-xs font-mono text-fg-secondary hover:text-accent font-bold flex items-center space-x-1.5 cursor-pointer"
        >
          {copiedReceipt ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              <span>¡Enlace copiado!</span>
            </>
          ) : (
            <>
              <ShareNetwork className="h-4 w-4" />
              <span>Compartir mi adquisición</span>
            </>
          )}
        </button>

        <button
          onClick={handleReturnToGallery}
          className="focus-ring w-full sm:w-auto bg-accent hover:bg-accent-hover dark:hover:bg-accent text-on-accent font-sans font-semibold text-xs uppercase tracking-wider px-8 py-4.5 rounded-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Regresar a la Galería</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

    </div>
  );
}
