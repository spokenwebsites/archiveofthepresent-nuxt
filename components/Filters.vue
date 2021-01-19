<template>
  <div class="filters">

    <label class="mr-sm-2 h6" for="keywords">Filter By</label>
    <b-form-input
      id="keywords"
      class="mb-4"
      onfocus="this.select()"
      type="text"
      name="filterKeywords"
      placeholder="Search by keywords"
      debounce="500"
      @input="setFilterKeywords($event)"
    ></b-form-input>

    <FilterSelect
      label="Presenters"
      type="presenters"
      :data="master.presenters"
    />
    <FilterSelect
      label="Performers"
      type="performers"
      :data="master.performers"
    />
    <FilterSelect
      label="Speakers"
      type="speakers"
      :data="master.speakers"
    />
    <FilterSelect
      label="Year"
      type="years"
      :data="master.years"
    />

    <div class="text-center">
      <b-button variant="red" @click="resetFilters('none')">Reset Filters</b-button>
    </div>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import filters from '@/mixins/filters.js'
import FilterSelect from '@/components/FilterSelect.vue'

export default {
  components: { FilterSelect },
  mixins: [helpers, filters],
  props: {
    events: {
      type: Array,
      default: null
    },
    master: {
      type: Object,
      default: null
    }
  }
}
</script>
