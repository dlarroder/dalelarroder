import { Copse, DM_Mono, DM_Sans, Merriweather_Sans, Mukta } from 'next/font/google';

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

export const dmSans = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const merryweatherSans = Merriweather_Sans({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-merryweather-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
