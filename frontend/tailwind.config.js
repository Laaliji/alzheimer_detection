/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-blue': '#4A90E2',
        'primary-light': '#E8F4F8',
        'secondary-green': '#7ED8A9',
        'accent-teal': '#5DADE2',
        'bg-gray': '#F5F7FA',
        'text-dark': '#2C3E50',
        'text-gray': '#7F8C8D',
        'border-light': '#E1E8ED',
        // Dark mode colors
        'dark-bg': '#1a202c',
        'dark-bg-secondary': '#2d3748',
        'dark-bg-tertiary': '#4a5568',
        'dark-text': '#e2e8f0',
        'dark-text-secondary': '#cbd5e0',
        'dark-border': '#4a5568',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(74, 144, 226, 0.1)',
        'medium': '0 4px 12px rgba(74, 144, 226, 0.1)',
        'dark-soft': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'dark-medium': '0 4px 12px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
