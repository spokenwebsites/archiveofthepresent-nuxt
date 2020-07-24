<template lang="pug">
header#header
  b-navbar
    b-container.flex-md-row-reverse
      b-navbar-toggle(target="nav-text-collapse")
      b-navbar-brand
          b-link(href="https://spokenweb.ca/", target="_blank")
            b-img(src="~/assets/img/logo_long_black.png", alt="SpokenWeb", height="34")
  b-container(v-if="title=='Home'")
    .row.align-items-md-center

      .col-lg-4.col-md-5.pt-md-0.pt-5.px-4.px-md-0.mt-md-0.mt-auto
        h4.mb-3.text-md-left.text-center
          | SPOKENWEB ARCHIVE
          br
          | OF THE PRESENT
        p.mb-md-4.mb-0.pt-2.pt-md-0.d-none.d-md-block Archive of the Present presents digital sound recordings, video, and print materials that document SpokenWeb events produced across the research network.
        b-button.mt-4.d-none.d-md-block(variant="gradient", to="about") MORE ABOUT THE ARCHIVE →
      .col.offset-md-1.px-4.px-md-0.mb-5.mb-md-0
        b-img.py-md-5.py-3.mb-3.mb-md-0.w-100(src="~/assets/img/header-img_1000.png", fluid, fluid-grow)
        p.mb-4.d-block.d-md-none.text-center.text-md-left Archive of the Present presents digital sound recordings, video, and print materials that document SpokenWeb events produced across the research network.
      b-button.mt-4.d-block.d-md-none.mb-5.mx-auto(variant="gradient", to="about") MORE ABOUT THE ARCHIVE →
  b-container(v-else)
    p.mt-5.mb-3
      b-link(to="/") ← Return
    h4.text-md-left.px-3
      | SPOKENWEB ARCHIVE
      br
      | OF THE PRESENT
    hr
</template>
<script>
export default {
  name: 'Header',
  props: [
    'title'
  ]
}
</script>
<style lang="sass">
</style>
