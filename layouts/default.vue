<template>
  <div>
    <div class="navbar_wrap">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <NuxtLink to="/" class="navbar-brand">
            <img
              class="header_image"
              src="~assets/img/1_Primary_logo_on_transparent_344x63.png"
              alt=""
            />
          </NuxtLink>
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
                <NuxtLink to="/items" class="nav-link" active-class="active"
                  >商品一覧</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink to="/cart" class="nav-link" active-class="active"
                  >カート</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink to="/history" class="nav-link" active-class="active"
                  >購入履歴</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink to="/model" class="nav-link" active-class="active"
                  >商品追加</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink to="/analytics" class="nav-link" active-class="active"
                  >商品分析</NuxtLink
                >
              </li>
            </ul>
            <div style="margin-left: 15px">
              <p
                v-on:click="login"
                class="btn btn-success"
                v-if="!loginUser"
                style="margin-bottom: 0px"
              >
                ログイン
              </p>
              <div class="bl_login-user_container" v-if="loginUser">
                <div class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img v-bind:src="loginUser.photoURL" alt="" />
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" v-on:click="logout">
                        ログアウト
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="container">
      <div class="inner">
        <Nuxt />
      </div>
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
    async logout() {
      await this.$fb.auth().signOut();
      this.$router.push("/login");
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
.container {
  padding: 60px;
}
.header_image {
  width: 200px;
}
.navbar_wrap {
  margin-top: 30px;
  padding: 0 30px;
  height: 80px;
}
.navbar {
  background-color: #eef8ef;
  padding: 0 30px;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
</style>
