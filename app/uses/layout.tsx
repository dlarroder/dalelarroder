import { ReactNode } from 'react';
import SectionContainer from '../components/layouts/section-container';

export default function Layout({ children }: { children: ReactNode }) {
  return <SectionContainer>{children}</SectionContainer>;
}
