const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx', './lib/**/*.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
        0.75: '0.1875rem',
        'content-sm': 'calc(100vh - 4.5rem)',
        content: 'calc(100vh - 4rem)',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      letterSpacing: {
        tightest: '-.075em',
      },
      fontSize: {
        '8.5xl': '7rem',
      },
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      gradientColorStops: {
        'gradient-1-start': '#334155',
        'gradient-1-end': '#475569',
        'gradient-2-start': '#4b5563',
        'gradient-2-end': '#374151',
        'gradient-3-start': '#52525b',
        'gradient-3-end': '#3f3f46',
      },
      colors: {
        primary: {
          100: '#566e8f',
          200: '#4d6280',
          300: '#435670',
          400: '#394960',
          500: '#303d50',
          600: '#263140',
          700: '#1d2530',
          800: '#131820',
          900: '#0a0c10',
        },
        success: {
          100: '#E4FCDB',
          200: '#C3FAB9',
          300: '#99F193',
          400: '#74E377',
          500: '#49D159',
          600: '#35B34F',
          700: '#249647',
          800: '#17793D',
          900: '#0E6437',
        },
        info: {
          100: '#CCFCFF',
          200: '#99F2FF',
          300: '#66E2FF',
          400: '#3FCEFF',
          500: '#00AEFF',
          600: '#0087DB',
          700: '#0065B7',
          800: '#004793',
          900: '#00337A',
        },
        warning: {
          100: '#FEF1CF',
          200: '#FDE09F',
          300: '#FBC96F',
          400: '#F8B24B',
          500: '#F48E11',
          600: '#D1700C',
          700: '#AF5508',
          800: '#8D3D05',
          900: '#752D03',
        },
        danger: {
          100: '#FFDCD3',
          200: '#FFB1A8',
          300: '#FF7D7C',
          400: '#FF5C6A',
          500: '#FF264D',
          600: '#DB1B50',
          700: '#B7134F',
          800: '#930C4A',
          900: '#7A0747',
        },
        'spotify-green': '#1DB954',
        green: colors.cyan,
        yellow: colors.neutral,
        purple: colors.cyan,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.gray.700'),
              '&:hover': {
                color: theme('colors.gray.700'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.green.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code:before': {
              content: 'none',
            },
            'code:after': {
              content: 'none',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.500'),
            },
            'ul li > :last-child': {
              margin: 0,
            },
            'ul li > :first-child': {
              margin: 0,
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.gray.300'),
              '&:hover': {
                color: theme('colors.gray.300'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            'ul li > :last-child': {
              margin: 0,
            },
            'ul li > :first-child': {
              margin: 0,
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
