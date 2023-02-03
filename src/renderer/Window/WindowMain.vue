<script setup lang="ts">
</script>

<template>
  <div class="pageBox">
    <div>
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pageBox {
  flex: 1;
  width: 100%;
  height: 100%;
  border-top: 1px solid #e6e6e6;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-top: -1px;
}
</style>
