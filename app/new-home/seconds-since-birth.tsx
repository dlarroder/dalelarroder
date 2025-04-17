'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { dmMono } from '../fonts';

export default function SecondsSinceBirth({ date }: { date: Date }) {
  const [secondsPassed, setSecondsPassed] = useState(
    Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsPassed((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span key={secondsPassed} className={classNames('tabular-nums', dmMono.className)}>
      {secondsPassed.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </span>
  );
}
