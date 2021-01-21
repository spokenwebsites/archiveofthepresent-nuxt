<template>
  <div v-if="featuredAudio">
    <h6 class="pt-3">Audio</h6>
    <Audioplayer
      ref="audioplayer"
      class="size-lg"
      :audiofile="'/aud/' + featuredAudio.stream"
      :waveform-filename="featuredAudio.waveform"
      :event="event"
      :audio-height="54"
    />
  </div>
</template>

<script>
import event from '@/mixins/event.js'
import Audioplayer from '@/components/shared/Audioplayer'

export default {
  components: { Audioplayer },
  mixins: [event],
  props: {
    event: {
      type: Object,
      default: null
    }
  }
}
</script>
