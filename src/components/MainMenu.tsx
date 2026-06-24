import { motion } from 'motion/react';
import { MapPin, Envelope, InstagramLogo, ArrowRight, BookOpen, Smiley } from '@phosphor-icons/react';
import { VENUES_DATA } from '../data';

interface MainMenuProps {
  setView: (view: string) => void;
  setMenuOpen: (open: boolean) => void;
  onOpenManifesto: () => void;
}

export default function MainMenu({ setView, setMenuOpen, onOpenManifesto }: MainMenuProps) {
  const handleNavigate = (view: string) => {
    setView(view);
    setMenuOpen(false);
  };

  const menuItems = [
    { num: '01', label: 'Sala Principal', subtitle: 'Página de presentación y red', view: 'landing' },
    { num: '02', label: 'Exposición Activa', subtitle: 'Show en Sede Café Norte', view: 'exhibition' },
    { num: '03', label: 'Tu Selección', subtitle: 'Adquisiciones y despacho', view: 'checkout' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 top-[64px] sm:top-[80px] z-40 bg-canvas overflow-y-auto border-t border-border transition-colors duration-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        
        {/* Left Column: Coordinates Navigation */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-fg-muted block mb-6 uppercase font-bold">
              — COORDENADAS DE NAVEGACIÓN
            </span>
            <nav className="space-y-6 sm:space-y-8">
              {menuItems.map((item) => (
                <div key={item.view} className="group">
                  <button
                    onClick={() => handleNavigate(item.view)}
                    className="focus-ring flex items-start text-left w-full"
                  >
                    <span className="font-mono text-sm sm:text-base text-accent mr-4 sm:mr-6 font-bold mt-1">
                      {item.num}
                    </span>
                    <div className="flex-grow">
                      <span className="font-sans font-bold text-2xl sm:text-4xl text-fg group-hover:text-accent transition-all duration-200">
                        {item.label}
                      </span>
                      <p className="text-xs text-fg-secondary font-sans mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-accent ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </button>
                  <hr className="mt-4 border-border/70" />
                </div>
              ))}

              {/* Special action for reading the cultural manifesto */}
              <div className="group">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenManifesto();
                  }}
                  className="focus-ring flex items-start text-left w-full"
                >
                  <span className="font-mono text-sm sm:text-base text-accent mr-4 sm:mr-6 font-bold mt-1">
                    04
                  </span>
                  <div className="flex-grow">
                    <span className="font-sans font-bold text-2xl sm:text-4xl text-fg group-hover:text-accent transition-all duration-200">
                      Manifiesto Andante
                    </span>
                    <p className="text-xs text-fg-secondary font-sans mt-1">
                      Nuestra declaración cultural e ideales
                    </p>
                  </div>
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-accent ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </button>
                <hr className="mt-4 border-border/70" />
              </div>
            </nav>
          </div>

          {/* Core manifesto summary statement */}
          <div className="mt-12 sm:mt-16 bg-elevated dark:bg-elevated p-5 rounded-2xl border border-border flex gap-3.5 items-start">
            <Smiley className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-mono tracking-wider text-fg-muted block uppercase font-bold mb-1">
                — MANIFIESTO EN SÍNTESIS
              </span>
              <p className="font-sans text-xs text-fg leading-relaxed italic">
                "Andante nace para democratizar y desacralizar el arte de los museos asépticos, llevándolo a los muros locales donde transcurre la conversación orgánica cotidiana."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Partnered Venues */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12 lg:space-y-0 lg:border-l lg:border-border lg:dark:border-border lg:pl-12">
          
          {/* Active partnered spots list */}
          <div>
            <span className="text-[10px] font-mono tracking-wider text-fg-muted block mb-6 uppercase font-bold">
              — NUESTRAS SEDES EN RED
            </span>
            <div className="space-y-4">
              {VENUES_DATA.map((venue) => (
                <div 
                  key={venue.id} 
                  className="bg-elevated dark:bg-elevated p-4 border border-border rounded-2xl flex gap-4 transition-colors"
                >
                  <img
                    src={venue.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-xl border border-border flex-shrink-0 bg-white"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-sans text-sm font-bold text-fg truncate">
                        {venue.name}
                      </h4>
                      {venue.activeExhibitionsCount > 0 && (
                        <span className="bg-brand text-on-brand text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase">
                          Activa
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-fg-muted font-mono mt-0.5">
                      {venue.type}
                    </p>
                    <div className="flex items-center text-[10px] text-fg-secondary mt-1.5 font-sans">
                      <MapPin className="h-3 w-3 mr-1 text-accent" />
                      <span className="truncate">{venue.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social connections box */}
          <div className="bg-canvas p-6 rounded-2xl border border-border shadow-sm">
            <span className="text-[10px] font-mono tracking-wider text-fg block mb-3 uppercase font-bold">
              — ESTABLECE CONTACTO DIRECTO
            </span>
            <p className="text-xs text-fg-secondary font-sans mb-4 leading-relaxed">
              ¿Eres artista independiente o gestionas un local y te entusiasma la itinerancia colectiva? Hablemos de arte.
            </p>
            <div className="space-y-2.5">
              <a
                href="mailto:hola@andantegaleria.com"
                className="flex items-center space-x-2.5 text-xs text-fg hover:text-accent font-mono transition-colors font-medium"
              >
                <Envelope className="h-4 w-4" />
                <span>hola@andantegaleria.com</span>
              </a>
              <a
                href="https://instagram.com/andante"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-xs text-fg hover:text-accent font-mono transition-colors font-medium"
              >
                <InstagramLogo className="h-4 w-4" />
                <span>@andante.itinerante</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
