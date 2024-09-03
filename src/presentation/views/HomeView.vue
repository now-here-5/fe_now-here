<template>
  <div class="home-container">
    <main class="main-content">
      <TimerHeader :ends-at="eventEndsAt" />
      <TodayCards />
      <HeartHistory />
      <MatchingStatus />
      <DirectReview />
    </main>
    <footer class="footer-container">
      <span>이용약관</span>
      <span>개인정보처리방침</span>
      <span>문의하기</span>
    </footer>
  </div>
</template>

<script setup>
import TimerHeader from '@/presentation/components/home/TimerHeader.vue'
import TodayCards from '@/presentation/components/home/TodayCards.vue'
import HeartHistory from '@/presentation/components/home/HeartHistory.vue'
import MatchingStatus from '@/presentation/components/home/MatchingStatus.vue'
import DirectReview from '@/presentation/components/home/DirectReview.vue'
import { useEventStore } from '../stores/eventStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const eventStore = useEventStore()
const { eventEndsAt } = storeToRefs(eventStore)

onMounted(() => {
  eventStore.fetchEventEndsAt()
})
</script>

<style lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main-content {
  margin-top: 70px;
}
.footer-container {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 60px;
  margin-top: 20px;
  span {
    font-size: $textS_size;
    font-weight: $textM_weight;
    cursor: pointer;
  }
}
</style>
