'use client';

import { useEffect, useMemo, useState } from 'react';

export default function SecondsSinceBirth() {
  const birthDate = useMemo(() => new Date('July 22, 1997'), []);
  const [secondsPassed, setSecondsPassed] = useState(
    Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - new Date(birthDate).getTime()) / 1000);
      setSecondsPassed(diffInSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  // return <AnimatedNumber number={secondsPassed} />;

  return (
    <span className="tabular-nums">
      {secondsPassed.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </span>
  );
}
