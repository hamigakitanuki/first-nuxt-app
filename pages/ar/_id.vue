<template>
  <div>
    <a-scene ref="scene"> </a-scene>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item:""
    };
  },
  methods:{
    async popstateHook() {
      await this.popstateEvent().then(async (value) => {
        if (value === 'フォームでのpopstateイベント' && this.$route.name === 'user_register') {
          // ルートが変更画面のままなら進むボタンと判断して確認画面へ進む処理を行う
          // 履歴のスタックに現在の URL を追加
          history.pushState(null, '', null);
          // 確認画面を表示
          this.showConfirm = true;
        }
      });
    }
  },
  async mounted() {
    const db = this.$fb.firestore()
    await db.collection("items").doc(this.$route.params.id.toString()).get().then((doc)=>{
      console.log(doc.data());
      this.item = doc.data()
    })

    // オブジェクトの表示
    let scene = this.$refs.scene
    let aAseetItem = document.createElement('a-asset-item')

    aAseetItem.setAttribute('id', 'item')
    aAseetItem.setAttribute('src', this.item.model)
    scene.appendChild(aAseetItem)

    this.$nextTick(()=>{
      let aEntity = document.createElement('a-entity')
      aEntity.setAttribute('rotation', '0 0 0')
      aEntity.setAttribute('position', '0 -10 -15')
      aEntity.setAttribute('gltf-model', '#item')
      aEntity.setAttribute('scale', '1 1 1')
      scene.appendChild(aEntity)
    })

    // ブラウザバック検知

  },
};
</script>

<style>
</style>
