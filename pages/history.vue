<template>
  <div>
    <br /><br />
    <h2>購入履歴</h2>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(item, index) in sells"
        v-bind:key="index"
      >
        <p class="">購入日:{{ item.buyDate }}</p>
        <p class="">合計:{{ item.totalPrice }}円</p>
        <ul class="list-group">
          <li
            class="list-group-item list-group-item_inner"
            v-for="(item, index) in item.items"
            v-bind:key="index"
          >
            <img v-bind:src="item.image" alt="" class="" />
            <div>
              <h5 class="">{{ item.name }}</h5>
              <p class="">{{ item.text }}</p>
              <p class="">{{ priceFormat(item.price) }}円</p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  data() {
    return {};
  },
  computed: {
    sells() {
      return this.$store.state.sell.items;
    },
  },
  methods: {
    priceFormat(price){
      return new Intl.NumberFormat('ja-JP').format(price)
    },
  },
  async mounted() {
    /*
     * 商品一覧情報を取得
     */
    await this.$fb
      .firestore()
      .collection("sells")
      .onSnapshot((collection) => {
        this.$store.dispatch("sell/getItems");
      });
  },
};
</script>

<style lang="scss">
.list-group-item {
  .list-group-item_inner {
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 15px;
    img {
      width: 50px;
    }
  }
}
</style>
