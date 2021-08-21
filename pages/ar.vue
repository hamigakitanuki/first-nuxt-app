<template>
  <div>
    <a-scene>
      <a-asset-item
        id="uribo"
        v-bind:src="domainUrl + modelName"
      ></a-asset-item>
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
      domainUrl:"https://storage.googleapis.com/nuxt-app-f5b1a.appspot.com/",
      modelName:"apple.gltf",
    };
  },
  computed: {
  },
  async mounted() {
  },
};
</script>

<style>
</style>
