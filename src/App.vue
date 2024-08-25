<template>
  <MainHeader v-if="showMainHeader" />
  <div class="main-container">
    <RouterView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import MainHeader from '@/presentation/components/MainHeader.vue'
import { computed } from 'vue'

const route = useRoute()
const showMainHeader = computed(() => route.path === '/')
</script>

<style scoped lang="scss">
.main-container {
  width: 400px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;

  /* 스크롤바 숨기기 설정 */
  scrollbar-width: none; /* Firefox용 설정 */
  -ms-overflow-style: none; /* IE와 Edge용 설정 */
}

/* 모바일 환경을 위한 미디어 쿼리 */
@media (max-width: 767px) {
  .main-header {
    width: 100vw;
  }
  .main-container {
    width: 100vw;
  }
}
/* 웹킷 기반 브라우저에서 스크롤바 숨기기 */
.main-container::-webkit-scrollbar {
  display: none;
}
</style>
