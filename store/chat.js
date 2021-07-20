export const state = () => {
  return {
    messages: [
    ]
  }
}

export const mutations = {
  ADD_MESSAGE(state, message) {
    state.messages.unshift(message)
  },
  LOAD_MESSAGE(state, messages) {
    state.messages = messages
  }
}

export const actions = {
  async getMessages({ commit }) {
    const db = this.$fb.firestore()
    const result = await db.collection("messages").get()
    commit("LOAD_MESSAGE", result.docs.map((d) => d.data()))
  },
}
