import { useRef, Fragment } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface ScrollFloatTextProps {
  text: string;
  className?: string;
}

const HIDDEN = { opacity: 0, y: '110%', scaleY: 2.3, scaleX: 0.7 } as const;
const SHOWN = { opacity: 1, y: '0%', scaleY: 1, scaleX: 1 } as const;

function FloatChar({
  char,
  index,
  inView,
  reducedMotion,
}: {
  char: string;
  index: number;
  inView: boolean;
  reducedMotion: boolean;
}) {
  if (char === ' ') {
    return <span aria-hidden className="inline-block w-[0.18em] shrink-0" />;
  }

  return (
    <motion.span
      className="inline-block will-change-transform"
      style={{ transformOrigin: '50% 0%' }}
      initial={false}
      animate={reducedMotion ? SHOWN : inView ? SHOWN : HIDDEN}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: 0.8,
              delay: index * 0.03,
              ease: [0.34, 1.56, 0.64, 1],
            }
      }
    >
      {char}
    </motion.span>
  );
}

export default function ScrollFloatText({ text, className = '' }: ScrollFloatTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const chars = text.split('');

  return (
    <h2
      ref={ref}
      className={`flex w-full items-end justify-between font-sans font-extrabold text-brand select-none leading-[0.8] tracking-tighter whitespace-nowrap text-[clamp(4rem,15vw,10rem)] ${className}`}
    >
      {chars.map((char, i) => (
        <Fragment key={`${char}-${i}`}>
          <FloatChar char={char} index={i} inView={inView} reducedMotion={!!reducedMotion} />
        </Fragment>
      ))}
    </h2>
  );
}
