'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

export default function One() {
  const ref = useRef(null);
  const didAnimate = useRef(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        scrub: true,
        start: 'top 30%',
        end: '+=500px',
        markers: true,
      },
    });

    if (didAnimate.current) {
      return;
    }

    didAnimate.current = true;

    timeline.from(ref.current, { clipPath: `inset(15%)` });
  }, []);

  return (
    <>
      <div className="relative h-screen bg-blue-900">z</div>
      <div className="relative h-screen">
        <div
          ref={ref}
          className="absolute z-30"
          style={{ background: 'red', opacity: 0.5, inset: 0 }}
        >
          hello
        </div>
      </div>
      <div className="h-screen bg-blue-900">z</div>
      <div className="h-screen bg-blue-900">z</div>
      <div className="h-screen bg-blue-900">z</div>
      <div className="h-screen bg-blue-900">z</div>
    </>
  );
}
