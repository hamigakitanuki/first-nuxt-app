<template>
  <div
    v-on:mousemove="mouseMove"
    v-on:mousedown="onMouseDown"
    v-on:mouseup="onMouseUp"
  >
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
      moveData:[],
      item:"",
      ARObject:"",
      scene:'',
      mouseStatus: {
        onDown:false,
        onUp:true,
        startX:0,
        startY:0,
      }
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
      this.targetItem = aEntity;
      this.scene.appendChild(aEntity)
    },
    // マウスのイベント
    onMouseDown(e){
      this.mouseStatus.onDown = true;
      this.mouseStatus.onUp   = false;
      this.mouseStatus.startX = e.offsetX;
      this.mouseStatus.startY = e.offsetY;
      console.log("down");
    },
    onMouseUp(){
      this.mouseStatus.onDown = false;
      this.mouseStatus.onUp   = true;
      console.log("up");
    },

    // 動きの検知
    mouseMove(e){
      if (this.mouseStatus.onUp){
        return false;
      }

      let onMoveX         = this.mouseStatus.startX - e.offsetX
      let onMoveY         = this.mouseStatus.startY - e.offsetY
      let rotateMustPixel = 100;
      let degX            = onMoveX / rotateMustPixel * 365
      let degY            = onMoveY / rotateMustPixel * 365

      this.targetItem.object3D.rotation.set(
        THREE.Math.degToRad(0),
        THREE.Math.degToRad(degX),
        THREE.Math.degToRad(degY),
      )
    },
    setMoveData(){
      this.moveData.push({
        x:this.targetItem.object3D.rotation.x,
        y:this.targetItem.object3D.rotation.y,
        z:this.targetItem.object3D.rotation.z
      })

      this.$fb
        .firestore()
        .collection("moveData")
        .doc(this.id)
        .set({
          data:this.moveData
        });
    }
  },

  async mounted() {


    // firebaseオブジェクト
    const db = this.$fb.firestore()
    await db.collection("items").doc(this.$route.params.id.toString()).get().then((doc)=>{
      console.log(doc.data());
      this.item = doc.data()
    })

    // 動き情報用ID
    this.id = this.item.id.toString() + '_' + (new Date().getTime());

    // オブジェクトの表示
    this.scene = this.$refs.scene
    this.modelLoad();
    var self = this;
    this.$nextTick(()=>{
      this.modelView();

      setInterval(() => {
        self.setMoveData();
      }, 1000);
    })

  },
};
</script>

<style>
</style>
