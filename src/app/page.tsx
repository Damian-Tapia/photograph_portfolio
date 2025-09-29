'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import './globals.css';
import '../styles/horizontalstyles.css'; // <-- importa el CSS horizontal

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [typedText, setTypedText] = useState('');
  const photographerName = 'ALEJANDRO GARCÍA';

  const pageRef = useRef<HTMLElement | null>(null);

  // Efecto de typing
  useEffect(() => {
    if (!showIntro) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= photographerName.length) {
        setTypedText(photographerName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowIntro(false), 1000);
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, [showIntro, photographerName]);


  return (
    <>
      {/* Intro Screen con typing effect */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.h1
              className="intro__name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {typedText}
              <motion.span
                className="intro__cursor"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                |
              </motion.span>
            </motion.h1>

            <motion.p
              className="intro__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              Fotógrafo Visual
            </motion.p>

            <motion.button
              className="intro__skip"
              onClick={() => setShowIntro(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Saltar intro →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Scroll Horizontal */}
      {!showIntro && (
        <motion.main
          ref={pageRef}
          className="page page--horizontal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section 1: Hero */}
          <section className="section section--hero">
            <div className="section__content">
              <motion.h2
                className="section__title"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                PORTFOLIO
              </motion.h2>
              <motion.p
                className="section__description"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Explorando la luz, las sombras y los momentos únicos
              </motion.p>
            </div>
          </section>

          {/* Section 2: Gallery (con scroll vertical interno) */}
          <section className="section section--gallery">
            {/* Si tu galería ya trae un contenedor scrollable, dale clase "gallery-scroll" */}
            <div className="gallery-scroll">
              <ImageGallery />
            </div>
          </section>

          {/* Section 3: About */}
          <section className="section section--about">
            <div className="section__content">
              <motion.h3
                className="section__subtitle"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                SOBRE MÍ
              </motion.h3>
              <motion.p
                className="section__text"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Fotógrafo especializado en capturar momentos auténticos.
                Con más de 10 años de experiencia en fotografía urbana,
                retratos y naturaleza.
              </motion.p>
            </div>
          </section>

          {/* Section 4: Contact */}
          <section className="section section--contact">
            <div className="section__content">
              <motion.h3
                className="section__subtitle"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                CONTACTO
              </motion.h3>
              <motion.div
                className="contact__links"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <a href="mailto:contacto@ejemplo.com" className="contact__link">
                  Email
                </a>
                <a href="https://instagram.com" className="contact__link">
                  Instagram
                </a>
                <a href="https://behance.com" className="contact__link">
                  Behance
                </a>
              </motion.div>
            </div>
          </section>
        </motion.main>
      )}
    </>
  );
}
