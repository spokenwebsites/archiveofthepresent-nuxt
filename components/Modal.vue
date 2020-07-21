<template lang="pug">
b-modal#modal(size="lg", no-fade, hide-footer, v-if="")
    b-container.mb-5
      h6.pb-3 May 30, 2019
      h2.pb-4 {{ currentEvent.title }}
      p.pre-wrap.pb-4.font-italic {{ currentEvent.description }}
      hr
      p.pt-4
        audio(:src="'/aud/'+currentEvent.fileStream", controls)
        Audioplayer(ref="audioplayer", :audiofile="'/aud/'+currentEvent.fileStream", :waveform="'/waveforms/'+currentEvent.waveform", :event="event")
</template>
<script>
import Audioplayer from '@/components/Audioplayer'
export default {
  name: 'Modal',
  props: [
    'event'
  ],
  components: {
    Audioplayer
  },
  data () {
    return {
      // status: 'paused'
    }
  },
  mounted () {

  },
  methods: {
    openModal () {
      this.$bvModal.show('modal')
    }
  },
  computed: {
    currentEvent () {
      return this.$store.state.events.currentEvent
    }
  }
}
</script>
<style lang="sass">

</style>
