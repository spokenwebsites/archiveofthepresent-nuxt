<template>
  <div id="event">
    <Header />
    <main>
      <b-container class="page-content mb-5">
        <div class="row">
          <div class="col-sm-10 offset-sm-1">
            <h5 v-if="event.dates.length > 1" class="pb-2 pt-4">
              <span
                v-for="(date, index) in event.dates"
                :key="'date' + index"
              >{{ $dayjs(date).format('MMMM D, YYYY') }}</span>
            </h5>
            <h5 v-else class="pb-2 pt-4">
              {{ $dayjs(event.dates[0]).format('MMMM D, YYYY') }}
            </h5>
            <h1 class="pb-4">{{ event.title }}</h1>
            <div v-if="featuredVideo">
              <h6 class="pt-3">video</h6>
              <Videoplayer :video="featuredVideo" />
            </div>
            <div v-if="featuredAudio">
              <h6 class="pt-3">Audio</h6>
              <Audioplayer
                ref="audioplayer"
                class="size-lg"
                :audiofile="'/aud/' + featuredAudio.stream"
                :waveform-filename="featuredAudio.waveform"
                :event="event"
                :audio-height="54"
              />
            </div>
            <h6 class="py-3">Details</h6>
            <p v-if="creators" class="mb-4">
              <strong>Presenters</strong>
              <br />{{ creatorsGroup }}
            </p>
            <p v-if="performers" class="mb-4">
              <strong>Performers</strong>
              <br />{{ performersGroup }}
            </p>
            <p v-if="speakers" class="mb-4">
              <strong>Speakers</strong>
              <br />{{ speakersGroup }}
            </p>

            <p v-if="venue" class="mb-4">
              <strong>Venue</strong>
              <br />{{ venue }}
            </p>
            <p v-if="locationDetails" class="mb-4">
              <strong>Location</strong>
              <br />{{ city || town }}, {{ state }}
            </p>
            <p v-if="description" class="mb-4 pb-4 measure-wide">
              <strong>Description</strong>
              <br />{{ description }}
            </p>
            <div v-if="hasPoster || additionalMaterials">
              <hr />
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
            </div>
          </div>
        </div>
      </b-container>
    </main>
    <MediaModal v-if="showMediaModal" />
  </div>
</template>

<script>
import config from '@/nuxt.config.js'
import axios from 'axios'
import helpers from '@/mixins/helpers.js'
import media from '@/mixins/media.js'
import event from '@/mixins/event.js'
import modals from '@/mixins/modals.js'
import Audioplayer from '@/components/shared/Audioplayer'
import Videoplayer from '@/components/shared/Videoplayer'
import MediaModal from '@/components/event/MediaModal'

export default {
  name: 'Event',
  components: {
    Audioplayer,
    Videoplayer,
    MediaModal
  },
  mixins: [helpers, media, event, modals],
  async asyncData({ params }) {
    const path = config.dev
      ? process.env.DEV_EVENTS_PATH_FILE + params.event
      : process.env.PROD_EVENTS_PATH_FILE + params.event
    console.log(path)
    const { data } = await axios.get(path)
    return { event: data.event }
  },
  head() {
    return {
      title: this.eventTitle
    }
  },
  computed: {},
  mounted() {
    if (this.$route.query.image) {
      const modalLink = 'modalLink' + this.$route.query.image
      document.querySelector('#' + modalLink).click()
    }
  }
}
</script>

<style lang="scss"></style>
