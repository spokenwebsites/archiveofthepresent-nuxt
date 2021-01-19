export default {
  computed: {
    featuredImage() {
      return this.event.media.images
        ? this.event.media.featured.image
            ? this.event.media.featured.image[0]
            : this.event.media.images[0]
        : null
    },
    featuredAudio() {
      return this.event.media.audio
        ? this.event.media.featured.audio
            ? this.event.media.featured.audio[0]
            : this.event.media.audio[0]
        : null
    },
    featuredVideo() {
      return this.event.media.video
        ? this.event.media.featured.video
            ? this.event.media.featured.video[0]
            : this.event.media.video[0]
        : null
    }
  }
}
