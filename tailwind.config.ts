type CustomScreen = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
};

const SCREENS: CustomScreen = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
};

function screenToPx(screen: number) {
  return `${screen}px`;
}

function screenUp(screen: number) {
  return { min: screenToPx(screen) };
}

function screenDown(screen: number) {
  return { max: screenToPx(screen - 1) };
}

module.exports = {
  mode: 'jit', //  Just-In-Time (JIT) only compile the CSS classes that are actually used
  darkMode: 'class',
  content: [
    './app/**/*.{html,js,ts,tsx}',
    './components/**/*.{html,js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          secondary: 'var(--background-secondary)',
        },
        foreground: 'hsl(var(--foreground))',
        border: '#B4B6B5',
        success: '#177f3d',
        warning: '#ca8a04',
        error: '#b91d1b',
        primary: 'hsl(var(--primary))',
        icon: 'var(--icon)',
        text: {
          light: 'var(--text-light)',
          dark: 'var(--text-dark)',
        },
      },
      boxShadow: {
        shadow: 'var(--shadow-inset)',
      },
      screens: {
        xsDown: screenDown(SCREENS.sm),

        sm: screenUp(SCREENS.sm),
        smDown: screenDown(SCREENS.md),

        md: screenUp(SCREENS.md),
        mdDown: screenDown(SCREENS.lg),

        lg: screenUp(SCREENS.lg),
        lgDown: screenDown(SCREENS.xl),

        xl: screenUp(SCREENS.xl),
        xlDown: screenDown(SCREENS['2xl']),

        '2xl': screenUp(SCREENS['2xl']),
        '2xlDown': screenDown(SCREENS['3xl']),

        '3xl': screenUp(SCREENS['3xl']),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      transitionProperty: {
        height: 'height',
      },
      variants: {
        height: ['responsive', 'hover', 'focus'],
      },
    },
  },
  variants: [
    'responsive',
    'group-hover',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ],
  plugins: [require('tailwindcss-animate')],
};
