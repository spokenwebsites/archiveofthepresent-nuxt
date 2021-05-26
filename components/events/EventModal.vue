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
        <span v-for="(date, index) in event.dates" :key="'date' + index">{{
          $dayjs(date).format('MMMM D, YYYY')
        }}</span>
      </h5>
      <h5 v-else class="pb-2">
        {{ $dayjs(event.dates[0]).format('MMMM D, YYYY') }}
      </h5>
      <h2 class="pb-3">{{ eventTitle }}</h2>
      <p class="pre-wrap pb-4 font-italic">{{ description }}</p>
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
          <Videoplayer v-if="featuredVideo" :video="featuredVideo" :poster="featuredImage" />
        </div>
      </div>
      <div class="row pt-2">
        <div v-if="hasPoster" class="col-4 offset-sm-1 px-1 pb-2">
          <b-link :to="slug + '?image=poster'">
            <b-img-lazy
              class="w-100"
              :src="getImage(poster, '800_sq')"
              :blank-src="getImage(poster, '10_sq')"
              fluid
              fluid-grow
            ></b-img-lazy>
          </b-link>
        </div>
        <div v-if="hasPhoto" class="col-sm-6">
          <div class="row">
            <div
              v-for="(image, index) in photos"
              :key="'image' + index"
              class="col-4 px-1 pb-2"
            >
              <b-link v-if="index < 6" :to="slug + '?image=' + index">
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
        <b-link class="btn btn-red" :to="slug" role="button">More info</b-link>
      </div>
    </b-container>
  </b-modal>
</template>
<script>
import media from '@/mixins/media.js'
import event from '@/mixins/event.js'
import modals from '@/mixins/modals.js'
import Audioplayer from '@/components/shared/Audioplayer'
import Videoplayer from '@/components/shared/Videoplayer'

export default {
  components: {
    Audioplayer,
    Videoplayer
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
