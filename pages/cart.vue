<template>
  <div>
    <br /><br />
    <p>カート</p>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(item, index) in cart"
        v-bind:key="index"
      >
        <img v-bind:src="item.image" alt="" class="" />
        <div>
          <h5 class="">{{ item.name }}</h5>
          <p class="">{{ item.text }}</p>
          <p class="">{{ priceFormat(item.price) }}円</p>
          <button
            class="btn btn-primary"
            type="button"
            v-on:click="outCart(index)"
          >
            カートから削除
          </button>
        </div>
      </li>
    </ul>
    <p>料金：{{ this.totalPrice() }}円</p>
    <button v-on:click="buy" class="btn btn-primary">購入する</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {

  data() {
    return {};
  },
  computed: {
    cart() {
      return this.$store.state.cart.items;
    },
  },
  methods: {
    /**
     * 商品価格のフォーマット
     */
    priceFormat(price){
      return new Intl.NumberFormat('ja-JP').format(price)
    },
    totalPrice(){
      let price = 0
      this.cart.forEach(item => {
        price += Number(item.price)
      });

      return this.priceFormat(price)
    },
    async outCart(index){
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

      if (cart) {
        cart.splice(index, 1)
      }

      this.$fb
        .firestore()
        .collection("cart")
        .doc(email)
        .set({
          items:cart
        });
    },
    async buy(){
      if (this.cart.length == 0){
        alert('購入できる商品がありません')
        return false;
      }
      // 時間
      let time = new Date().getTime()

      /**
       * ログイン中か確認
       */
      let user = this.$fb.auth().currentUser
      if (!user){
        alert('ログインしてください')
        return
      }
      let email = user.email;


      // 日付を取得
      let date    = new Date()
      let buyDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

      // storeに保存
      await this.$fb
        .firestore()
        .collection("sells")
        .doc(email+"_"+time.toString())
        .set({
          id:email+"_"+time.toString(),
          email:email,
          items:this.cart,
          totalPrice:this.totalPrice(),
          buyDate:buyDate,
        });

      // カートの中身を空にする
      await this.$fb
      .firestore()
      .collection("cart")
      .doc(email)
      .set({items:[]})

      this.$router.push("/");
    }
  },
  async mounted() {
    /*
     * 商品一覧情報を取得
     */

    await this.$fb
      .firestore()
      .collection("cart")
      .onSnapshot((collection) => {
        this.$store.dispatch("cart/getItems");
      });
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 30px;
  img {
    width: 100px;
  }
}
</style>
