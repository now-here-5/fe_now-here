<template>
  <MainHeader v-if="showMainHeader" />
  <div class="main-container">
    <RouterView />
  </div>
  <div class="bottom-nav-container" v-if="showMainHeader">
    <RouterLink to="/match" class="bottom-nav-menu" active-class="active">매칭</RouterLink>
    <RouterLink to="/" class="bottom-nav-menu" active-class="active">홈</RouterLink>
    <RouterLink to="/profile" class="bottom-nav-menu" active-class="active">프로필</RouterLink>
  </div>

  <div v-if="store_Contact_inquiry.tostM_inquiry || store_Contact_inquiry.tostM_review" class="tostM_space">
    <div class="mContainer">
      <p v-if="store_Contact_inquiry.tostM_inquiry">문의 내용이 정상 접수되었습니다.</p>
      <p v-else-if="store_Contact_inquiry.tostM_review">소중한 의견을 주셔서 감사합니다!</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import MainHeader from '@/presentation/components/MainHeader.vue'
import { computed } from 'vue'
import { contact_inquiryStore } from "@/presentation/stores/contact_inquiryStore.js";

const store_Contact_inquiry = contact_inquiryStore();
const route = useRoute()
const showMainHeader = computed(() => route.path === '/' || route.path === '/profile');
</script>

<style scoped lang="scss">
.main-container {
  width: 400px;
  /* height: 100vh; */
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;

  /* 스크롤바 숨기기 설정 */
  scrollbar-width: none; /* Firefox용 설정 */
  -ms-overflow-style: none; /* IE와 Edge용 설정 */
}

/* 모바일 환경을 위한 미디어 쿼리 */
@media (max-width: 600px) {
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
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;

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

.tostM_space {
  position: fixed;
  bottom: 0;
  width: 400px;
  height: 135px;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.mContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;

  height: 45px;

  background: $point;
  border-radius: 15px;
  border: 3px solid $white;

  align-self: stretch;
  flex-grow: 0;
  p {
    color: $white;
    font-size: $textS_B;
    font-weight: $font_Bold;
    text-align: center;
  }
}
</style>
