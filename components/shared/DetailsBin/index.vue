<template>
  <div>
    <h6 class="py-3">Details</h6>
    <Detail
      v-for="(item, ix) in details"
      :key="ix"
      :title="item.title"
      :detail="item.detail"
    />
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import event from '@/mixins/event.js'
import Detail from './Detail'

export default {
  components: { Detail },
  mixins: [helpers, event],
  props: {
    details: {
      type: Object,
      default: null
    }
  }
}
</script>
