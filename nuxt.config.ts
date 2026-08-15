import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "nuxt-auth-utils", "@nuxt/image"],
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  image: {
    dir: process.env.IMAGES_DIR,
  },
  nitro: {
    storage: {
      uploads: {
        driver: "fs",
        base: process.env.UPLOADS_DIR,
      },
    },
  },
});
