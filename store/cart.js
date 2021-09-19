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
    let result   = await fb.firestore().collection("cart").doc(email).get()
    let itemIds  = result.data().items ?? []
    let items    = []
    for (let index = 0; index < itemIds.length; index++) {
      let itemResult = await fb.firestore().collection("items").doc(itemIds[index].toString()).get()
      items.push(itemResult.data());
    }

    console.log(items);

    if (items.length >= 0) {
      commit("LOAD_ITEM", items)
    }
  },
}
