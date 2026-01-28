/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rout: {
          paper: '#F9F8F4',    // Very subtle cream
          soot: '#2C2C2C',     // Soft charcoal
          matcha: '#6B8E23',   // Muted sophisticated green
          spice: '#D2691E',    // Warm earthy tone (Chocolate/Cinnamon)
          gold: '#C5A059',     // Rich subtle gold
          stone: '#E5E5E0',    // Secondary background
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        decorative: ['"Cinzel Decorative"', 'cursive'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'widest': '.25em',
      }
    },
  },
  plugins: [],
}