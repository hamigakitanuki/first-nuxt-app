export const state = () => {
  return {
    items: [
    ],
  }
}

export const mutations = {
  ADD_ITEM(state, item) {
    state.items.unshift(item)
  },
  LOAD_ITEM(state, items) {
    state.items = items
  },
}

export const actions = {
  async getItems({ commit }) {
    let fb = this.$fb;
    /**
     * ログイン中か確認
     */
    const user = fb.auth().currentUser
    if (!user){
      console.log('未ログイン');
      return false;
    }

    let email    = user.email;
    let items    = []
    await fb.firestore().collection("sells").where('email', '==', email).get().then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      });
    });
    if (items.length >= 0) {
      commit("LOAD_ITEM", items)
    }
  },
}
