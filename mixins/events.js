export default {
  methods: {
    getImage(data, image, size) {
      return require(`~/assets${data.media.path.img}${image.basename}-${size}${image.ext}`)
    },
    getPdf(data, image) {
      return require(`~/assets${data.media.path.img}${image.basename}.pdf`)
    }
  }
}
