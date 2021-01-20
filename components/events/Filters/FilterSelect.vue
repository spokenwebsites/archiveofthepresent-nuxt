<template>
  <div>
    <label class="mr-sm-2" :for="type">{{ label }}</label>
    <b-form-select
      :id="type"
      class="mb-4"
      :name="type"
      :value="filters[type]"
      @change="resetFilters(type)"
      @input="setFilter(type, $event)"
    >
      <FilterOption option="" />
      <FilterOption
        v-for="(option, index) in data"
        :key="type + index"
        :type="optionType"
        :option="option"
      />
    </b-form-select>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import filters from '@/mixins/filters.js'
import FilterOption from './FilterOption.vue'

export default {
  components: { FilterOption },
  mixins: [helpers, filters],
  props: {
    type: {
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
      console.log(type, val)
      this.$store.commit('events/setFilterType', type)
      this.$store.commit('events/setFilterValue', val)
    }
  }
}
</script>
