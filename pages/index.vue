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
    <p>モデル一覧</p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for=""></li>
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
export default {
  data() {
    return {};
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    },
  },
  async mounted() {
    await this.$fb
      .firestore()
      .collection("messages")
      .onSnapshot((collection) => {
        this.$store.dispatch("chat/getMessages");
      });
  },
};
</script>

<style>
</style>
