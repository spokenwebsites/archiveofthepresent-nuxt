<template>
  <div>
    <InputFilter
      v-if="type === 'input'"
    />
    <SelectFilter
      v-if="type === 'select'"
      :label="label"
      :name="name"
      :data="data"
    />
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import filters from '@/mixins/filters.js'
import SelectFilter from './SelectFilter'
import InputFilter from './InputFilter'

export default {
  components: { SelectFilter, InputFilter },
  mixins: [helpers, filters],
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    label() {
      return this.item.label
    },
    name() {
      return this.item.name
    },
    type() {
      return this.item.type
    },
    data() {
      return this.item.data
    }
  }
}
</script>
