<template>
  <div id="home">
    <Header />
    <main>
      <b-container>
        <div v-if="events" class="row mt-5">
          <EventFilters
            class="col-lg-3 col-md-4 mb-5 mx-md-0 mx-4 d-none d-md-block"
          />
          <FilteredEvents class="col" />
        </div>
      </b-container>
    </main>
    <EventModal v-if="showEventModal" />
  </div>
</template>

<script>
import axios from 'axios'
import helpers from '@/mixins/helpers.js'
import media from '@/mixins/media.js'
import modals from '@/mixins/modals.js'
import filters from '@/mixins/filters.js'
import EventFilters from '@/components/events/EventFilters'
import FilteredEvents from '@/components/events/FilteredEvents'
import EventModal from '@/components/events/EventModal'
import active from '@/data/active.yaml'

export default {
  components: {
    EventFilters,
    FilteredEvents,
    EventModal
  },
  mixins: [helpers, media, filters, modals],
  async asyncData({ store }) {
    const path = `${process.env.SERVER_BASE_URL}/file/aotp.json/`
    // const params = { active: JSON.stringify(active) }
    // const { data } = await axios.get(path, { params })
    const { data } = await axios.get(path, { data: { active } })
    store.commit('events/setEvents', data.events.filter(e => e))
    store.commit('events/setMaster', data.master)
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
  computed: {
    events() {
      return this.$store.state.events.events
    },
    master() {
      return this.$store.state.events.master
    }
  }
}
</script>
<style lang="scss"></style>
