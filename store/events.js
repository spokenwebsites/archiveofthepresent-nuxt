export const state = () => ({
  events: null,
  master: null,
  currentEvent: null,
  filterType: '',
  filters: {
    keywords: '',
    presenters: '',
    performers: '',
    speakers: '',
    seriesOrganizers: '',
    years: ''
  },
  eventModal: {
    show: false
  },
  showMediaModal: false,
  mediaModal: {
    show: false,
    data: null,
    type: null,
    image: {
      sm: null,
      lg: null
    },
    pdf: null
  }
})

export const mutations = {
  setEvents(state, val) {
    state.events = val
  },
  setMaster(state, val) {
    state.master = val
  },
  setCurrentEvent(state, val) {
    state.currentEvent = val
  },
  resetFilters(state, val) {
    if (val === 'performers') {
      state.filters.speakers = ''
      state.filters.presenters = ''
      state.filters.years = ''
      state.filters.seriesOrganizers = ''
    } else if (val === 'speakers') {
      state.filters.performers = ''
      state.filters.years = ''
      state.filters.presenters = ''
      state.filters.seriesOrganizers = ''
    } else if (val === 'seriesOrganizers') {
      state.filters.performers = ''
      state.filters.years = ''
      state.filters.presenters = ''
      state.filters.speakers = ''
    } else if (val === 'presenters') {
      state.filters.speakers = ''
      state.filters.performers = ''
      state.filters.years = ''
      state.filters.seriesOrganizers = ''
    } else if (val === 'years') {
      state.filters.speakers = ''
      state.filters.performers = ''
      state.filters.presenters = ''
      state.filters.seriesOrganizers = ''
    } else {
      state.filters.speakers = ''
      state.filters.keywords = ''
      state.filters.performers = ''
      state.filters.presenters = ''
      state.filters.years = ''
      state.filters.seriesOrganizers = ''
    }
  },
  setFilterKeywords(state, val) {
    state.filters.keywords = val
  },
  setFilterType(state, val) {
    state.filterType = val
  },
  setFilterValue(state, val) {
    state.filters[state.filterType] = val
  },
  setFilterPresenters(state, val) {
    state.filters.presenters = val
  },
  setFilterPerformers(state, val) {
    state.filters.performers = val
  },
  setFilterSpeakers(state, val) {
    state.filters.speakers = val
  },
  setFilterSeriesOrganizers(state, val) {
    state.filters.seriesOrganizers = val
  },
  setFilterYears(state, val) {
    state.filters.years = val
  },
  setEventModal(state, val) {
    state.eventModal.show = val
  },
  setMediaModal(state, val) {
    state.mediaModal.show = val
  },
  setMediaModalData(state, val) {
    state.mediaModal.data = val
  },
  setMediaModalType(state, val) {
    state.mediaModal.type = val
  },
  setMediaModalImage(state, val) {
    state.mediaModal.image = val
  },
  setMediaModalPdf(state, val) {
    state.mediaModal.pdf = val
  }
}
