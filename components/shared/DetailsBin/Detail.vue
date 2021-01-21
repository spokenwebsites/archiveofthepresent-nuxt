<template>
  <p v-if="detail" class="mb-4">
    <strong>{{ title }}</strong>
    <br />{{ detail }}
  </p>
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
