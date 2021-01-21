<template>
  <div v-if="hasPoster || additionalMaterials">
    <hr />
    <Posters :event="event" />
    <AdditionalMaterials :event="event" />
  </div>
</template>

<script>
import event from '@/mixins/event.js'
import Posters from './Posters'
import AdditionalMaterials from './AdditionalMaterials'

export default {
  components: { Posters, AdditionalMaterials },
  mixins: [event],
  props: {
    event: {
      type: Object,
      default: null
    }
  }
}
</script>
