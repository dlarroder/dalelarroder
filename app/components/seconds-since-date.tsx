'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { dmMono } from '../fonts';

export default function SecondsSinceDate({ date }: { date: Date }) {
	const [secondsPassed, setSecondsPassed] = useState<number | null>(null);

	useEffect(() => {
		const initial = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
		setSecondsPassed(initial);

		const interval = setInterval(() => {
			setSecondsPassed((prev) => (prev !== null ? prev + 1 : initial));
		}, 1000);

		return () => clearInterval(interval);
	}, [date]);

	return (
		<span
			className={classNames(
				'inline-block w-[11ch] text-right tabular-nums',
				dmMono.className,
			)}
		>
			{secondsPassed !== null
				? secondsPassed.toLocaleString('en-US')
				: '\u00A0'}
		</span>
	);
}
