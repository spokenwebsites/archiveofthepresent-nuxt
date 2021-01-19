<template>
  <div id="home">
    <Header :title="title" />
    <main>
      <b-container>
        <div v-if="events" class="row mt-5">
          <Filters :master="master" :events="events" class="col-lg-3 col-md-4 mb-5 mx-md-0 mx-4" />
          <FilteredEvents :events="events" class="col" />
        </div>
      </b-container>
    </main>
    <EventModal v-if="showEventModal" />
    <Footer />
  </div>
</template>

<script>
import config from '@/nuxt.config.js'
import axios from 'axios'
import helpers from '@/mixins/helpers.js'
import media from '@/mixins/media.js'
import modals from '@/mixins/modals.js'
import filters from '@/mixins/filters.js'
import Filters from '@/components/Filters'
import FilteredEvents from '@/components/FilteredEvents'

export default {
  name: 'Home',
  components: {
    Filters,
    FilteredEvents
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
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  mounted() {
    console.log(this.events)
  }
}
</script>
<style lang="scss"></style>
