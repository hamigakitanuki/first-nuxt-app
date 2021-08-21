<template>
  <div>
    <a-scene>
      <a-asset-item id="uribo" src="/apple.gltf"></a-asset-item>
      <a-entity
        id="animated-model"
        rotation="0 0 0"
        position="5 0 -5"
        gltf-model="#uribo"
        scale="50 50 50"
      ></a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
  },
  async mounted() {
  },
};
</script>

<style>
</style>
