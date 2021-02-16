export default {
  target: 'static',
  modules: ['@nuxt/content'],
  buildModules: ['@nuxtjs/tailwindcss'],
  plugins: [{ src: '~/plugins/v-clipboard.js', ssr: false }],
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content');
      const files = await $content().only(['path']).fetch();

      return files.map((file) => (file.path === '/index' ? '/' : file.path));
    },
  },
};
