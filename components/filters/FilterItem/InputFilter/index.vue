<template>
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
</template>

<script>
import helpers from '@/mixins/helpers.js'
import filters from '@/mixins/filters.js'

export default {
  mixins: [helpers, filters],
  props: {
    name: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    optionType() {
      return this.type !== 'years' ? 'name' : 'date'
    }
  },
  methods: {
    setFilter(type, val) {
      this.$store.commit('events/setFilterType', type)
      this.$store.commit('events/setFilterValue', val)
    }
  }
}
</script>
