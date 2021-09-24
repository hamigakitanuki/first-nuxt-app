<template>
  <div class="bl_detail_page">
    <img v-bind:src="item.image" alt="" />
    <div>
      <span>商品名:</span>
      <p>{{ item.name }}</p>
      <span>商品説明:</span>
      <p>{{ item.text }}</p>
      <span>値段:</span>
      <p>{{ priceFormat(item.price) }}円</p>
      <div class="btns">
        <NuxtLink
          v-bind:to="{ name: 'ar-id', params: { id: item.id } }"
          class="btn btn-primary"
          target="_blank"
        >
          商品をARで見る
        </NuxtLink>
        <button class="btn btn-primary" v-on:click="inCart">
          カートに入れる
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item:"",
      cart:""
    };
  },
  methods:{
    /**
     * 商品価格のフォーマット
     */
    priceFormat(price){
      return new Intl.NumberFormat('ja-JP').format(price)
    },
    async inCart() {
      /**
       * ログイン中か確認
       */
      let user = this.$fb.auth().currentUser
      if (!user){
        alert('ログインしてください')
        return
      }
      let email = user.email;

      let cart
      /**
       * 現在のカートを取得
       */
      await this.$fb
      .firestore()
      .collection("cart")
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          cart = doc.data().items
        } else {
          console.log('カート未所持');
        }
      })

      let items
      if (cart) {
        items = [...cart,this.item.id]
      } else {
        items = [this.item.id]
      }

      this.$fb
        .firestore()
        .collection("cart")
        .doc(email)
        .set({
          items:items
        });

      this.$router.push("/items");
    },
  },
  async mounted() {
    const db = this.$fb.firestore()
    await db.collection("items").doc(this.$route.params.id.toString()).get().then((doc)=>{
      console.log(doc.data());
      this.item = doc.data()
    })
  },
};
</script>

<style lang="scss">
.bl_detail_page {
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 30px;
  width: 100%;
  img {
    width: 100%;
    border: 1px solid #aaa;
  }
  p {
    font-size: 30px;
  }
  span:nth-child(n + 2) {
    display: block;
    margin-top: 30px;
  }
  .btns {
    margin-top: 60px;
  }
}
</style>
