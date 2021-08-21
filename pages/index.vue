<template>
  <div>
    <router-link class="btn btn-light" to="/form"> 投稿画面 </router-link>
    <router-link class="btn btn-light" to="/ar" target="_blank">
      AR画面
    </router-link>
    <router-link class="btn btn-light" to="/model">
      モデルアップロード
    </router-link>
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
            <a href="#" class="btn btn-primary">商品をARで見る</a>
          </div>
        </div>
      </li>
    </ul>
    <p>チャット</p>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(message, index) in messages"
        v-bind:key="index"
      >
        <div>
          {{ message.name }}
        </div>
        <div>
          {{ message.message }}
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
    messages() {
      return this.$store.state.chat.messages;
    },
    items() {
      return this.$store.state.item.items;
    }
  },
  methods: {
    ...mapMutations({
      selectItem: 'item/selectItem'
    })
  },
  async mounted() {
    await this.$fb
      .firestore()
      .collection("messages")
      .onSnapshot((collection) => {
        this.$store.dispatch("chat/getMessages");
      });

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
