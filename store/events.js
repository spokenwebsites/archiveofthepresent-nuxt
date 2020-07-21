/* Search states */

export const state = () => ({
  events: null,
  currentEvent: null
})

export const mutations = {
  updateCurrentEvent (state, val) {
    state.currentEvent = val
  }
}
