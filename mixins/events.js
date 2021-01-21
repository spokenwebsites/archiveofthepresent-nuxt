import helpers from '@/mixins/helpers.js'

export default {
  mixins: [helpers],
  computed: {
    events() {
      return this.$store.state.events.events
    },
    master() {
      return this.$store.state.events.master
    }
  }
}
