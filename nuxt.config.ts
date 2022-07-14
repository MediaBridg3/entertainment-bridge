import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  privateRuntimeConfig: {
    eBridgePrivate: {
      API_KEY: process.env.API_KEY,
      TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
      TWITCH_SECRET: process.env.TWITCH_SECRET,
      MONGODB_URI: process.env.MONGODB_URI,
    }
  },
  meta: {
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600&family=Heebo:wght@900&display=swap',
      },
    ],
  },
  css: ['@/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/svg',
  ]
});
