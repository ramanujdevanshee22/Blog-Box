/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        SecondaryPink: '#ec669f',
        SecondaryPurple: '#7f5df6',
        SecondaryOrange:'#FFA836',
        PriamryGrey: '#eff18f',
        PrimaryBlack:'#010001'
        
      },
    },
    boxShadow: {
      'xl': '0 10px 20px rgba(0, 0, 0, 0.25)',
    },
    fontFamily: {
      'quicksand': ['Quicksand', 'sans-serif'],
      'Merriweather': ['Merriweather', 'serif'],
      'WorkSans': ['Work Sans', 'sans-serif'],
      'lato': ["Lato", 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
