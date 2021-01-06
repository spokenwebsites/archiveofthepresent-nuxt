import events from '@/mixins/events.js'

export default {
  mixins: [events],
  computed: {
    showEventModal() {
      return this.$store.state.events.eventModal.show
    },
    showMediaModal() {
      return this.$store.state.events.mediaModal.show
    },
    modalData() {
      return this.$store.state.events.mediaModal.data
    },
    modalType() {
      return this.$store.state.events.mediaModal.type
    },
    modalTitle() {
      return this.modalType === 'poster' ? 'Event poster' : 'Additional Materials'
    },
    modalImg() {
      return this.$store.state.events.mediaModal.image
    },
    modalPdf() {
      return this.$store.state.events.mediaModal.pdf
    }
  },
  methods: {
    setEventModal(val) {
      this.$store.commit('events/setEventModal', val)
    },
    setMediaModal(val) {
      this.$store.commit('events/setMediaModal', val)
    },
    setMediaModalData(val) {
      this.$store.commit('events/setMediaModalData', val)
    },
    setMediaModalType(val) {
      this.$store.commit('events/setMediaModalType', val)
    },
    setMediaModalImage(val) {
      this.$store.commit('events/setMediaModalImage', val)
    },
    setMediaModalPdf(val) {
      this.$store.commit('events/setMediaModalPdf', val)
    },
    openEventModal(data) {
      this.setEventModal(true)
      this.updateCurrentEvent(data)
      this.$nextTick(() => {
        this.$bvModal.show('modal')
      })
    },
    updateCurrentEvent(val) {
      this.$store.commit('events/updateCurrentEvent', val)
    },
    hideEventModal() {
      this.setEventModal(false)
    },
    openMediaModal(data, image, type) {
      this.setMediaModal(true)
      this.setMediaModalData(image)
      this.setMediaModalType(type)
      this.setMediaModalImage({
        lg: this.getImage(data, image, '800'),
        sm: this.getImage(data, image, '10')
      })
      this.setMediaModalPdf(image.pdf ? this.getPdf(data, image) : null)

      this.$nextTick(() => {
        this.$bvModal.show('modal')
      })
      history.pushState('', '', '/' + this.event.slug)
    },
    hideMediaModal() {
      this.setMediaModal(false)
      this.setMediaModalType(null)
      this.setMediaModalImage({
        lg: null,
        sm: null
      })
      this.setMediaModalData(null)
      this.setMediaModalPdf(null)
    }
  }
}
