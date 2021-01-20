<template>
  <div id="app">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/global/Navbar.vue'
import Footer from '@/components/global/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
<style lang="scss">
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
