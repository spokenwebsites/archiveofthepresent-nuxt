<template>
  <b-modal id="modal" size="lg" no-fade hide-footer>
    <b-container class="mb-5">
      <h6 class="pb-3">May 30, 2019</h6>
      <h2 class="pb-4">{{ currentEvent.title }}</h2>
      <p class="pre-wrap pb-4 font-italic">{{ currentEvent.description }}</p>
      <hr />
      <p class="pt-4">
        <audio :src="'/aud/'+currentEvent.fileStream" controls></audio>
        <Audioplayer ref="audioplayer" :audiofile="'/aud/'+currentEvent.fileStream" :waveform="'/waveforms/'+currentEvent.waveform" :event="event" />
      </p>
    </b-container>
  </b-modal>
</template>
<script>
import Audioplayer from '@/components/Audioplayer'
export default {
  name: 'Modal',
  components: {
    Audioplayer
  },
  props: {
    event: {
      type: String,
      default: null
    }
  },
  computed: {
    currentEvent() {
      return this.$store.state.events.currentEvent
    }
  },
  methods: {
    openModal() {
      this.$bvModal.show('modal')
    }
  }
}
</script>
<style lang="scss"></style>
