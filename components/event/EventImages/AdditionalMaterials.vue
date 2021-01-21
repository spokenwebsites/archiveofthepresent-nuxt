<template>
  <div v-if="additionalMaterials">
    <div v-if="hasImage" class="py-5">
      <h6 class="pt-4">Additional Materials</h6>

      <div v-if="hasPhoto" class="row pt-4 px-2">
        <p class="col-12 mb4 px-1"><strong>Photos</strong></p>
        <div
          v-for="(image, index) in photos"
          :key="'image' + index"
          class="col-2 px-1 pb-2"
        >
          <b-link
            :id="'modalLink' + index"
            @click.prevent="openMediaModal(event, image, 'image')"
          >
            <b-img-lazy
              class="w-100"
              :src="getImage(image, '800_sq')"
              :blank-src="getImage(image, '10_sq')"
            />
          </b-link>
        </div>
      </div>

      <div v-if="hasDocument" class="row pt-4 px-2">
        <p class="col-12 mb4 px-1"><strong>Documents</strong></p>
        <div
          v-for="(image, index) in documents"
          :key="'image' + index"
          class="col-2 px-1 pb-2"
        >
          <b-link
            :id="'modalLink' + (index + photos.length)"
            @click.prevent="openMediaModal(event, image, 'image')"
          >
            <b-img-lazy
              class="w-100"
              :src="getImage(image, '800_sq')"
              :blank-src="getImage(image, '10_sq')"
            />
          </b-link>
        </div>
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
  props: {
    event: {
      type: Object,
      default: null
    }
  }
}
</script>
