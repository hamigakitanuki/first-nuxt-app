<template>
  <div>
    <br /><br />
    <h2>商品一覧</h2>
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

<style lang="scss">
.bl_item-list {
  display: grid;
  gap: 30px;
  padding: 0px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .bl_item-list_element {
    display: inline-block;
    img {
      height: 200px;
      object-fit: cover;
    }
  }
}
h2 {
  text-align: center;
}
</style>
