// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      API_BASE: process.env.API_BASE_URL || "https://v2.himasif.id/api",
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    ['@nuxt/image', {
      target: 'static',
    }],
    "@vueuse/nuxt",
  ],
  plugins: [
    // "~/plugins/countdown"
  ]
});
