'use client'
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor));
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

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
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = e => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = e => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(ripple, {
        scale: 0,
        opacity: 1
      }, {
        scale: 1,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-2 p-3 select-none relative"
    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
    ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #392e4e;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
          }
          .card-responsive { grid-template-columns: 1fr; width: 100%; margin: 0 auto; ; }
          @media (min-width: 1024px) {
            .card-responsive { grid-template-columns: repeat(4, 1fr); grid-auto-rows: 220px; }
            .bento-left { grid-column: span 2; grid-row: span 2; }
            .bento-right { grid-column: span 2; grid-row: span 2; }
          }
          .card--border-glow::after { content: ''; position: absolute; inset: 0; padding: 6px; background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%, rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%, transparent 60%); border-radius: inherit; mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: subtract; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; pointer-events: none; transition: opacity 0.3s ease; z-index: 1; }
          .card--border-glow:hover::after { opacity: 1; }
        `}
      </style>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor} />
      )}
      <BentoCardGrid gridRef={gridRef}>
        <div className="card-responsive grid gap-2 rounded-4xl">
          {/* Small A - Upcoming Event */}
          {/* Event Card - HackNight */}
          <ParticleCard
            className={`card relative w-full p-5 rounded-[20px] border border-solid ${enableBorderGlow ? "card--border-glow" : ""
              }`}
            style={{
              backgroundColor: "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
            }}
            disableAnimations={shouldDisableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={false}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          >
            <div className="flex h-full w-full items-center justify-between gap-3">
              <div>
                <div className="text-white/70 text-xs uppercase tracking-wide">
                  Upcoming
                </div>
                <div className="text-white font-heading text-xl">HackNight 2.0</div>
                <div className="text-white/60 text-xs">Fri, 7:00 PM · Auditorium</div>
                <p className="text-white/70 text-sm mt-2 max-w-[220px]">
                  A 12-hour coding sprint to innovate, collaborate, and build impactful
                  projects. Open for all tech enthusiasts!
                </p>
              </div>
              <button className="shrink-0 rounded-xl bg-[#12091d] border border-[#392e4e] px-3 py-2 text-xs text-white/80 hover:bg-[#1e0f2b] transition">
                Register
              </button>
            </div>
          </ParticleCard>

          {/* Features Card (replaces testimonial) */}
          <ParticleCard
            className={`card relative w-full p-5 rounded-[20px] border border-solid ${enableBorderGlow ? "card--border-glow" : ""}`}
            style={{
              backgroundColor: "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
            }}
            disableAnimations={shouldDisableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          >
            <div className="h-full w-full grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#12091d] border border-[#392e4e] text-white/80">⚡</span>
                <div>
                  <div className="text-white text-sm font-semibold">Fast-paced</div>
                  <div className="text-white/60 text-xs">Hands-on events and sprints</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#12091d] border border-[#392e4e] text-white/80">🎯</span>
                <div>
                  <div className="text-white text-sm font-semibold">Outcome-first</div>
                  <div className="text-white/60 text-xs">Build real, useful projects</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#12091d] border border-[#392e4e] text-white/80">🤝</span>
                <div>
                  <div className="text-white text-sm font-semibold">Community</div>
                  <div className="text-white/60 text-xs">Peer-led learning culture</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#12091d] border border-[#392e4e] text-white/80">🛠️</span>
                <div>
                  <div className="text-white text-sm font-semibold">Tooling</div>
                  <div className="text-white/60 text-xs">Modern stacks & workflows</div>
                </div>
              </div>
            </div>
          </ParticleCard>


          {/* Left Big - Group Picture */}
          <ParticleCard
            className={`card bento-left relative w-full p-6 rounded-[20px] border border-solid ${enableBorderGlow ? "card--border-glow" : ""
              }`}
            style={{
              backgroundColor: "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
            }}
            disableAnimations={shouldDisableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          >
            <div  className='w-full h-[60vh] md:h-full '>
              <Image
              src={'/group.jpg'}
              fill
              />
            </div>
          </ParticleCard>


          {/* Right Big - Placeholder */}
          <ParticleCard
            className={`card bento-right relative w-full p-6 rounded-[20px] border border-solid ${enableBorderGlow ? 'card--border-glow' : ''}`}
            style={{ backgroundColor: 'var(--background-dark)', borderColor: 'var(--border-color)', color: 'var(--white)' }}
            disableAnimations={shouldDisableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          >
            <div className="h-full w-full flex flex-col justify-center items-center">
              <div className="text-white/90 font-heading text-2xl uppercase tracking-wide">
                About Us
              </div>
            
              <p className="text-white/70 text-[1rem] leading-6 max-w-md text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptate molestias dolor facilis tenetur, voluptatem, veritatis aliquid nesciunt eius repudiandae quidem possimus porro vitae quae temporibus minus non ad sed?
                Dolorum minus odio, assumenda molestiae temporibus, voluptas facere corporis cupiditate harum quo, hic quasi veritatis natus ipsa beatae placeat ullam. Atque ea similique laborum reiciendis commodi necessitatibus aut cumque in.
                Quasi adipisci laudantium dignissimos, veniam molestias consequuntur voluptate error accusantium animi nemo asperiores debitis earum natus doloribus voluptates mollitia iste, obcaecati eveniet labore, pariatur molestiae! Cupiditate minus blanditiis deleniti amet!
              </p>
            </div>
          </ParticleCard>

          {/* Small C - Stat */}
          {/* Small C - Stat */}
          <ParticleCard
            className={`card relative w-full p-5 rounded-[20px] border border-solid ${enableBorderGlow ? "card--border-glow" : ""
              }`}
            style={{
              backgroundColor: "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
            }}
            disableAnimations={shouldDisableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          >
            <div className="h-full w-full flex items-center justify-between">
              {/* Stat Info */}
              <div>
                <div className="text-white/70 text-xs uppercase tracking-wide">
                  Projects
                </div>
                <div className="text-white text-3xl font-bold">48</div>
                <p className="text-white/60 text-xs mt-1">
                  Built by our members this year
                </p>
              </div>

              {/* CTA Button */}
              <button className="rounded-xl bg-[#12091d] border border-[#392e4e] px-3 py-2 text-xs text-white/80 hover:bg-[#1e0f2b] hover:text-white transition">
                View →
              </button>
            </div>
          </ParticleCard>


          {/* Small D - CTA */}
          {/* Social Links Card */}
          <ParticleCard
            className={`card relative w-full p-5 rounded-[20px] border border-solid ${enableBorderGlow ? "card--border-glow" : ""
              }`}
            style={{
              backgroundColor: "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
            }}
            disableAnimations={shouldDisableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          >
            <div className="h-full w-full flex flex-col gap-4">
              <div>
                <div className="text-white/70 text-xs uppercase tracking-wide">
                  Connect with us
                </div>
                <div className="text-white font-heading text-xl">Follow CESA</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-br from-[#1e0f2b] to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="rounded-xl bg-[#12091d] border border-[#392e4e] px-3 py-3 text-center text-white/80 group-hover:bg-[#1e0f2b] transition">
                    <span className="block text-lg">𝕏</span>
                    <span className="block text-[10px] text-white/60">Twitter</span>
                  </div>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-br from-[#1e0f2b] to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="rounded-xl bg-[#12091d] border border-[#392e4e] px-3 py-3 text-center text-white/80 group-hover:bg-[#1e0f2b] transition">
                    <span className="block text-lg">◎</span>
                    <span className="block text-[10px] text-white/60">Instagram</span>
                  </div>
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-br from-[#1e0f2b] to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="rounded-xl bg-[#12091d] border border-[#392e4e] px-3 py-3 text-center text-white/80 group-hover:bg-[#1e0f2b] transition">
                    <span className="block text-lg">in</span>
                    <span className="block text-[10px] text-white/60">LinkedIn</span>
                  </div>
                </a>
              </div>
            </div>
          </ParticleCard>

        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
