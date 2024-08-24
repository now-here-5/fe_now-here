<template>
  <div class="home-container">
    <MainHeader />

    <main class="main-content">
      <RouterLink to="/match">오늘의 카드</RouterLink>
      <RouterLink to="/contact">문의하기</RouterLink>
      <nav>
        <RouterLink to="/">홈</RouterLink>
        <RouterLink to="/match">매칭</RouterLink>
        <RouterLink to="/profile">프로필</RouterLink>
      </nav>
    </main>
  </div>
</template>

<script setup>
import MainHeader from '@/presentation/components/MainHeader.vue'
</script>

<style lang="scss">
.main-content {
  margin-top: 60px;
}
</style>
