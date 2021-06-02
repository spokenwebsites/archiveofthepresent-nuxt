<template>
  <div v-if="featuredVideo">
    <h6 class="pt-3">video</h6>
    <Videoplayer :video="featuredVideo" :poster="featuredImage" />
  </div>
</template>

<script>
import event from '@/mixins/event.js'
import Videoplayer from '@/components/shared/Videoplayer'

export default {
  components: { Videoplayer },
  mixins: [event],
  computed: {
    event() {
      return this.$store.state.event.event
    }
  }
}
</script>
