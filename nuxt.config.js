import path from 'path'
import fs from 'fs'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'first-nuxt-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" },
    ],
    script: [
      {src: 'https://aframe.io/releases/1.2.0/aframe.min.js'},
      {src: 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js'},
      {src: 'https://unpkg.com/aframe-environment-component/dist/aframe-environment-component.min.js'},
      {src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // プロジェクト内の CSS ファイル
    '@/assets/css/main.css',
    // プロジェクト内の SCSS ファイル
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/firebase.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  generate: {
    dir: 'public'
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./ssl/localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./ssl/localhost.pem"))
    },
  },

  vue: {
    config:{
      ignoredElements: [
        'a-scene',
        'a-entity',
        'a-camera',
        'a-box',
        'a-ring',
        'a-asset-items',
        'a-asset-item',
        'a-assets',
        'a-cursor',
        'a-text',
        'a-light',
      ],
      productionTip: false,
      devtools: true
    }
  }
}
