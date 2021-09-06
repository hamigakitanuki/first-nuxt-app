<template>
  <div>
    <img v-bind:src="item.image" alt="" />
    <p>商品名:{{ item.name }}</p>
    <p>商品説明:{{ item.text }}</p>
    <p>値段:{{ priceFormat(item.price) }}</p>
    <NuxtLink
      v-bind:to="{ name: 'ar-id', params: { id: item.id } }"
      class="btn btn-primary"
      target="_blank"
    >
      商品をARで見る
    </NuxtLink>
    <button>カートに入れる</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item:""
    };
  },
  methods:{
    /**
     * 商品価格のフォーマット
     */
    priceFormat(price){
      return new Intl.NumberFormat('ja-JP').format(price)
    },
    async submit() {
      // storeに保存
      await this.$fb
        .firestore()
        .collection("items")
        .doc(id.toString())
        .set({
          id:id,
          name:itemNameInput.value,
          price:itemPriceInput.value,
          text:this.$refs.itemText.value,
          image:this.$storageUrl+imageFileName,
          model:this.$storageUrl+modelFileName
        });

      this.$router.push("/");
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

<style>
</style>
