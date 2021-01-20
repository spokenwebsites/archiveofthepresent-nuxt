<template>
  <header id="header" :class="{ home: isHome }">
    <b-container v-if="isHome" class="pb-4 pb-0-md">
      <div class="row align-items-md-center">
        <div
          class="col-lg-4 col-md-5 pt-md-0 pt-5 px-4 px-md-0 mt-md-0 mt-auto text-center text-md-left mb-md-0 mb-5"
        >
          <h4 class="mb-3 text-md-left text-center">
            SPOKENWEB ARCHIVE<br />OF THE PRESENT
          </h4>
          <b-img
            class="w-100 d-block d-md-none"
            src="~/assets/img/header-img_1000.png"
            fluid
            fluid-grow
          />
          <p class="mb-md-4 mb-0 pt-2-md pt-3 pt-md-0 text-md-left">
            Archive of the Present presents digital sound recordings, video, and
            print materials that document SpokenWeb events produced across the
            research network.
          </p>
          <b-button class="mt-4 d-md-block" variant="gradient" to="about">MORE ABOUT THE ARCHIVE →</b-button>
        </div>
        <div class="col-md col-12 offset-md-1 px-4 px-md-0 mb-5 mb-md-0 d-none d-md-block">
          <b-img
            class="py-md-5 py-3 mb-3 mb-md-0 w-100"
            src="~/assets/img/header-img_1000.png"
            fluid
            fluid-grow
          />
        </div>
      </div>
    </b-container>
    <b-container v-else>
      <p class="mt-5 mb-3">
        <b-link to="/">← Return</b-link>
      </p>
      <h4 class="text-md-left px-3">SPOKENWEB ARCHIVE<br />OF THE PRESENT</h4>
      <hr />
    </b-container>
  </header>
</template>
<script>
export default {
  computed: {
    name() {
      return this.$route.name
    },
    isHome() {
      return this.name === 'index'
    }
  }
}
</script>
<style lang="scss"></style>
