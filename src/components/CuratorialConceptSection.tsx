import { useEffect, useRef, useState } from 'react';
import DecryptedText from './DecryptedText';

const CONCEPT_TEXT = `La luz no es solo un fenómeno físico; es el mediador entre nuestra percepción y la realidad. En esta muestra itinerante, nos alejamos del "cubo blanco" tradicional para habitar espacios de vida cotidiana, donde la luz natural y artificial conversan con la obra en tiempo real.

A través de la pintura, la fotografía y la escultura ligera, los cinco artistas seleccionados desglosan el espectro lumínico para recordarnos que nada es estático. "Cinco artistas, una conversación sobre la luz" es una invitación a la pausa, a observar cómo el mediodía incide sobre un lienzo y cómo la penumbra de la tarde revela texturas antes invisibles.`;

export default function CuratorialConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && entry.intersectionRatio >= 0.45) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: [0.45, 0.55, 0.65] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="exhibition-snap-section min-h-dvh flex flex-col justify-center px-6 bg-transparent"
    >
      <div className="max-w-3xl mx-auto w-full text-center space-y-10">
        <h3 className="font-mono text-[10px] sm:text-xs font-black tracking-[0.25em] text-neutral-600 dark:text-neutral-400 uppercase">
          Concepto curatorial
        </h3>
        <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line">
          <DecryptedText text={CONCEPT_TEXT} active={active} />
        </p>
      </div>
    </section>
  );
}
