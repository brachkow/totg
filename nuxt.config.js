export default {
  target: 'static',
  buildModules: ['@nuxtjs/tailwindcss'],
  plugins: [{ src: '~/plugins/v-clipboard.js', ssr: false }],
  head: {
    title: 'totg',
  },
};
