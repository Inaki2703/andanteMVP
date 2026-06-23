import { useRef, useEffect, useCallback, type ReactNode, type MouseEvent } from 'react';

type Easing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

interface ClickSparkProps {
  /** Color of the spark lines. Defaults to the Andante primary text gray. */
  sparkColor?: string;
  /** Length of each spark line at its peak. */
  sparkSize?: number;
  /** How far the sparks travel outward from the click point. */
  sparkRadius?: number;
  /** Number of sparks emitted radially per click. */
  sparkCount?: number;
  /** Lifetime of each spark burst in milliseconds. */
  duration?: number;
  /** Easing curve for the outward travel. */
  easing?: Easing;
  /** Extra multiplier on the travel distance for a punchier burst. */
  extraScale?: number;
  /** Width of each spark stroke. */
  sparkWidth?: number;
  children?: ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

// A global click-spark overlay inspired by https://reactbits.dev/animations/click-spark
// The canvas is fixed to the viewport so sparks render correctly anywhere in the app,
// even while the page scrolls. Pointer events pass through to the underlying UI.
export default function ClickSpark({
  sparkColor,
  sparkSize = 11,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 420,
  easing = 'ease-out',
  extraScale = 1.0,
  sparkWidth = 2,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  // Keep the fixed canvas matched to the viewport (and crisp on retina displays).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: // ease-out
          return t * (2 - t);
      }
    },
    [easing]
  );

  // Single rAF loop that ages every active spark and draws it as a radiating line.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        const resolvedColor =
          sparkColor ??
          getComputedStyle(document.documentElement).getPropertyValue('--carbon').trim();

        ctx.strokeStyle = resolvedColor || '#333333';
        ctx.lineWidth = sparkWidth;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 1 - eased;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale, sparkWidth]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // The canvas is fixed at the viewport origin, so client coords map 1:1.
    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div onClick={handleClick} style={{ width: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  );
}
