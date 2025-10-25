import { Copse, DM_Mono, Merriweather, Mukta } from 'next/font/google';

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

export const dmMono = DM_Mono({
	weight: ['300', '400', '500'],
	variable: '--font-dm-mono',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

export const merryWeather = Merriweather({
	weight: ['300', '400', '700', '900'],
	variable: '--font-merriweather',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});
