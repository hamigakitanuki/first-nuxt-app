<template>
  <div>
    <div class="mb-3">
      <label for="item_name" class="form-label">商品名</label>
      <input id="item_name" class="form-control" type="text" ref="itemName" />
    </div>

    <div class="mb-3">
      <label for="item_text" class="form-label">商品説明(100文字まで)</label>
      <textarea
        class="form-control"
        id="item_text"
        cols="30"
        rows="10"
        maxlength="100"
        ref="itemText"
      ></textarea>
    </div>

    <div class="mb-3">
      <label for="image" class="form-label">商品画像</label>
      <input id="image" class="form-control" type="file" ref="image" />
    </div>

    <div class="mb-3">
      <label for="model" class="form-label">モデルファイル</label>
      <input id="model" class="form-control" type="file" ref="model" />
    </div>

    <button type="button" class="btn btn-primary" v-on:click="submit">
      保存
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods:{
    async submit() {
      // 商品名存在検証
      let itemNameInput = this.$refs.itemName
      if (!itemNameInput.value) {
        alert('商品名は必須です。')
        return
      }

      // 商品画像存在検証
      let imageFileInput = this.$refs.image
      if (imageFileInput.files.length === 0) {
        alert('商品画像のアップロードは必須です。')
        return
      }

      // モデルファイル存在検証
      let modelFileInput = this.$refs.model
      if (modelFileInput.files.length === 0) {
        alert('モデルファイルのアップロードは必須です。')
        return
      }


      // アイテムのID
      let id = new Date().getTime()

      // 商品画像のアップロード
      let imageFile     = imageFileInput.files[0]
      let imageExt      = this.getExt(imageFile.name)
      let imageFileName = `images/${id}.${imageExt}`
      this.$fb.storage().ref().child(imageFileName).put(imageFile)

      // モデルファイルのアップロード
      let modelFile     = modelFileInput.files[0]
      let modelExt      = this.getExt(modelFile.name)
      let modelFileName = `models/${id}.${modelExt}`
      this.$fb.storage().ref().child(modelFileName).put(modelFile)

      // storeに保存
      await this.$fb
        .firestore()
        .collection("items")
        .doc(id.toString())
        .set({
          id:id,
          name:itemNameInput.value,
          text:this.$refs.itemText.value,
          image:this.$storageUrl+imageFileName,
          model:this.$storageUrl+modelFileName
        });

      this.$router.push("/");
    },
    //ファイル名から拡張子を取得する関数
    getExt(filename)
    {
      var pos = filename.lastIndexOf('.');
      if (pos === -1) return '';
      return filename.slice(pos + 1);
    }
  },
  async mounted() {
  },
};
</script>

<style>
</style>
