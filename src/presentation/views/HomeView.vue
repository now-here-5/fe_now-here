<template>
  <div class="home-container">
    <main class="main-content">
      <TimerHeader :ends-at="endsAt" />
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
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventStore } from '../stores/eventStore'

const eventStore = useEventStore()
const { endsAt } = storeToRefs(eventStore)

onMounted(() => {
  eventStore.fetchEventEndsAt()
})
//로그인, 자동로그인, 로그인 랜딩 시, eventStore에 저장해서 굳이 onMounted로 호출할 필요 없음
</script>

<style lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
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
