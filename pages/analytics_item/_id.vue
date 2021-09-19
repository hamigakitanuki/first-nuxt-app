<template>
  <div>
    <img v-bind:src="item.image" alt="" />
    <p>商品名:{{ item.name }}</p>
    <p>商品説明:{{ item.text }}</p>
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

<style>
</style>
