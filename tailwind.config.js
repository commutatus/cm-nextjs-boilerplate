module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./common/components/**/*.{js,ts,jsx,tsx}",
    "./common/components-ui/**/*.{js,ts,jsx,tsx}",
    "./common/components-helpers/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false,
  },
}
