'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/** Dev only: re-renders server components when an MDX file is saved. */
export default function ContentRefresh() {
	const router = useRouter();

	useEffect(() => {
		const source = new EventSource('/api/content-changes');
		let timeout: ReturnType<typeof setTimeout> | undefined;

		source.onmessage = () => {
			// Editors often fire several fs events per save; refresh once
			clearTimeout(timeout);
			timeout = setTimeout(() => router.refresh(), 50);
		};

		return () => {
			clearTimeout(timeout);
			source.close();
		};
	}, [router]);

	return null;
}
