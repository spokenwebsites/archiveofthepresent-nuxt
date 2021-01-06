<template>
  <b-modal
    id="modal"
    size="lg"
    hide-footer
    no-fade
    header-close-content=""
    @hide="hideEventModal"
  >
    <b-container class="mb-5">
      <h5 v-if="currentEvent.dates.length > 1" class="pb-2">
        <span
          v-for="(date, index) in currentEvent.dates"
          :key="'date' + index"
        >{{ date | moment('MMMM D, YYYY') }}</span>
      </h5>
      <h5 v-else class="pb-2">
        {{ currentEvent.dates[0] | moment('MMMM D, YYYY') }}
      </h5>
      <h2 class="pb-3">{{ currentEvent.title }}</h2>
      <p class="pre-wrap pb-4 font-italic">{{ currentEvent.description }}</p>
      <hr class="pb-1" />
      <div class="row">
        <div class="col px-1 px-sm-2">
          <Audioplayer
            v-if="currentEvent.fileStream"
            ref="audioplayer"
            :audiofile="'/aud/' + currentEvent.fileStream"
            :waveform-filename="currentEvent.waveform"
            :event="currentEvent"
          />
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-4 offset-sm-1 px-1 pb-2">
          <b-link :to="currentEvent.slug + '?image=poster'">
            <b-img-lazy
              v-if="currentEvent.media.poster"
              class="w-100"
              :src="getImage(currentEvent, currentEvent.media.poster, '800_sq')"
              :blank-src="
                getImage(currentEvent, currentEvent.media.poster, '10_sq')
              "
              fluid
              fluid-grow
            ></b-img-lazy>
          </b-link>
        </div>
        <div class="col-sm-6">
          <div v-if="currentEvent.media.images" class="row">
            <div
              v-for="(image, index) in currentEvent.media.images"
              :key="'image' + index"
              class="col-4 px-1 pb-2"
            >
              <b-link
                v-if="index < 6"
                :to="currentEvent.slug + '?image=' + index"
              >
                <b-img-lazy
                  class="w-100"
                  :src="getImage(currentEvent, image, '800_sq')"
                  :blank-src="getImage(currentEvent, image, '10_sq')"
                  fluid
                  fluid-grow
                />
              </b-link>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <b-link class="btn btn-red" :to="currentEvent.slug" role="button">More info</b-link>
      </div>
    </b-container>
  </b-modal>
</template>
<script>
import events from '@/mixins/events.js'
import modals from '@/mixins/modals.js'
import Audioplayer from '@/components/Audioplayer'

export default {
  components: {
    Audioplayer
  },
  mixins: [events, modals],
  computed: {
    currentEvent() {
      return this.$store.state.events.currentEvent
    }
  },
  beforeDestroy() {
    this.$refs.audioplayer.wavesurfer.destroy()
    this.$refs.audioplayer.audioDestroy()
  }
}
</script>
<style lang="scss"></style>
