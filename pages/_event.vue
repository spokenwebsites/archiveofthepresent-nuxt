<template>
  <div id="event">
    <Header />
    <main>
      <b-container class="page-content mb-5">
        <div class="row">
          <div class="col-sm-10 offset-sm-1">
            <EventHeader :event="event" />
            <EventVideo :event="event" />
            <EventAudio :event="event" />
            <EventDetails :event="event" />
            <EventImages :event="event" />
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
import EventDetails from '@/components/event/EventDetails'
import MediaModal from '@/components/event/MediaModal'

export default {
  components: {
    MediaModal,
    EventDetails
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
  computed: {
    // event() {
    //   return this.$store.state.event.event
    // }
  },
  mounted() {
    if (this.$route.query.image) {
      const modalLink = 'modalLink' + this.$route.query.image
      document.querySelector('#' + modalLink).click()
    }
    // this.setEvent(this.currentEvent)
  },
  methods: {
    setEvent(val) {
      // this.$store.commit('event/setEvent', val)
    }
  }
}
</script>

<style lang="scss"></style>
