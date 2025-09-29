'use client';

import { MutableRefObject, useEffect } from 'react';

/**
 * Convierte scroll vertical (rueda/gesto) -> desplazamiento horizontal (scrollLeft)
 * + Soporta teclado y gestos touch verticales.
 */
export function useHorizontalScroll(
  ref: MutableRefObject<HTMLElement | null>,
  opts?: {
    keyboard?: boolean;  // ← → PgUp PgDn Espacio
    touch?: boolean;     // gestos verticales en móvil -> scrollX
  }
) {
  const keyboard = opts?.keyboard ?? true;
  const touch = opts?.touch ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const onWheel = (e: WheelEvent) => {
      // Interesa sólo cuando el gesto es mayormente vertical
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      e.preventDefault(); // ¡Clave!
      const delta = e.deltaY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.scrollLeft += delta;
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    const onKey = (e: KeyboardEvent) => {
      if (!keyboard) return;

      const active = document.activeElement as HTMLElement | null;
      const typing =
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.isContentEditable);
      if (typing) return;

      const page = el.clientWidth;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        el.scrollBy({ left: page, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        el.scrollBy({ left: -page, behavior: 'smooth' });
      } else if (e.key === 'Home') {
        e.preventDefault();
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', onKey);

    // Gestos touch verticales -> scroll X
    let startY = 0;
    let startX = 0;
    let panning = false;

    const onTouchStart = (e: TouchEvent) => {
      if (!touch) return;
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      startY = t.clientY;
      startX = t.clientX;
      panning = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touch || !panning) return;
      const t = e.touches[0];
      const dy = t.clientY - startY;
      const dx = t.clientX - startX;

      if (Math.abs(dy) > Math.abs(dx)) {
        e.preventDefault(); // requiere passive:false
        el.scrollLeft -= dy;
        startY = t.clientY; // movimiento incremental
      }
    };
    const onTouchEnd = () => { panning = false; };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('keydown', onKey);
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchmove', onTouchMove as any);
      el.removeEventListener('touchend', onTouchEnd as any);
      cancelAnimationFrame(raf);
    };
  }, [ref, keyboard, touch]);
}
