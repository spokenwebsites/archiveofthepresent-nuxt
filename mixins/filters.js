export default {
  computed: {
    filteredEvents() {
      return this.events.filter(event => {
        const keywords = this.filters.keywords.toLowerCase()
        const presenters = this.filters.presenters.toLowerCase()
        // const years = this.filters.years.toLowerCase()
        const performers = this.filters.performers.toLowerCase()
        return (
          (event.title.toLowerCase().includes(keywords) ||
            this.join(event.creators).toLowerCase().includes(keywords) ||
            this.join(event.contributors).toLowerCase().includes(keywords) ||
            event.year.toLowerCase().includes(keywords) ||
            event.location.details.city
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036F]/g, '')
              .includes(keywords)) &&
          this.join(event.creators)
            .toLowerCase()
            .trim()
            .includes(presenters.trim()) &&
          this.join(event.contributors)
            .toLowerCase()
            .trim()
            .includes(performers.trim())
        )
      })
    },
    filters() {
      return this.$store.state.events.filters
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
    setFilterYears(val) {
      this.$store.commit('events/setFilterYears', val)
    },
    resetFilters(exclude) {
      this.$store.commit('events/resetFilters', exclude)
    }
  }
}
