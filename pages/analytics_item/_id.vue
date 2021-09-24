<template>
  <div>
    <div class="bl_detail_page">
      <img v-bind:src="item.image" alt="" />
      <div>
        <span>商品名:</span>
        <p>{{ item.name }}</p>
        <span>商品説明:</span>
        <p>{{ item.text }}</p>
      </div>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(data, index) in analytics"
        v-bind:key="index"
      >
        {{ dateTimeFormat(data.date) }}の閲覧記録
        <NuxtLink
          v-bind:to="{
            name: 'moveDataView-id',
            params: { id: data.id },
          }"
          class="btn btn-primary"
          target="_blank"
        >
          ARで見る
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item:"",
      cart:"",
      analytics:[],
    };
  },
  methods:{
    dateTimeFormat(dateTime){
      let date = new Date(dateTime)
      return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    }
  },
  async mounted() {
    const db = this.$fb.firestore()
    await db.collection("items").doc(this.$route.params.id.toString()).get().then((doc)=>{
      this.item = doc.data()
    })

    await db.collection("moveData").where('item_id', '==', Number(this.$route.params.id)).get().then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        this.analytics.push(doc.data())
      });
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
.list-group {
  margin-top: 30px;
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
