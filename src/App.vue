<template>
  <MainHeader v-if="showMainHeader" />
  <div class="main-container">
    <RouterView />
  </div>
  <div v-if="showBottomNav" class="bottom-nav-container">
    <RouterLink to="/match" class="bottom-nav-menu" active-class="active">매칭</RouterLink>
    <RouterLink to="/" class="bottom-nav-menu" active-class="active">홈</RouterLink>
    <RouterLink to="/profile" class="bottom-nav-menu" active-class="active">프로필</RouterLink>
  </div>

  <ToastM />
</template>

<script setup>
import MainHeader from '@/presentation/components/MainHeader.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import ToastM from '@/presentation/components/popUp/ToastM.vue'

const route = useRoute()
const showMainHeader = computed(() => route.path === '/' || route.path === '/profile')
const showBottomNav = computed(() => route.path === '/' || route.path.startsWith('/match'))
</script>

<style scoped lang="scss">
.main-container {
  //padding: 0 20px; 삭제
  width: 400px;
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: white;
  border: 1px solid $white;

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

.bottom-nav-container {
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 400px;
  height: 70px;
  border-top: 1px solid $gray;
  border-left: 1px solid $white;
  border-right: 1px solid $white;

  .bottom-nav-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    color: $gray;

    &.active {
      border-top: 2px solid $dark;
      font-size: 20px;
      color: $dark;
    }
  }
}
</style>
