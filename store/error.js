/* Error states */

export const state = () => ({
  text: null
})

export const mutations = {
  update(state, val) {
    state.text = val
  }
}
