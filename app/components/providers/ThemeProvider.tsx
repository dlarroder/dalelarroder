'use client';

import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
	useTheme,
} from 'next-themes';
import { useEffect } from 'react';

// Matches the body background, so mobile browser toolbars blend with the page
const THEME_COLORS: Record<string, string> = {
	light: '#ffffff',
	dark: '#000000',
};

function ThemeColorSync() {
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		const color = resolvedTheme && THEME_COLORS[resolvedTheme];
		if (!color) return;
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', color);
	}, [resolvedTheme]);

	return null;
}

export default function ThemeProvider({
	children,
	...props
}: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<ThemeColorSync />
			{children}
		</NextThemesProvider>
	);
}
