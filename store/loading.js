/* Loading states */

export const state = () => ({
  status: null
})

export const mutations = {
  update (state, val) {
    state.status = val
  }
}
