import { Love_Light, Mukta } from 'next/font/google';

export const mukta = Mukta({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-mukta',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const loveLight = Love_Light({
  weight: '400',
  variable: '--font-love-light',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
