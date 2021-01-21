<template>
  <b-form-select-option v-if="!option" value="">Show All</b-form-select-option>
  <b-form-select-option v-else :value="optionFormatted">{{ optionFormatted }}</b-form-select-option>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import filters from '@/mixins/filters.js'

export default {
  mixins: [helpers, filters],
  props: {
    option: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: null
    }
  },
  computed: {
    optionFormatted() {
      return this.format === 'name' ? this.displayName(this.option) : this.option
    }
  }
}
</script>
