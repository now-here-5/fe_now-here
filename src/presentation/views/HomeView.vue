<template>
  <div class="home-container">
    <main class="main-content">
      <TimerHeader />
      <TodayCards />
      <HeartStatus />
      <MatchingStatus />
      <DirectReview />
    </main>
  </div>
</template>

<script setup>
import TimerHeader from '@/presentation/components/home/TimerHeader.vue'
import TodayCards from '@/presentation/components/home/TodayCards.vue'
import HeartStatus from '@/presentation/components/home/HeartStatus.vue'
import MatchingStatus from '@/presentation/components/home/MatchingStatus.vue'
import DirectReview from '@/presentation/components/home/DirectReview.vue'
</script>

<style lang="scss">
.main-content {
  margin-top: 60px;
}
</style>
