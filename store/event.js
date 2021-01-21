export const state = () => ({
  event: null
})

export const mutations = {
  setEvent(state, val) {
    state.event = val
  }
}
