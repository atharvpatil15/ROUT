/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      './src/app/**/*.{js,jsx,ts,tsx,mdx}',
      './src/components/**/*.{js,jsx,ts,tsx,mdx}',
      './src/context/**/*.{js,jsx,ts,tsx}',
      './src/views/**/*.{js,jsx,ts,tsx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        vibe: {
          electric: '#00FF41', // Neon Green
          neon: '#FF00FF',     // Magenta
          sun: '#FFD700',      // Gold/Yellow
          sky: '#00D4FF',      // Bright Blue
          crimson: '#FF2D55',  // Vibrant Red
        },
        tl: {
          paper: '#F9F7F2', 
          soot: '#161616',  
          matcha: '#00FF41',
          forest: '#0A291A',
          spice: '#FF9900',
          gold: '#FFD700',
          stone: '#333333',
          wine: '#4c0c0f',
          ivory: '#F9F7F2',
        },
        brand: {
          cream: '#b38f6f',
          charcoal: '#161616',
          matcha: '#161616',
          gray: '#6B7280',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        decorative: ['"Cinzel Decorative"', 'cursive'],
        funky: ['Monoton', 'cursive'],
        crazy: ['"Bungee Shade"', 'cursive'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      letterSpacing: {
        widest: '.25em',
      },
      boxShadow: {
        pro: '0 12px 35px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        pro: '1.25rem',
      },
      keyframes: {
        'shiny-text': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'shiny-text': 'shiny-text 8s infinite linear',
      },
    },
  },
  plugins: [],
};
