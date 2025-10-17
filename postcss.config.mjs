/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
  theme: {
    extend: {
        colors: {
        primary: '#0D1821',
        light: '#EFF1F3',
        accent: '#4E6E5D',
        sand: '#AD8A64',
        brick: '#A44A3F',
        },
    },
  },
};
export default config;
