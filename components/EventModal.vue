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
      <h5 v-if="event.dates.length > 1" class="pb-2">
        <span
          v-for="(date, index) in event.dates"
          :key="'date' + index"
        >{{ date | moment('MMMM D, YYYY') }}</span>
      </h5>
      <h5 v-else class="pb-2">
        {{ event.dates[0] | moment('MMMM D, YYYY') }}
      </h5>
      <h2 class="pb-3">{{ event.title }}</h2>
      <p class="pre-wrap pb-4 font-italic">{{ event.description }}</p>
      <hr class="pb-1" />
      <div class="row">
        <div class="col px-1 px-sm-2">
          <Audioplayer
            v-if="featuredAudio"
            ref="audioplayer"
            :audiofile="'/aud/' + featuredAudio.stream"
            :waveform-filename="featuredAudio.waveform"
            :event="event"
          />
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-4 offset-sm-1 px-1 pb-2">
          <b-link :to="event.slug + '?image=poster'">
            <b-img-lazy
              v-if="featuredImage"
              class="w-100"
              :src="getImage(featuredImage, '800_sq')"
              :blank-src="
                getImage(featuredImage, '10_sq')
              "
              fluid
              fluid-grow
            ></b-img-lazy>
          </b-link>
        </div>
        <div class="col-sm-6">
          <div v-if="event.media.images" class="row">
            <div
              v-for="(image, index) in event.media.images"
              :key="'image' + index"
              class="col-4 px-1 pb-2"
            >
              <b-link
                v-if="index < 6"
                :to="event.slug + '?image=' + index"
              >
                <b-img-lazy
                  class="w-100"
                  :src="getImage(image, '800_sq')"
                  :blank-src="getImage(image, '10_sq')"
                  fluid
                  fluid-grow
                />
              </b-link>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <b-link class="btn btn-red" :to="event.slug" role="button">More info</b-link>
      </div>
    </b-container>
  </b-modal>
</template>
<script>
import media from '@/mixins/media.js'
import event from '@/mixins/event.js'
import modals from '@/mixins/modals.js'
import Audioplayer from '@/components/Audioplayer'

export default {
  components: {
    Audioplayer
  },
  mixins: [media, event, modals],
  computed: {
    event() {
      return this.$store.state.events.currentEvent
    }
  },
  beforeDestroy() {
    // this.$refs.audioplayer.wavesurfer.destroy()
    // this.$refs.audioplayer.audioDestroy()
  }
}
</script>
<style lang="scss"></style>
