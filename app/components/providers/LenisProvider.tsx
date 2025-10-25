'use client';

import { ReactLenis } from 'lenis/dist/lenis-react';
import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function LenisProvider({ children }: Props) {
	return <ReactLenis root>{children}</ReactLenis>;
}
