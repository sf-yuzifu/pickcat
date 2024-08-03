/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '1180px': '1180px',
      },
      Height: {
        '64px': '64px',
        '4.5': '1.125rem',
      },
      spacing: {
        '64px': '64px',
        '4.5': '1.125rem',
      },
    },
  },
  plugins: [],
}
