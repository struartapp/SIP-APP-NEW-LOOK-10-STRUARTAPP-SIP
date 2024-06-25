/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    './js/**/*.js',
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'spin-slow': 'spin 4s ',
        'spin-fast': 'spin 100ms',
        'pulse-slow': 'pulse 20s',
        'bounce-fast': 'bounce 500ms'
      
      }
    },
  },
  plugins: [],
};
//taiwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'spin-slow': 'spin 3s ',
//       }
//     }
//   }
// }

// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         // Bounces 5 times 1s equals 5 seconds
//         'bounce-short': 'bounce 1s ease-in-out 5'
//       }
//     }
//   }
// }