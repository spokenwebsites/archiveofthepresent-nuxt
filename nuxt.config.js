export default {

  dev: (process.env.NODE_ENV !== 'production'),

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  ssr: true,
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */

  head: {
    title: 'SpokenWeb Archive of the Present',
    titleTemplate: '%s - SpokenWeb Archive of the Present',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no,maximum-scale=1.0' },
      { hid: 'description', name: 'description', content: process.env.PROJECT_DESCRIPTION || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/rmr6mit.css' },
      { rel: 'stylesheet', href: '/open-iconic/font/css/open-iconic-bootstrap.css' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/vue-moment.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
    'vue-scrollto/nuxt'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */

  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  build: {
    extractCSS: true,
    extend(config, ctx) {
      config.module.rules.push(
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.(pdf)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.(yaml)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      )
    }
  }
}
