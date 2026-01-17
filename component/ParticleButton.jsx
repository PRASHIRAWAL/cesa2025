import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const DEFAULT_PARTICLE_COUNT = 6;
const DEFAULT_GLOW_COLOR = '132, 0, 255';

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.9);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleButton = ({
  children,
  className = '',
  style = {},
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  ...props
}) => {
  const btnRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!btnRef.current) return;
    const { width, height } = btnRef.current.getBoundingClientRect();
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const particle = createParticleElement(x, y, glowColor);
      btnRef.current.appendChild(particle);
      particlesRef.current.push(particle);
      gsap.fromTo(
        particle,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        rotation: Math.random() * 360,
        duration: 0.7 + Math.random() * 0.6,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
      gsap.to(particle, {
        opacity: 0.3,
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });
    }
  }, [particleCount, glowColor]);

  return (
    <button
      ref={btnRef}
      className={className + ' relative overflow-hidden'}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onMouseEnter={animateParticles}
      onMouseLeave={clearParticles}
      {...props}
    >
      {children}
      <style>{`
        .particle {
          pointer-events: none;
        }
      `}</style>
    </button>
  );
};

export default ParticleButton;
