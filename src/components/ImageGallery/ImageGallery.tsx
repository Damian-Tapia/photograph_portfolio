'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { portfolioImages, ImageData } from '@/data/images';
import './ImageGallery.css';

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // Convierte wheel vertical -> desplazamiento horizontal dentro de la galería
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    let raf = 0;
    const onWheel = (e: WheelEvent) => {
      // Si el gesto es mayormente vertical, lo mapeamos a scrollLeft
      const absY = Math.abs(e.deltaY);
      const absX = Math.abs(e.deltaX);
      if (absY <= absX) return;

      // ¡Importante! prevenir el scroll vertical nativo
      e.preventDefault();
      cancelAnimationFrame(raf);
      const delta = e.deltaY;
      raf = requestAnimationFrame(() => {
        el.scrollLeft += delta;
      });
    };

    // Soporte táctil: gesto vertical -> desplazamiento X
    let startY = 0;
    let startX = 0;
    let panning = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      startY = t.clientY;
      startX = t.clientX;
      panning = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!panning) return;
      const t = e.touches[0];
      const dy = t.clientY - startY;
      const dx = t.clientX - startX;

      // Si el gesto es más vertical que horizontal, mapeamos a scrollLeft
      if (Math.abs(dy) > Math.abs(dx)) {
        e.preventDefault(); // requiere passive:false
        el.scrollLeft -= dy;
        startY = t.clientY;
      }
    };

    const onTouchEnd = () => {
      panning = false;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel as any);
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchmove', onTouchMove as any);
      el.removeEventListener('touchend', onTouchEnd as any);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={galleryRef}
        className="gallery gallery--horizontal"
        aria-label="Galería horizontal"
      >
        {portfolioImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px 0px -50px 0px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedImage(image)}
            className="gallery__item"
          >
            <motion.div
              className="gallery__overlay"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="gallery__info">
                <motion.p
                  className="gallery__title"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {image.alt}
                </motion.p>
                <motion.span
                  className="gallery__category"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {image.category}
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              className="gallery__image-wrapper"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="gallery__image"
                sizes="400px"
                priority={index < 2}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Evita que el scroll del modal “arrastre” la página de fondo
            onWheel={(e) => e.stopPropagation()}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="modal__content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal__image-container">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={selectedImage.width || 1200}
                  height={selectedImage.height || 800}
                  className="modal__image"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <motion.button
                className="modal__close"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </motion.button>

              <motion.div
                className="modal__info"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="modal__title">{selectedImage.alt}</h3>
                <p className="modal__category">{selectedImage.category}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
