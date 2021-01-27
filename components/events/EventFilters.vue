<template>
  <div class="filters">
    <FilterGroup :filters="eventFilters" />
    <ResetFilter />
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import events from '@/mixins/events.js'
import filters from '@/mixins/filters.js'
import ResetFilter from '@/components/filters/FilterItem/ResetFilter'
import FilterGroup from '@/components/filters/FilterGroup'

export default {
  components: { FilterGroup, ResetFilter },
  mixins: [helpers, events, filters],
  computed: {
    eventFilters() {
      return [
        {
          label: 'Keywords',
          name: 'keywords',
          type: 'input',
          data: this.master.keywords
        },
        {
          label: 'Presenters',
          name: 'presenters',
          type: 'select',
          data: this.master.presenters
        },
        {
          label: 'Performers',
          name: 'performers',
          type: 'select',
          data: this.master.performers
        },
        {
          label: 'Speakers',
          name: 'speakers',
          type: 'select',
          data: this.master.speakers
        },
        {
          label: 'Year',
          name: 'years',
          type: 'select',
          data: this.master.years
        }
      ]
    }
  }
}
</script>
