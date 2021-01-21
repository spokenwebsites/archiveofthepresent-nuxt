export default {
  computed: {
    filters() {
      return this.$store.state.events.filters
    },
    filteredEvents() {
      return this.events.filter(event => {
        const keywords = this.filters.keywords.toLowerCase()
        const presenters = this.filters.presenters.toLowerCase()
        const years = this.filters.years
        const performers = this.filters.performers.toLowerCase()
        const city = event.location.details.city ? event.location.details.city : event.location.details.town
        // const speakers = this.filters.speakers.toLowerCase()
        return (
          (event.title.toLowerCase().includes(keywords) ||
            this.joinNames(event.creators).toLowerCase().includes(keywords) ||
            this.joinNames(event.contributors).toLowerCase().includes(keywords) ||
            event.year.toLowerCase().includes(keywords) ||
            city
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036F]/g, '')
              .includes(keywords)) &&
          this.joinNames(event.creators)
            .toLowerCase()
            .trim()
            .includes(presenters.trim()) &&
          this.joinNames(event.performers)
            .toLowerCase()
            .trim()
            .includes(performers.trim()) &&
          // this.joinNames(event.speakers)
          //   .toLowerCase()
          //   .trim()
          //   .includes(speakers.trim()) &&
          this.joinNames(event.presenters)
            .toLowerCase()
            .trim()
            .includes(presenters.trim()) &&
          event.year
            .trim()
            .includes(years.trim())
        )
      })
    }
  },
  methods: {
    setFilterKeywords(val) {
      this.$store.commit('events/setFilterKeywords', val)
    },
    setFilterPresenters(val) {
      this.$store.commit('events/setFilterPresenters', val)
    },
    setFilterPerformers(val) {
      this.$store.commit('events/setFilterPerformers', val)
    },
    setFilterseriesOrganizers(val) {
      this.$store.commit('events/setFilterseriesOrganizers', val)
    },
    setFilterSpeakers(val) {
      this.$store.commit('events/setFilterSpeakers', val)
    },
    setFilterYears(val) {
      this.$store.commit('events/setFilterYears', val)
    },
    resetFilters(exclude) {
      this.$store.commit('events/resetFilters', exclude)
    }
  }
}
