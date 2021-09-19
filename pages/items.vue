<template>
  <div>
    <br /><br />
    <p>商品一覧</p>
    <ul class="bl_item-list">
      <li
        class="bl_item-list_element"
        v-for="(item, index) in items"
        v-bind:key="index"
      >
        <div class="card">
          <img
            v-bind:src="item.image"
            alt=""
            class="bd-placeholder-img card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.text }}</p>
            <p class="card-text">{{ priceFormat(item.price) }}円</p>
            <NuxtLink
              v-bind:to="{ name: 'item-id', params: { id: item.id } }"
              class="btn btn-primary"
            >
              商品詳細
            </NuxtLink>
            <NuxtLink
              v-bind:to="{ name: 'ar-id', params: { id: item.id } }"
              class="btn btn-primary"
              target="_blank"
            >
              商品をARで見る
            </NuxtLink>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {

  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.item.items;
    },
  },
  methods: {
    /**
     * 商品選択
     */
    selectItemToShowAR(item){
      this.selectItem(item)
    },
    /**
     * 商品モデルの関数呼び出し
     */
    ...mapMutations({
      selectItem: 'item/selectItem'
    }),
    /**
     * 商品価格のフォーマット
     */
    priceFormat(price){
      return new Intl.NumberFormat('ja-JP').format(price)
    }
  },
  async mounted() {
    /*
     * 商品一覧情報を取得
     */
    await this.$fb
      .firestore()
      .collection("items")
      .onSnapshot((collection) => {
        this.$store.dispatch("item/getItems");
      });

    await this.$fb
      .firestore()
      .collection("cart")
      .onSnapshot((collection) => {
        this.$store.dispatch("cart/getItems");
      });

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
.bl_item-list {
  display: grid;
  gap: 30px;
  padding: 0px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .bl_item-list_element {
    display: inline-block;
  }
}
</style>
