<template>
  <div>
    <label class="mr-sm-2" :for="name">{{ label }}</label>
    <b-form-select
      :id="name"
      class="mb-4"
      :name="name"
      :value="filters[name]"
      @change="resetFilters(name)"
      @input="setFilter(name, $event)"
    >
      <FilterOption option="" />
      <FilterOption
        v-for="(option, index) in data"
        :key="name + index"
        :format="optionType"
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
      return this.name !== 'years' ? 'name' : 'date'
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
