import { Copse, Mukta } from 'next/font/google';

export const mukta = Mukta({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-mukta',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const copse = Copse({
  weight: '400',
  variable: '--font-copse-swash',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
