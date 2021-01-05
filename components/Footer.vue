<template>
  <footer id="footer" class="pt-5 mt-5 pb-4">
    <b-container>
      <div class="row">
        <div class="col-sm-6">
          <p>
            <b-link href="https://spokenweb.ca" target="_blank">SpokenWeb Home</b-link>
          </p>
        </div>
        <div class="col-sm-6 col-lg-5">
          <p>SpokenWeb is a SSHRC-funded partnership grant. All material that appears on this website is used for the purposes of academic research and critical study.</p>
          <p>
            <b-img src="~/assets/img/sshrc_white.png" width="139" />
          </p>
          <p>© 2010 - {{ new Date().getFullYear() }}. All rights reserved.</p>
        </div>
      </div>
    </b-container>
  </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style lang="scss">
</style>
