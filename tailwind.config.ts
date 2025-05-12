import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
       fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        sen: ['"Sen"', "sans-serif"],
      }
    },
  },
  plugins: [],
} satisfies Config