import { motion } from 'motion/react';
import { MapPin, Mail, Instagram, ArrowRight, BookOpen, Smile } from 'lucide-react';
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
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-0 top-[64px] sm:top-[80px] z-40 bg-white dark:bg-[#1A1A1A] overflow-y-auto border-t border-[#E6E6E6] dark:border-[#333333] transition-colors duration-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        
        {/* Left Column: Coordinates Navigation */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-[#8A8A8A] dark:text-[#7A7A7A] block mb-6 uppercase font-bold">
              — COORDENADAS DE NAVEGACIÓN
            </span>
            <nav className="space-y-6 sm:space-y-8">
              {menuItems.map((item) => (
                <div key={item.view} className="group">
                  <button
                    onClick={() => handleNavigate(item.view)}
                    className="flex items-start text-left w-full focus:outline-none focus:text-[#0084FF]"
                  >
                    <span className="font-mono text-sm sm:text-base text-[#0084FF] dark:text-[#3D9DFF] mr-4 sm:mr-6 font-bold mt-1">
                      {item.num}
                    </span>
                    <div className="flex-grow">
                      <span className="font-sans font-bold text-2xl sm:text-4xl text-[#333333] dark:text-[#F2F2F2] group-hover:text-[#0084FF] dark:group-hover:text-[#3D9DFF] transition-all duration-200">
                        {item.label}
                      </span>
                      <p className="text-xs text-[#5C5C5C] dark:text-[#B8B8B8] font-sans mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#0084FF] dark:text-[#3D9DFF] ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </button>
                  <hr className="mt-4 border-[#E6E6E6] dark:border-[#333333]/70" />
                </div>
              ))}

              {/* Special action for reading the cultural manifesto */}
              <div className="group">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenManifesto();
                  }}
                  className="flex items-start text-left w-full focus:outline-none"
                >
                  <span className="font-mono text-sm sm:text-base text-[#0084FF] dark:text-[#3D9DFF] mr-4 sm:mr-6 font-bold mt-1">
                    04
                  </span>
                  <div className="flex-grow">
                    <span className="font-sans font-bold text-2xl sm:text-4xl text-[#333333] dark:text-[#F2F2F2] group-hover:text-[#0084FF] dark:group-hover:text-[#3D9DFF] transition-all duration-200">
                      Manifiesto Andante
                    </span>
                    <p className="text-xs text-[#5C5C5C] dark:text-[#B8B8B8] font-sans mt-1">
                      Nuestra declaración cultural e ideales
                    </p>
                  </div>
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#0084FF] dark:text-[#3D9DFF] ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </button>
                <hr className="mt-4 border-[#E6E6E6] dark:border-[#333333]/70" />
              </div>
            </nav>
          </div>

          {/* Core manifesto summary statement */}
          <div className="mt-12 sm:mt-16 bg-[#F2F2F2] dark:bg-[#242424] p-5 rounded-2xl border border-[#E6E6E6] dark:border-[#333333] flex gap-3.5 items-start">
            <Smile className="h-5 w-5 text-[#0084FF] dark:text-[#3D9DFF] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-mono tracking-wider text-[#8A8A8A] dark:text-[#7A7A7A] block uppercase font-bold mb-1">
                — MANIFIESTO EN SÍNTESIS
              </span>
              <p className="font-sans text-xs text-[#333333] dark:text-[#F2F2F2] leading-relaxed italic">
                "Andante nace para democratizar y desacralizar el arte de los museos asépticos, llevándolo a los muros locales donde transcurre la conversación orgánica cotidiana."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Partnered Venues */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12 lg:space-y-0 lg:border-l lg:border-[#E6E6E6] lg:dark:border-[#333333] lg:pl-12">
          
          {/* Active partnered spots list */}
          <div>
            <span className="text-[10px] font-mono tracking-wider text-[#8A8A8A] dark:text-[#7A7A7A] block mb-6 uppercase font-bold">
              — NUESTRAS SEDES EN RED
            </span>
            <div className="space-y-4">
              {VENUES_DATA.map((venue) => (
                <div 
                  key={venue.id} 
                  className="bg-[#F2F2F2] dark:bg-[#242424] p-4 border border-[#E6E6E6] dark:border-[#333333] rounded-2xl flex gap-4 transition-colors"
                >
                  <img
                    src={venue.image}
                    alt={venue.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-xl border border-[#E6E6E6] dark:border-[#333333] flex-shrink-0 bg-white"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-sans text-sm font-bold text-[#333333] dark:text-[#F2F2F2] truncate">
                        {venue.name}
                      </h4>
                      {venue.activeExhibitionsCount > 0 && (
                        <span className="bg-[#D4F334] text-[#333333] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase">
                          Activa
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#8A8A8A] dark:text-[#7A7A7A] font-mono mt-0.5">
                      {venue.type}
                    </p>
                    <div className="flex items-center text-[10px] text-[#5C5C5C] dark:text-[#B8B8B8] mt-1.5 font-sans">
                      <MapPin className="h-3 w-3 mr-1 text-[#0084FF] dark:text-[#3D9DFF]" />
                      <span className="truncate">{venue.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social connections box */}
          <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-[#E6E6E6] dark:border-[#333333] shadow-sm">
            <span className="text-[10px] font-mono tracking-wider text-[#333333] dark:text-[#F2F2F2] block mb-3 uppercase font-bold">
              — ESTABLECE CONTACTO DIRECTO
            </span>
            <p className="text-xs text-[#5C5C5C] dark:text-[#B8B8B8] font-sans mb-4 leading-relaxed">
              ¿Eres artista independiente o gestionas un local y te entusiasma la itinerancia colectiva? Hablemos de arte.
            </p>
            <div className="space-y-2.5">
              <a
                href="mailto:hola@andantegaleria.com"
                className="flex items-center space-x-2.5 text-xs text-[#333333] dark:text-[#F2F2F2] hover:text-[#0084FF] dark:hover:text-[#3D9DFF] font-mono transition-colors font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>hola@andantegaleria.com</span>
              </a>
              <a
                href="https://instagram.com/andante"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-xs text-[#333333] dark:text-[#F2F2F2] hover:text-[#0084FF] dark:hover:text-[#3D9DFF] font-mono transition-colors font-medium"
              >
                <Instagram className="h-4 w-4" />
                <span>@andante.itinerante</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
