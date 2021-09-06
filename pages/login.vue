<template>
  <div>
    <a class="btn btn-light" @click="login"> Googleでログイン </a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async login() {
      const provider = new this.$fb.auth.GoogleAuthProvider();
      await this.$fb.auth().signInWithPopup(provider);
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>
