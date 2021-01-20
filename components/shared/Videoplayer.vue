<template>
  <div>
    <div v-if="isYoutube" class="py-3">
      <b-embed
        type="iframe"
        aspect="16by9"
        :src="`https://www.youtube.com/embed/${videoId}?rel=0`"
        allowfullscreen
      ></b-embed>
    </div>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import media from '@/mixins/media.js'

export default {
  mixins: [helpers, media],
  props: {
    video: {
      type: Object,
      default: null
    }
  },
  computed: {
    videoUrl() {
      return this.video.file_url
    },
    videoType() {
      return this.getVideoType(this.video)
    },
    isYoutube() {
      return this.videoType === 'youtube'
    },
    videoId() {
      return this.videoType === 'youtube'
        ? this.getVideoIdByUrl(this.videoUrl)
        : null
    }
  }
}
</script>
