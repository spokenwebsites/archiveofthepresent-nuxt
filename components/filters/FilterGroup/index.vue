<template>
  <div class="filters">
    <label class="mr-sm-2 h6" for="keywords">Filter By</label>
    <FilterItem
      v-for="(item, ix) in filters"
      :key="ix"
      :item="item"
    />
  </div>
</template>

<script>
import FilterItem from '@/components/filters/FilterItem'

export default {
  components: { FilterItem },
  props: {
    filters: {
      type: Array,
      default: null
    }
  }
}
</script>
