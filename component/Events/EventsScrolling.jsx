import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import styles from "./EventsScrolling.module.css";
import Events from "../Events";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EventsScrolling = () => {
  const spotlightRefs = useRef([]);
  spotlightRefs.current = [];

  // 🔹 Refs for cover + headers
  const coverRef = useRef(null);
  const introHeaderRef = useRef(null);
  const outroHeaderRef = useRef(null);

  // 🔹 Your 3 base images
  const baseImages = ["/e1.jpg", "/e2.jpg", "/e3.jpg"];
  const spotlightImages = Array.from({ length: 20 }, (_, i) => baseImages[i % baseImages.length]);

  // Utility to add refs
  const addToRefs = (el) => {
    if (el && !spotlightRefs.current.includes(el)) {
      spotlightRefs.current.push(el);
    }
  };

  useGSAP(() => {
    // Lenis smooth scroll setup
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // SplitText setup
    const introSplit = new SplitText(introHeaderRef.current, { type: "words" });
    const outroSplit = new SplitText(outroHeaderRef.current, { type: "words" });

    gsap.set(introSplit.words, { opacity: 1 });
    gsap.set(outroSplit.words, { opacity: 0 });
    gsap.set(outroHeaderRef.current, { opacity: 1 });

    // Scatter directions for images
    const scatterDirections = [
      { x: 1.3, y: 0.7 },
      { x: -1.5, y: 1.0 },
      { x: 1.1, y: -1.3 },
      { x: -1.7, y: -0.8 },
      { x: 0.8, y: 1.5 },
      { x: -1.0, y: -1.4 },
      { x: 1.6, y: 0.3 },
      { x: -0.7, y: 1.7 },
      { x: 1.2, y: -1.6 },
      { x: -1.4, y: 0.9 },
      { x: 1.8, y: -0.5 },
      { x: -1.1, y: -1.8 },
      { x: 0.9, y: 1.8 },
      { x: -1.9, y: 0.4 },
      { x: 1.0, y: -1.9 },
      { x: -0.8, y: 1.9 },
      { x: 1.7, y: -1.0 },
      { x: -1.3, y: -1.2 },
      { x: 0.7, y: 2.0 },
      { x: 1.25, y: -0.2 },
    ];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth < 1000;
    // Keep desktop visuals as-is, tune only small screens
    const scatterMultiplier = isMobile ? 1.4 : 0.5;

    // Start + End positions
    const startPositions = spotlightRefs.current.map(() => ({
      x: 0,
      y: 0,
      z: -1000,
      scale: 0,
    }));

    const endPositions = scatterDirections.map((dir) => ({
      x: dir.x * screenWidth * scatterMultiplier,
      y: dir.y * screenHeight * scatterMultiplier,
      z: 2000,
      scale: 1,
    }));

    // Set initial positions
    spotlightRefs.current.forEach((img, index) => {
      gsap.set(img, startPositions[index]);
    });
    gsap.set(coverRef.current, {
      z: -1000,
      scale: 0,
      x: 0,
      y: 0,
    });

    // ScrollTrigger animation
    ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * (isMobile ? 10 : 15)}px`,
      pin: true,
      scrub: 1,
onUpdate: (self) => {
  const progress = self.progress;

  // 🔹 Spotlight images
  spotlightRefs.current.forEach((img, index) => {
    const staggerDelay = index * (isMobile ? 0.02 : 0.03);
    const scaleMultiplier = isMobile ? 2.2 : 2;
    const imageProgress = Math.max(0, (progress - staggerDelay) * (isMobile ? 3 : 4));

    const start = startPositions[index];
    const end = endPositions[index];

    gsap.set(img, {
      z: gsap.utils.interpolate(start.z, end.z, imageProgress),
      scale: gsap.utils.interpolate(start.scale, end.scale, imageProgress * scaleMultiplier),
      x: gsap.utils.interpolate(start.x, end.x, imageProgress),
      y: gsap.utils.interpolate(start.y, end.y, imageProgress),
    });
  });

  // 🔹 Cover image
  const coverProgress = Math.max(0, (progress - (isMobile ? 0.6 : 0.7)) * (isMobile ? 3 : 4));
  gsap.set(coverRef.current, {
    z: -1000 + 2000 * coverProgress,
    scale: Math.min(1, coverProgress * 2),
    x: 0,
    y: 0,
  });

  // 🔹 Intro heading fade-out (0.6 → 0.75)
  if (progress >= (isMobile ? 0.5 : 0.6) && progress <= (isMobile ? 0.72 : 0.75)) {
    const introFade = gsap.utils.mapRange((isMobile ? 0.5 : 0.6), (isMobile ? 0.72 : 0.75), 1, 0, progress);
    gsap.to(introSplit.words, {
      opacity: introFade,
      y: introFade === 0 ? -20 : 0, // small lift
      stagger: 0.05,
      overwrite: true,
      duration: 0.2,
    });
  }

  // 🔹 Outro heading fade-in (0.8 → 0.95)
  if (progress >= (isMobile ? 0.75 : 0.8) && progress <= (isMobile ? 0.92 : 0.95)) {
    const outroFade = gsap.utils.mapRange((isMobile ? 0.75 : 0.8), (isMobile ? 0.92 : 0.95), 0, 1, progress);
    gsap.to(outroSplit.words, {
      opacity: outroFade,
      y: outroFade === 1 ? 0 : 20, // small rise-up effect
      stagger: 0.05,
      overwrite: true,
      duration: 0.2,
    });
  }
}



    });
  }, []);

  return (
    <div>
      {/* <section className={styles.intro}>
        <h1 className={styles.heading}>Vision That Move Beyond The Surface</h1>
      </section> */}

      <section className={`${styles.spotlight} spotlight`}>
        <div className={`${styles["spotlight-images"]}`}>
          {spotlightImages.map((src, index) => (
            <img
              key={index}
              ref={addToRefs}
              src={src}
              alt={`Event ${index + 1}`}
              className={`${styles.spotlightImage}`}
            />
          ))}
        </div>

        <div ref={coverRef} className={styles["spotlight-cover-img"]}>
          <img src="/e2.jpg" alt="cover" />
        </div>

        <div ref={introHeaderRef} className={styles["spotlight-intro-header"]}>
          <h1 className={styles.heading}>When Motion and Stillness Collide in Layers</h1>
        </div>

        <div ref={outroHeaderRef} className={styles["spotlight-outro-header"]}>
          <h1 className={styles.heading}>What Follows Is Not Stillness but Reverberations</h1>
        </div>
      </section>

      <section className={styles.outro}>
        <Events/>
      </section>
    </div>
  );
};

export default EventsScrolling;
