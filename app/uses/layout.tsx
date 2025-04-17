import { ReactNode } from 'react';
import PageContainer from '../components/layouts/page-container';

export default function Layout({ children }: { children: ReactNode }) {
  return <PageContainer>{children}</PageContainer>;
}
