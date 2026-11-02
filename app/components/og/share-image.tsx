import { ImageResponse } from 'next/og';

// Share images and icons are rendered at build time with Satori, which
// needs raw font files rather than next/font, so Mukta is fetched from
// Google Fonts. On a failed fetch they fall back to Satori's default font
// instead of failing the build.
const PAPER = '#faf8f4';
const INK = '#1f1b18';
const MUTED = '#776e64';
const OXBLOOD = '#8e2c3b';

export const shareImageSize = { width: 1200, height: 630 };

type FontWeight = 400 | 500 | 700;

async function loadMukta(weight: FontWeight, text?: string) {
	const params = new URLSearchParams({ family: `Mukta:wght@${weight}` });
	if (text) params.set('text', text);

	try {
		const css = await fetch(
			`https://fonts.googleapis.com/css2?${params.toString()}`,
		).then((res) => res.text());
		const url = css.match(
			/src: url\((.+?)\) format\('(opentype|truetype)'\)/,
		)?.[1];
		if (!url) return null;

		const data = await fetch(url).then((res) => res.arrayBuffer());
		return { name: 'Mukta', data, weight, style: 'normal' as const };
	} catch {
		return null;
	}
}

async function loadFonts(weights: FontWeight[], text?: string) {
	const fonts = await Promise.all(
		weights.map((weight) => loadMukta(weight, text)),
	);
	return fonts.filter((font) => font !== null);
}

function Disc({ size }: { size: number }) {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: size,
				height: size,
				borderRadius: '50%',
				background: OXBLOOD,
				color: PAPER,
				fontSize: size * 0.72,
				fontWeight: 700,
				lineHeight: 1,
				// Mukta sits high in its line box, so nudge the d down to centre it
				paddingTop: size * 0.06,
			}}
		>
			d
		</div>
	);
}

interface ShareImageProps {
	kicker: [string, string];
	title: string;
	// A word in the title to underline in oxblood, like the home page hero
	highlight?: string;
}

// Editorial layout: paper ground, an oxblood edge, title doing the work
export async function renderShareImage({
	kicker,
	title,
	highlight,
}: ShareImageProps) {
	const words = title.split(' ');

	return new ImageResponse(
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				background: PAPER,
				color: INK,
				fontFamily: 'Mukta',
			}}
		>
			<div style={{ width: 14, height: '100%', background: OXBLOOD }} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					flex: 1,
					padding: '80px 88px 76px 74px',
				}}
			>
				<div style={{ display: 'flex', gap: 14, fontSize: 28, color: MUTED }}>
					<span style={{ color: OXBLOOD, fontWeight: 500 }}>{kicker[0]}</span>
					<span>·</span>
					<span>{kicker[1]}</span>
				</div>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						maxWidth: 960,
						fontSize: 76,
						fontWeight: 700,
						lineHeight: 1.08,
						letterSpacing: '-0.02em',
					}}
				>
					{/* One span per word so long titles wrap between any two words */}
					{words.map((word, index) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: titles can repeat words
							key={index}
							style={{
								marginRight: index < words.length - 1 ? 20 : 0,
								...(word === highlight && {
									fontWeight: 500,
									borderBottom: `5px solid ${OXBLOOD}`,
								}),
							}}
						>
							{word}
						</span>
					))}
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						fontSize: 26,
						color: MUTED,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							color: INK,
							fontWeight: 500,
						}}
					>
						<Disc size={52} />
						Dale Larroder
					</div>
					<span>dalelarroder.com</span>
				</div>
			</div>
		</div>,
		{ ...shareImageSize, fonts: await loadFonts([400, 500, 700]) },
	);
}

// Favicon and home-screen icon: a paper d in an oxblood disc
export async function renderIcon(size: number) {
	return new ImageResponse(
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				fontFamily: 'Mukta',
				// iOS masks home-screen icons itself, so give it a full square
				background: size >= 180 ? OXBLOOD : 'transparent',
			}}
		>
			<Disc size={size} />
		</div>,
		{ width: size, height: size, fonts: await loadFonts([700], 'd') },
	);
}
