<template>
  <div>
    <div v-if="filteredEvents.length >= 1" class="row">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        class="col-md-6 col-lg-4 pb-4 px-md-2 px-4"
      />
    </div>
    <div v-else class="row">
      <div class="col">
        <h6 class="text-center pt-4">
          There are no events that match the keyword: "{{
            filters.keywords
          }}".
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import filters from '@/mixins/filters.js'

export default {
  mixins: [helpers, filters],
  props: {
    events: {
      type: Array,
      default: null
    }
  },
  computed: {
    filters() {
      return this.$store.state.events.filters
    }
  }
}
</script>
