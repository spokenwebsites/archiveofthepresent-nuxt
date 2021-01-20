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
      const ext = image.ext.replace('pdf', 'jpg')
      return require(`~/assets/${this.imagePath}/${image.basename}-${size}${ext}`)
    },
    getPdf(image) {
      return require(`~/assets${this.imagePath}${image.basename}.pdf`)
    },
    getVideoType(video) {
      return video.file_url.includes('youtube') ? 'youtube' : 'file'
    },
    getVideoIdByUrl(url, type = 'youtube') {
      const queryString = url.split('?')[1]
      const urlParams = new URLSearchParams(queryString)
      return type === 'youtube' ? urlParams.get('v') : null
    }
  }
}
