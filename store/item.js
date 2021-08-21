export const state = () => {
  return {
    items: [
    ],
    selectItem:{}
  }
}

export const mutations = {
  ADD_ITEM(state, item) {
    state.items.unshift(item)
  },
  LOAD_ITEM(state, items) {
    state.items = items
  },
  selectItem(state, item) {
    state.selectItem = item
  }
}

export const actions = {
  async getItems({ commit }) {
    const db = this.$fb.firestore()
    const result = await db.collection("items").get()
    commit("LOAD_ITEM", result.docs.map((d) => d.data()))
  },
}
