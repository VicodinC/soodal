import UnpluginComponentsVite from "unplugin-vue-components/vite";
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },
  windicss: {
    config: {
      attributify: true,
    },
  },
  modules: ['nuxt-windicss'],
  experimental: {
    reactivityTransform: false,
  },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
    ],
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
