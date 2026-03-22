'use client';

import rocket from 'logrocket';
import { useEffect } from 'react';

export default function LogRocket() {
	const logrocketId = process.env.NEXT_PUBLIC_LOGROCKET_ID || '';

	useEffect(() => {
		if (!logrocketId) {
			return;
		}

		rocket.init(logrocketId);
	}, [logrocketId]);

	return null;
}
