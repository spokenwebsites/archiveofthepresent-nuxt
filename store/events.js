export const state = () => ({
  events: null,
  currentEvent: null,
  filters: {
    keywords: '',
    presenters: '',
    performers: '',
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
  updateCurrentEvent(state, val) {
    state.currentEvent = val
  },
  resetFilters(state, val) {
    if (val === 'performers') {
      state.filters.presenters = ''
      state.filters.years = ''
    } else if (val === 'presenters') {
      state.filters.performers = ''
      state.filters.years = ''
    } else if (val === 'years') {
      state.filters.performers = ''
      state.filters.presenters = ''
    } else {
      state.filters.keywords = ''
      state.filters.performers = ''
      state.filters.presenters = ''
      state.filters.years = ''
    }
  },
  setFilterKeywords(state, val) {
    state.filters.keywords = val
  },
  setFilterPresenters(state, val) {
    state.filters.presenters = val
  },
  setFilterPerformers(state, val) {
    state.filters.performers = val
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
