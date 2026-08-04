/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          deep: '#1a1a2e',
          DEFAULT: '#2d2d2d',
          light: '#6b6b6b',
        },
        gold: '#c9a962',
        cyan: '#64b5c6',
        paper: '#faf8f5',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
        sans: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(26, 26, 46, 0.08)',
        hover: '0 8px 30px rgba(26, 26, 46, 0.12)',
      },
    },
  },
  plugins: [],
}
