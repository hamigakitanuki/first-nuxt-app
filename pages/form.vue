<template>
  <div>
    <form>
      <div class="form-group">
        <label>ユーザ名</label>
        <input v-model="form.name" type="text" class="form-control" readonly />
      </div>
      <div class="form-group">
        <textarea v-model="form.message" rows="3" class="form-control" />
      </div>
      <button @click.prevent="submit" type="submit" class="btn btn-primary">
        投稿
      </button>
    </form>
    <div>
      <a @click="logout">ユーザの切り替え</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        message: "",
      },
    };
  },
  mounted() {
    this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.form.name = user.displayName;
      }
    });
    this.$fb
      .firestore()
      .collection("messages")
      .onSnapshot((collection) => {
        this.$store.dispatch("chat/getMessages");
      });
  },
  methods: {
    async submit() {
      let count = this.$store.state.chat.messages.length + 1;
      await this.$fb
        .firestore()
        .collection("messages")
        .doc(count.toString())
        .set(this.form);
      this.$router.push("/");
    },
    async logout() {
      await this.$fb.auth().signOut();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>
