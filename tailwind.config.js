module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        worksans: ['WorkSans', 'sans-serif'],
        rational: ['Rational', 'sans-serif'],
        drukBold: ['DrukBold', 'sans-serif'],
        drukMedium: ['DrukMedium', 'sans-serif'],
        drukHeavy: ['DrukHeavy', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        interBold: ['InterBold', 'sans-serif'],
        grotesk: ['Grotesk', 'sans-serif'],
      },
      animation: {
        fadein: 'fadein .5s',
        fadeout: 'fadeout .5s',
        'spin-slow': 'spin 9s linear infinite',
        arrow: 'arrow 2s infinite',
        ninja_bounce: 'ninja_bounce 0.5s infinite',
      },
      keyframes: {
        fadein: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        ninja_bounce: {
          '0%': {
            transform: 'translate3d(0px, 0px, 0)',
          },
          '50%': {
            transform: 'translate3d(0px, -4px, 0)',
          },
          '100%': {
            transform: 'translate3d(0px, 0px, 0)',
          },
        },
        fadeout: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        arrow: {
          '0%': { opacity: 0 },
          '40%': { opacity: 1 },
          '80%': { opacity: 0 },
          '100%': { opacity: 0 },
        },
        spin: {
          '0%': {
            width: '7rem',
            'animation-timing-function': 'ease-in',
          },
          '49.999%': {
            width: '0.1rem',
            transform: 'translateX(-0.375rem)',
            'animation-timing-function': 'linear',
          },

          '50.001%': {
            width: '0.1rem',
            transform: 'translateX(0.375rem)',
            'animation-timing-function': 'ease-out',
          },

          '100%': {
            width: '7rem',
          },
        },
      },
      colors: {
        'background-dark': '#00000099',
      },
      transitionProperty: {
        height: 'height',
      },
      minWidth: {
        '1/2': '50%',
      },
    },
  },
  variants: {
    animation: ['motion-safe'],
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin'), require('tailwindcss-animation-delay')],
};
