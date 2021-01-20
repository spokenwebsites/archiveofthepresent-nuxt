<template>
  <div id="home">
    <Header />
    <main>
      <b-container>
        <div v-if="events" class="row mt-5">
          <Filters :master="master" :events="events" class="col-lg-3 col-md-4 mb-5 mx-md-0 mx-4 d-none d-md-block" />
          <FilteredEvents :events="events" class="col" />
        </div>
      </b-container>
    </main>
    <EventModal v-if="showEventModal" />
  </div>
</template>

<script>
import config from '@/nuxt.config.js'
import axios from 'axios'
import helpers from '@/mixins/helpers.js'
import media from '@/mixins/media.js'
import modals from '@/mixins/modals.js'
import filters from '@/mixins/filters.js'
import Filters from '@/components/events/Filters'
import FilteredEvents from '@/components/events/FilteredEvents'
import EventModal from '@/components/events/EventModal'

export default {
  name: 'Home',
  components: {
    Filters,
    FilteredEvents,
    EventModal
  },
  mixins: [helpers, media, filters, modals],
  async asyncData({ params }) {
    const path = config.dev
      ? process.env.DEV_EVENTS_PATH_FILE
      : process.env.PROD_EVENTS_PATH_FILE
    const { data } = await axios.get(path)
    return { events: data.events, master: data.master }
  },
  data() {
    return {
      title: 'Home'
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  mounted() {
    console.log(this.events)
  }
}
</script>
<style lang="scss"></style>
