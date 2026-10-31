'use client';

import { useEffect } from 'react';

// Fallback for browsers without requestIdleCallback (older Safari)
const IDLE_FALLBACK_MS = 2000;

export default function LogRocket() {
	const logrocketId = process.env.NEXT_PUBLIC_LOGROCKET_ID || '';

	useEffect(() => {
		if (!logrocketId) {
			return;
		}

		let cancelled = false;

		// Load the SDK as a separate chunk once the browser is idle, so it stays
		// out of the initial bundle and off the main thread during hydration
		const init = () => {
			import('logrocket').then(({ default: rocket }) => {
				if (!cancelled) {
					rocket.init(logrocketId);
				}
			});
		};

		if ('requestIdleCallback' in window) {
			const id = requestIdleCallback(init);
			return () => {
				cancelled = true;
				cancelIdleCallback(id);
			};
		}

		const id = setTimeout(init, IDLE_FALLBACK_MS);
		return () => {
			cancelled = true;
			clearTimeout(id);
		};
	}, [logrocketId]);

	return null;
}
