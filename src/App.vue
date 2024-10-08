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
import ToastM from '@/presentation/components/popUp/ToastM.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showMainHeader = computed(
  () => route.path === '/' || route.path === '/profile' || route.path.startsWith('/match')
)
const showBottomNav = computed(
  () => route.path === '/' || route.path === '/profile' || route.path.startsWith('/match')
)
</script>

<style scoped lang="scss">
.main-container {
  //padding: 0 20px; 삭제
  width: 400px;
  /* min-height: 100vh; */
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: white;
  border: 1px solid $white;
  @media (min-width: 767px) {
    box-shadow: 0 6px 10px 4px rgba(0, 0, 0, 0.15);
  }

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
  z-index: 100;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    width: 100vw; // 모바일 기준 너비 설정
  }

  .bottom-nav-menu {
    box-sizing: border-box;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    color: $gray;

    &.active {
      border-top: 2px solid $dark;
      font-size: 20px;
      color: $dark;
      transform: translateY(-1px);
    }
  }
}
</style>
