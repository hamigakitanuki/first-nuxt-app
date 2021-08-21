<template>
  <div>
    <a-scene>
      <a-asset-item id="uribo" v-bind:src="modelPath"></a-asset-item>
      <a-entity
        id="animated-model"
        rotation="0 0 0"
        position="3 0 -3"
        gltf-model="#uribo"
        scale="50 50 50"
      ></a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelPath:"",
    };
  },
  computed: {
  },
  async mounted() {
    let storageRef = this.$fb.storage().ref();
    this.modelPath = storageRef.child('apple.gltf').fullPath
  },
};
</script>

<style>
</style>
