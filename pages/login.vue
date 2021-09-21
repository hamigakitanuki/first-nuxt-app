<template>
  <div class="bl_login_section">
    <template v-if="!loginUser">
      <p>利用者様ログイン</p>
      <span>サービスを利用するには、ログインが必要です。</span>
      <a class="login_btn" @click="login"> Googleでログイン </a>
    </template>
    <template v-else>
      <p>ログイン済みです。</p>
      <NuxtLink to="/" class="navbar-brand"> トップへ行く </NuxtLink>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser:''

    };
  },
  async mounted(){
        /**
     * 現在のログインユーザーを取得
     */
    this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUser = {
          displayName:user.displayName,
          email:user.email,
          photoURL:user.photoURL,
          emailVerified:user.emailVerified,
        }
      } else {
      }
    });
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

<style lang="scss">
.bl_login_section {
  background: #fafafa;
  border-radius: 15px;
  width: 800px;
  height: 300px;
  margin: 0 auto;
  padding: 30px;
  p {
    text-align: center;
    font-size: 30px;
    margin-top: 30px;
  }
  span {
    display: block;
    text-align: center;
    font-size: 20px;
    margin-top: 30px;
  }
  .login_btn {
    display: block;
    width: max-content;
    margin: 30px auto 0;
    padding: 15px 30px;
    text-align: center;
    border-radius: 999px;
    background-color: rgb(0, 255, 85);
    text-decoration: none;
    color: #555;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
