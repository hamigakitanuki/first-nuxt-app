<template>
  <div>
    <br /><br />
    <h2>購入履歴</h2>
    <ul class="list-group">
      <li
        class="bl_list-group-item"
        v-for="(item, index) in sells"
        v-bind:key="index"
      >
        <p>購入日:{{ item.buyDate }}</p>
        <p>合計:{{ item.totalPrice }}円</p>
        <ul class="list-group">
          <li
            class="list-group-item_inner"
            v-for="(item, index) in item.items"
            v-bind:key="index"
          >
            <img v-bind:src="item.image" alt="" />
            <div>
              <h5>{{ item.name }}</h5>
              <p>{{ item.text }}</p>
              <p>{{ priceFormat(item.price) }}円</p>
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
.bl_list-group-item {
  display: grid;
  grid-template-columns: 200px 200px 1fr;
  border: 1px solid #aaa;
  padding: 30px;
  .list-group {
    margin-top: 0px !important;
  }
  .list-group-item_inner {
    border: 1px solid #aaa;
    padding: 20px;
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 15px;
    img {
      width: 150px;
    }
  }
}
</style>
