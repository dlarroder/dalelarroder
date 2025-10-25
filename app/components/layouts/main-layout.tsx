import type { ReactNode } from 'react';
import SectionContainer from './section-container';

interface Props {
	children: ReactNode;
}

export default function MainLayout({ children }: Props) {
	return <SectionContainer>{children}</SectionContainer>;
}
