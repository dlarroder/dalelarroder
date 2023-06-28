'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef } from 'react';

export default function HeroV2() {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: '-500px',
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.05 * direction;
  };

  return (
    <div className="relative z-10 h-[calc(100vh-116px)]">
      <h1>Dale Larroder</h1>

      <div className="absolute top-[calc(100vh-450px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p ref={firstText} className="relative pr-[50px] text-[250px] font-medium text-white">
            Software Engineer -
          </p>
          <p
            ref={secondText}
            className="absolute left-full top-0 pr-[50px] text-[250px] font-medium text-white"
          >
            Software Engineer -
          </p>
        </div>
      </div>
    </div>
  );
}
