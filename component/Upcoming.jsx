"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Button from "./ButtonPrimary";

function getTimeParts(targetDate) {
  const totalMs = Math.max(0, targetDate.getTime() - Date.now());
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

const TimeCell = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-wide text-white">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs sm:text-sm text-white/70">{label}</div>
    </div>
  );
};

const Upcoming = ({
  title = "Next Major Event",
  subtitle = "Hacktech 2025 - The biggest Hackathon of the year",
  ctaText = "Reserve Your Spot",
  ctaHref = "#",
  target = "2025-12-01T00:00:00Z",
  imageSrc = "/Hand.png",
  imageAlt = "Energy hand",
}) => {
  const targetDate = useMemo(() => new Date(target), [target]);
  const [time, setTime] = useState(() => getTimeParts(targetDate));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeParts(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <section className="w-full bg-[#0A0711]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text and countdown */}
          <div className="space-y-6">
            <h2 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl leading-tight">
              {title}
            </h2>
            <p className="font-paragraph text-white/80 text-base sm:text-lg">
              {subtitle}
            </p>

            <div className="flex items-center gap-8 sm:gap-10 lg:gap-12 pt-2">
              <TimeCell value={time.days} label="Days" />
              <TimeCell value={time.hours} label="Hours" />
              <TimeCell value={time.minutes} label="Minutes" />
              <TimeCell value={time.seconds} label="seconds" />
            </div>

            <div className="pt-4">
              <Button text={ctaText} route={ctaHref} />
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[620px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover rotate-y-180 object-center select-none pointer-events-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
