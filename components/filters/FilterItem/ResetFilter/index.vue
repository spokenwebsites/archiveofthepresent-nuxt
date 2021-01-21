<template>
  <div class="text-center">
    <b-button variant="red" @click="resetFilters('none')">Reset Filters</b-button>
  </div>
</template>

<script>
import filters from '@/mixins/filters.js'

export default {
  mixins: [filters]
}
</script>
