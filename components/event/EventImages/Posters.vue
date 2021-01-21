<template>
  <div v-if="hasPoster" class="pt-4">
    <h6 class="py-4">Event Poster</h6>
    <div class="row">
      <div
        v-for="(poster, index) in posters"
        :key="'image' + index"
        class="col-3"
      >
        <b-link
          id="modalLinkposter"
          @click.prevent="openMediaModal(event, poster, 'poster')"
        >
          <b-img-lazy
            class="w-100"
            :src="getImage(poster, '800_sq')"
            :blank-src="getImage(poster, '10_sq')"
            rounded="circle"
          />
        </b-link>
      </div>
    </div>
  </div>
</template>

<script>
import event from '@/mixins/event.js'
import media from '@/mixins/media.js'
import modals from '@/mixins/modals.js'

export default {
  mixins: [event, media, modals],
  computed: {
    event() {
      return this.$store.state.event.event
    }
  }
}
</script>
