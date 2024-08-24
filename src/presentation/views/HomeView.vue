<template>
  <div class="home-container">
    <main class="main-content">
      <TimerHeader />
      <TodayCards />
      <HeartStatus />
      <MatchingStatus />

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
import TimerHeader from '@/presentation/components/home/TimerHeader.vue'
import TodayCards from '@/presentation/components/home/TodayCards.vue'
import HeartStatus from '@/presentation/components/home/HeartStatus.vue'
import MatchingStatus from '@/presentation/components/home/MatchingStatus.vue'
</script>

<style lang="scss">
.main-content {
  margin-top: 60px;
}
</style>
