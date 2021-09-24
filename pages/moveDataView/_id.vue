<template>
  <div>
    <a-scene ref="scene" style="z-index: 9999">
      <!-- <a-assets>
        <img id="boxTexture" src="https://i.imgur.com/mYmmbrp.jpg" />
      </a-assets>
      <a-box
        src="#boxTexture"
        position="0 0 -5"
        rotation="0 0 0"
        scale="2 2 2"
        ref="item"
      ></a-box> -->

      <a-entity camera> </a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:"",
      moveData:{},
      item:"",
      scene:'',
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
    },
    // モデルのロード
    modelLoad(){
      let aAseetItem = document.createElement('a-asset-item')
      aAseetItem.setAttribute('id', 'item')
      aAseetItem.setAttribute('src', this.item.model)
      this.scene.appendChild(aAseetItem)
    },

    // モデルの表示
    modelView(){
      let aEntity = document.createElement('a-entity')
      aEntity.setAttribute('rotation', '0 0 0')
      aEntity.setAttribute('position', '0 0 -0.5')
      aEntity.setAttribute('gltf-model', '#item')
      aEntity.setAttribute('scale', '1 1 1')
      this.scene.appendChild(aEntity)

      var time = 0;
      setInterval(() => {
        let data = this.moveData.data[time]
        aEntity.object3D.rotation.set(
          data.x,
          data.y,
          data.z,
        )
        time++;
      }, 100);
    },
  },

  async mounted() {
    // firebaseオブジェクト
    const db = this.$fb.firestore()
    await db.collection("moveData").doc(this.$route.params.id.toString()).get().then((doc)=>{
      console.log(doc.data());
      this.moveData = doc.data()
    })

    await db.collection("items").doc(this.moveData.item_id.toString()).get().then((doc)=>{
      console.log(doc.data());
      this.item = doc.data()
    })

    // オブジェクトの表示
    this.scene = this.$refs.scene
    this.modelLoad();
    this.$nextTick(()=>{
      this.modelView();
    })
  },
};
</script>

<style>
</style>
