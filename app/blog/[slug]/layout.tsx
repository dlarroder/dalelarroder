import { ReactNode } from 'react';
import MainLayout from '../../../components/layouts/MainLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
