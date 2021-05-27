<template>
  <div v-if="detail" class="mb-4">
    <strong>{{ title }}</strong>
    <p class="pre-wrap">{{ detail }}</p>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'

export default {
  mixins: [helpers],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    detail: {
      type: String,
      default: null
    }
  }
}
</script>
