<template>
  <div>
    <router-link class="btn btn-light" to="/model"> 商品追加 </router-link>
    <br /><br />
    <p>商品一覧</p>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(item, index) in items"
        v-bind:key="index"
      >
        <div class="card" style="width: 18rem">
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
  },
};
</script>

<style>
</style>
