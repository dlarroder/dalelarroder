'use client';

import { useCallback, useEffect, useRef } from 'react';

export default function Line() {
  const path = useRef<any>(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  const setPath = useCallback(
    (progress: number) => {
      const width = window.innerWidth;
      path.current?.setAttributeNS(
        null,
        'd',
        `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
      );
    },
    [x]
  );

  useEffect(() => {
    setPath(progress);
  }, [progress, setPath]);

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: { movementY: number; clientX: number }) => {
    const { movementY, clientX } = e;
    const pathBound = path.current.getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    progress += movementY;
    setPath(progress);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className="relative h-[1px] w-full pb-[20px]">
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative top-[-20px] z-10 h-[40px] w-full"
      ></div>
      <svg className="absolute top-[-250px] h-[250px] w-full">
        <path ref={path} className="fill-none stroke-white stroke-1"></path>
      </svg>
    </div>
  );
}
