<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <NuxtLink to="/" class="navbar-brand">ARショッピング</NuxtLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink to="items" class="nav-link" active-class="active"
                >商品一覧</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="cart" class="nav-link" active-class="active"
                >カート</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="history" class="nav-link" active-class="active"
                >購入履歴</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="model" class="nav-link" active-class="active"
                >商品追加</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="analytics" class="nav-link" active-class="active"
                >商品分析</NuxtLink
              >
            </li>
          </ul>
          <!-- 検索ボックス -->
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div style="margin-left: 15px">
            <p v-on:click="login" class="btn btn-primary" v-if="!loginUser">
              ログイン
            </p>
            <div class="bl_login-user_container" v-if="loginUser">
              <img v-bind:src="loginUser.photoURL" alt="" />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loginUser:''
    }
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
  methods:{
    async login() {
      const provider = new this.$fb.auth.GoogleAuthProvider();
      await this.$fb.auth().signInWithPopup(provider);
      this.$router.push("/");
    },
  }
};
</script>
<style lang="scss" scoped>
.bl_login-user_container {
  img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
}
</style>
