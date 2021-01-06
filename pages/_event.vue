<template>
  <div id="event">
    <Header :title="event.title" />
    <main>
      <b-container class="page-content mb-5">
        <div class="row">
          <div class="col-sm-10 offset-sm-1">
            <h5 v-if="event.dates.length > 1" class="pb-2 pt-4">
              <span v-for="(date, index) in event.dates" :key="'date'+index">{{ date | moment("MMMM D, YYYY") }}</span>
            </h5>
            <h5 v-else class="pb-2 pt-4">{{ event.dates[0] | moment("MMMM D, YYYY") }}</h5>
            <h1 class="pb-4">{{ event.title }}</h1>
            <h6 class="pt-3">Audio</h6>
            <Audioplayer ref="audioplayer" class="size-lg" :audiofile="'/aud/'+event.fileStream" :waveform-filename="event.waveform" :event="event" :audio-height="54" />
            <h6 class="py-3">Details</h6>
            <p class="mb-4">
              <strong>Presenters</strong>
              <br />{{ join(event.creators) }}
            </p>
            <p class="mb-4">
              <strong>Performers</strong>
              <br />{{ join(event.contributors) }}
            </p>
            <p class="mb-4">
              <strong>Venue</strong>
              <br />{{ event.venue }}
            </p>
            <p class="mb-4">
              <strong>Location</strong>
              <br />{{ event.location.details.city }}, {{ event.location.details.state }}
            </p>
            <p class="mb-4 pb-4 measure-wide">
              <strong>Description</strong>
              <br />{{ event.description }}
            </p>
            <hr />
            <div v-if="event.media.poster" class="pt-4">
              <h6 class="py-4">Event Poster</h6>
              <b-link id="modalLinkposter" @click.prevent="openMediaModal(event, event.media.poster, 'poster')">
                <b-img-lazy :src="getImage(event, event.media.poster, '800_sq')" :blank-src="getImage(event, event.media.poster, '10_sq')" rounded="circle" width="200" />
              </b-link>
              <div class="py-5">
                <h6 class="pt-4">Additional Materials</h6>
                <div v-if="event.media.images" class="row pt-4 px-2">
                  <div v-for="(image, index) in event.media.images" :key="'image'+index" class="col-2 px-1 pb-2">
                    <b-link :id="'modalLink'+index" @click.prevent="openMediaModal(event, image, 'image')">
                      <b-img-lazy class="w-100" :src="getImage(event, image, '800_sq')" :blank-src="getImage(event, image, '10_sq')" />
                    </b-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </main>
    <MediaModal v-if="showMediaModal" />
    <Footer />
  </div>
</template>

<script>
import config from '@/nuxt.config.js'
import axios from 'axios'
import helpers from '@/mixins/helpers.js'
import events from '@/mixins/events.js'
import modals from '@/mixins/modals.js'
import Audioplayer from '@/components/Audioplayer'
import MediaModal from '@/components/MediaModal'

export default {
  name: 'Event',
  components: {
    Audioplayer,
    MediaModal
  },
  mixins: [helpers, events, modals],
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
      title: this.event.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  computed: {},
  mounted() {
    // console.log(this.event)
    // this.$nextTick(() => {
    //   this.$refs.audioplayer.audioInit()
    // })
    if (this.$route.query.image) {
      const modalLink = 'modalLink' + this.$route.query.image
      document.querySelector('#' + modalLink).click()
    }
  }
}
</script>

<style lang="scss"></style>
