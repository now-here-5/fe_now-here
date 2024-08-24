<template>
  <div class="main-container">
    <RouterView />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.main-container {
  min-width: 375px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-y: auto;

  // 추가적인 스타일링
  background-color: white;
  border: 1px solid #ddd; // 테두리
  /* border-radius: 8px; // 모서리 둥글게 */
}
</style>
