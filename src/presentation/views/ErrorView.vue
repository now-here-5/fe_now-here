<template>
  <div class="frame">
    <img class="imageContainer" src="/images/404_error.png" alt="error" />
    <span v-html="'페이지에 접근할 수 없습니다.<br> QR코드를 통해 접속해주세요'"></span>
    <button @click="requestPermission">allow</button>
  </div>
</template>

<script setup>
import { requestPermission } from '@/composables/useNotification'
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 150px 0;
  gap: 50px;
  height: 100vh;
  span {
    font-weight: $textS_weight;
    font-size: $textM_size;
    text-align: center;
    color: $dark;
  }
}
.imageContainer {
  width: 300px;
  height: 215px;
}
</style>
