/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { accent: { DEFAULT: '#b4532a', dark: '#954321' }, charcoal: '#26262b', cream: '#faf8f5', sand: '#efe8de' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], serif: ['Fraunces', 'Georgia', 'serif'] },
    },
  },
  plugins: [],
}
