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
      },
      colors: {
        light: {
          background: '#f8fafc',
          primary: '#020817',
          secondary: '#334155',
          text: '#1e293b',
          border: '#e2e8f0',
          accent: '#3b82f6'
        },
        dark: {
          background: '#000000',
          primary: '#f8fafc',
          secondary: '#94a3b8',
          text: '#f8fafc',
          border: '#334155',
          accent: '#3b82f6'
        }
      }
    },
  },
  plugins: [],
} satisfies Config