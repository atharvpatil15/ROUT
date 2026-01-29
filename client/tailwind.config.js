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
          soot: '#2C2C2C',     // Soft charcoal (Restored)
          matcha: '#6b8e23',   // Your new Matcha Green
          forest: '#1A2F23',   // Deep Forest Green
          spice: '#D2691E',    
          gold: '#C5A059',     
          stone: '#E5E5E0',    
          wine: '#4c0c0f',
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
