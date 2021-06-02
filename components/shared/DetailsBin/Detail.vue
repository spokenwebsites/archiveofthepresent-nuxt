<template>
  <div v-if="detail" class="mb-4">
    <strong>{{ title }}</strong>
    <!-- eslint-disable-next-line vue/no-v-html-->
    <p class="pre-wrap" v-html="detail"></p>
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
