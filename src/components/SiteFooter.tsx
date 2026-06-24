import { Fragment } from 'react';
import ScrollFloatText from './ScrollFloatText';

const HOME_VALUE_PROPS = [
  { t: 'Curaduría con criterio', d: 'Seleccionamos cada pieza para que cuente una historia real.' },
  { t: 'Envío y enmarcado claros', d: 'Todo listo para colgar. Sin sorpresas logísticas.' },
  { t: 'Pago seguro', d: 'Transacciones encriptadas y múltiples métodos de pago.' },
  { t: 'Comisión justa', d: 'Apoyamos directamente a los artistas sin sobreprecios ocultos.' },
];

const EXHIBITION_VALUE_PROPS = [
  {
    t: 'Garantía de Coleccionista Andante',
    d: 'Todas las obras de la colección son piezas únicas respaldadas por un certificado de autenticidad firmado por el autor y su respectivo registro inalterable.',
  },
  {
    t: 'Sostén del Ecosistema',
    d: 'El 85% de los fondos de venta se depositan de manera directa al autor, impulsando e impactando directamente en su taller y labor creativa de producción.',
  },
];

interface SiteFooterProps {
  variant: 'home' | 'exhibition';
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-neutral-700 p-4 flex flex-col gap-3 flex-1 min-w-0">
      <h3 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-on-inverse leading-snug">
        {title}
      </h3>
      <p className="text-[11px] sm:text-[13px] text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}

function BrandParagraph() {
  return (
    <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-neutral-300 leading-relaxed max-w-[520px]">
      Un proyecto sobre la descentralización del arte. Curamos espacios físicos, articulando miradas, cultura local y obras originales de creadores independientes.
    </p>
  );
}

function SubscriptionBlock() {
  return (
    <div className="space-y-4 w-full max-w-[400px] lg:justify-self-end">
      <span className="text-[10px] font-mono tracking-widest text-brand font-bold block uppercase text-right">
        Suscripción
      </span>
      <div className="relative border-b border-neutral-600 pb-3 flex items-center justify-between">
        <input
          type="email"
          placeholder="TU EMAIL AQUÍ"
          className="bg-transparent border-none outline-none font-sans font-bold text-sm text-on-inverse placeholder-neutral-500 w-full uppercase focus:ring-0 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => alert('¡Gracias por suscribirte a Andante!')}
          className="p-1 text-brand hover:text-brand-hover font-bold text-lg cursor-pointer"
        >
          ↗
        </button>
      </div>
      <div className="flex gap-6 sm:gap-8 text-[10px] font-mono text-neutral-400 justify-end pt-1">
        <a href="#instagram" className="hover:text-on-inverse transition-colors">
          INSTAGRAM
        </a>
        <a href="#twitter" className="hover:text-on-inverse transition-colors">
          TWITTER
        </a>
        <a href="#behance" className="hover:text-on-inverse transition-colors">
          BEHANCE
        </a>
      </div>
    </div>
  );
}

export default function SiteFooter({ variant }: SiteFooterProps) {
  const isHome = variant === 'home';
  const valueProps = isHome ? HOME_VALUE_PROPS : EXHIBITION_VALUE_PROPS;

  return (
    <footer
      className={`snap-section flex-shrink-0 p-6 flex flex-col justify-center transition-colors duration-400${
        variant === 'exhibition' ? ' exhibition-snap-section' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-[1210px]">
        <div className="bg-footer text-on-inverse text-xs font-sans transition-colors duration-400 overflow-x-hidden overflow-y-visible rounded-[24px] md:rounded-[32px] w-full flex flex-col px-5 sm:px-8 md:px-10 py-12 sm:py-16 md:py-[80px]">
          <div className="flex flex-col gap-[60px] w-full">

            {/* Fila de tarjetas */}
            {isHome ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
                {valueProps.map((v) => (
                  <Fragment key={v.t}>
                    <ValueCard title={v.t} description={v.d} />
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full shrink-0">
                {valueProps.map((v) => (
                  <Fragment key={v.t}>
                    <ValueCard title={v.t} description={v.d} />
                  </Fragment>
                ))}
              </div>
            )}

            {/* Marca + suscripción */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start justify-between shrink-0">
              <BrandParagraph />
              <SubscriptionBlock />
            </div>

            {/* Disclaimer */}
            <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 shrink-0">
              <span>© 2026 Andante | Arte Itinerante</span>
              <span>Hecho con calma</span>
            </div>

            {/* Wordmark — overflow visible para la animación scroll-float */}
            <div className="relative shrink-0 w-full overflow-visible">
              <ScrollFloatText text="ANDANTE :)" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
