<template>
  <b-modal
    v-if="showMediaModal"
    id="modal"
    size="lg"
    no-fade
    hide-footer
    header-close-content=""
    @hide="hideMediaModal"
  >
    <b-container class="mb-5">
      <h6>{{ modalTitle }}</h6>
      <b-img-lazy
        class="mt-2 mb-5 w-100"
        :src="modalImg.lg"
        :blank-src="modalImg.sm"
      />
      <h5 v-if="modalData.title" class="mb-4">
        <strong>{{ modalData.title }}</strong>
      </h5>
      <p v-if="modalData.caption" class="mb-1">
        <em>{{ modalData.caption }}</em>
      </p>
      <p>
        <strong>{{ modalData.credits }}</strong>
      </p>
      <p class="text-right">
        <strong>
          <a v-if="modalPdf" :href="modalPdf" target="_blank">Download PDF</a>
        </strong>
      </p>
    </b-container>
  </b-modal>
</template>
<script>
import media from '@/mixins/media.js'
import modals from '@/mixins/modals.js'

export default {
  mixins: [media, modals]
}
</script>
<style lang="scss"></style>
