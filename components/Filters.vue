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
    <label class="mr-sm-2" for="presenters">Presenters</label>
    <b-form-select
      id="presenters"
      class="mb-4"
      name="presenters"
      :value="filters.presenters"
      @change="resetFilters('presenters')"
      @input="setFilterPresenters($event)"
    >
      <b-form-select-option value="">Show All</b-form-select-option>
      <b-form-select-option
        v-for="(presenter, index) in master.creators"
        :key="'presenters' + index"
        :value="presenter"
      >{{ presenter }}</b-form-select-option>
    </b-form-select>
    <label class="mr-sm-2" for="performers">Performers</label>
    <b-form-select
      id="performers"
      class="mb-4"
      name="performers"
      :value="filters.performers"
      @change="resetFilters('performers')"
      @input="setFilterPerformers($event)"
    >
      <b-form-select-option value="">Show All</b-form-select-option>
      <b-form-select-option
        v-for="(performer, index) in master.contributors"
        :key="'performers' + index"
        :value="performer"
      >{{ performer }}</b-form-select-option>
    </b-form-select>
    <label class="mr-sm-2" for="years">Year</label>
    <b-form-select
      id="years"
      class="mb-4"
      name="years"
      :value="filters.years"
      @change="resetFilters('years')"
      @input="setFilterYears($event)"
    >
      <b-form-select-option value="">Show All</b-form-select-option>
      <b-form-select-option
        v-for="(year, index) in master.years"
        :key="'years' + index"
        :value="year"
      >{{ year }}</b-form-select-option>
    </b-form-select>
    <div class="text-center">
      <b-button variant="red" @click="resetFilters('none')">Reset Filters</b-button>
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
    },
    master: {
      type: Object,
      default: null
    }
  }
}
</script>
