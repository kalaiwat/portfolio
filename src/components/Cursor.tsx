import { useEffect, useRef } from 'react';

/**
 * the signature element: a white circle under `mix-blend-mode: difference`,
 * which inverts whatever it passes over. positioned by writing `transform`
 * inside a rAF loop rather than through React state — state on every pointermove
 * would re-render the tree once per pixel.
 *
 * guard rails: mounts nothing on coarse pointers (no cursor to replace), and
 * under `prefers-reduced-motion: reduce` the rAF loop is never started — the dot
 * snaps on the pointer event itself. both are re-evaluated if the media query
 * flips (plugging in a mouse, changing the OS motion setting).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let rafId: number | null = null;

    const draw = () => {
      const dot = dotRef.current;
      if (!dot) return;
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    };

    const move = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // reveal only once the pointer has been located, so the dot never sits
      // parked in the top-left corner on load
      dotRef.current?.classList.add('is-active');
      // no loop running (reduced motion) — write straight from the event
      if (rafId === null) draw();
    };

    const stop = () => {
      window.removeEventListener('pointermove', move);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const start = () => {
      stop();
      if (!finePointer.matches) return;
      window.addEventListener('pointermove', move);
      if (reducedMotion.matches) return;
      const tick = () => {
        draw();
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    start();
    finePointer.addEventListener('change', start);
    reducedMotion.addEventListener('change', start);

    return () => {
      stop();
      finePointer.removeEventListener('change', start);
      reducedMotion.removeEventListener('change', start);
    };
  }, []);

  return <div className="cursor-dot" ref={dotRef} aria-hidden="true" />;
}
