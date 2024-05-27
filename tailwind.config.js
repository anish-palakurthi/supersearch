// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',    // Include all .js, .ts, .jsx, .tsx files in the src/pages directory and its subdirectories
    './src/components/**/*.{js,ts,jsx,tsx}', // Include all .js, .ts, .jsx, .tsx files in the src/components directory and its subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
