import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: 'border 5s linear infinite',
      },
      keyframes: {
        border: {
          '0%': { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        }
      }                      
    },
  },
  plugins: [
    daisyui
  ],
}