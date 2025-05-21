// tailwind.config.ts
const { heroui } = require("@heroui/react");

import type { Config } from 'tailwindcss'

export default {
  content: [
'./app/**/*.{js,jsx,ts,tsx}',
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()]
} satisfies Config