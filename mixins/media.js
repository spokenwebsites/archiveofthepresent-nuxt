export default {
  computed: {
    mediaPath() {
      return `media/${this.event.slug}`
    },
    imagePath() {
      return `${this.mediaPath}/img`
    }
  },
  methods: {
    getImage(image, size) {
      return require(`~/assets/${this.imagePath}/${image.basename}-${size}.jpg`)
    },
    getPdf(image) {
      return require(`~/assets${this.imagePath}${image.basename}.pdf`)
    }
  }
}
