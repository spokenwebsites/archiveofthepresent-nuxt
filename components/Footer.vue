<template lang="pug">
footer#footer.pt-5.mt-5.pb-4
  b-container
    .row
      .col-sm-6
        p
          b-link(href="https://spokenweb.ca", target="_blank") SpokenWeb Home
      .col-sm-6.col-lg-5
        p SpokenWeb is a SSHRC-funded partnership grant. All material that appears on this website is used for the purposes of academic research and critical study.
        p
          b-img(src="~/assets/img/sshrc_white.png", width="139")
        p © 2010 - {{ new Date().getFullYear() }}. All rights reserved.
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style lang="sass">
</style>
