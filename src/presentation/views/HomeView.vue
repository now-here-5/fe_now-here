<template>
  <div class="home-container">
    <MainHeader />
    <TimerHeader />

    <main class="main-content">
      <TodayCards />
      <HeartStatus />
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
import TimerHeader from '@/presentation/components/home/TimerHeader.vue'
import TodayCards from '@/presentation/components/home/TodayCards.vue'
import HeartStatus from '@/presentation/components/home/HeartStatus.vue'
</script>

<style lang="scss">
.main-content {
  margin-top: var(--mg-top-main-sub-header);
}
</style>
