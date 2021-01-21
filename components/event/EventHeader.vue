<template>
  <div>
    <h5 v-if="event.dates.length > 1" class="pb-2 pt-4">
      <span v-for="(date, index) in event.dates" :key="'date' + index">{{
        $dayjs(date).format('MMMM D, YYYY')
      }}</span>
    </h5>
    <h5 v-else class="pb-2 pt-4">
      {{ $dayjs(event.dates[0]).format('MMMM D, YYYY') }}
    </h5>
    <h1 class="pb-4">{{ eventTitle }}</h1>
  </div>
</template>

<script>
import event from '@/mixins/event.js'

export default {
  mixins: [event],
  computed: {
    event() {
      return this.$store.state.event.event
    }
  }
}
</script>
