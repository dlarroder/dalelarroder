import type { ThemeRegistration } from 'shiki';

// Oxblood & gold syntax colours, matching the site palette in tailwind.css.
// Backgrounds come from --surface-raised there, so only token colours matter here.
// Every colour clears 4.5:1 on its theme's raised surface.
interface Palette {
	foreground: string;
	comment: string;
	keyword: string;
	string: string;
	func: string;
	type: string;
	attribute: string;
	punctuation: string;
}

function createTheme(
	name: string,
	type: 'light' | 'dark',
	palette: Palette,
): ThemeRegistration {
	return {
		name,
		type,
		colors: {
			'editor.foreground': palette.foreground,
		},
		tokenColors: [
			{
				settings: { foreground: palette.foreground },
			},
			{
				scope: ['comment', 'punctuation.definition.comment'],
				settings: { foreground: palette.comment, fontStyle: 'italic' },
			},
			{
				scope: [
					'keyword',
					'storage',
					'storage.type',
					'storage.modifier',
					'keyword.operator.new',
					'keyword.operator.expression',
					'keyword.operator.logical',
					'constant.language',
					'variable.language',
				],
				settings: { foreground: palette.keyword },
			},
			{
				scope: [
					'string',
					'string.template',
					'punctuation.definition.string',
					'constant.numeric',
					'constant.other',
					'support.constant',
					'markup.inline.raw',
				],
				settings: { foreground: palette.string },
			},
			{
				scope: [
					'entity.name.function',
					'support.function',
					'meta.function-call entity.name.function',
				],
				settings: { foreground: palette.func },
			},
			{
				scope: [
					'entity.name.type',
					'entity.name.class',
					'support.class',
					'support.type',
					'entity.name.tag',
					'support.class.component',
					'entity.other.inherited-class',
				],
				settings: { foreground: palette.type },
			},
			{
				scope: ['entity.other.attribute-name', 'meta.object-literal.key'],
				settings: { foreground: palette.attribute },
			},
			{
				scope: [
					'punctuation',
					'meta.brace',
					'keyword.operator',
					'punctuation.definition.tag',
				],
				settings: { foreground: palette.punctuation },
			},
			{
				scope: ['markup.heading', 'markup.bold'],
				settings: { foreground: palette.keyword, fontStyle: 'bold' },
			},
			{
				scope: ['markup.inserted'],
				settings: { foreground: palette.string },
			},
			{
				scope: ['markup.deleted'],
				settings: { foreground: palette.keyword },
			},
		],
	};
}

export const codeThemeLight = createTheme('oxblood-light', 'light', {
	foreground: '#1f1b18',
	comment: '#776e64',
	keyword: '#8e2c3b',
	string: '#8a6a2c',
	func: '#512328',
	type: '#74561f',
	attribute: '#5c544c',
	punctuation: '#5c544c',
});

export const codeThemeDark = createTheme('oxblood-dark', 'dark', {
	foreground: '#ece6dc',
	comment: '#8f867b',
	keyword: '#e08592',
	string: '#d4b06a',
	func: '#e7babb',
	type: '#e0c08a',
	attribute: '#b3a99c',
	punctuation: '#a39a8f',
});
