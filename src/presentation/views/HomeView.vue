<template>
  <div class="home-container">
    <main class="main-content">
      <TimerHeader :ends-at="endsAt" />
      <TodayCards />
      <Banner />
      <HeartHistory />
      <MatchingStatus />
      <DirectReview />
    </main>
    <footer class="footer-container">
      <span @click="openBottomSheet('service')">이용약관</span>
      <span @click="openBottomSheet('privacy')">개인정보처리방침</span>
      <span @click="router.push('/interaction/inquiry')">문의하기</span>
    </footer>
  </div>

  <BottomSheetAgree />
  <BottomSheetTerm />
</template>

<script setup>
import TimerHeader from '@/presentation/components/home/TimerHeader.vue'
import TodayCards from '@/presentation/components/home/TodayCards.vue'
import HeartHistory from '@/presentation/components/home/HeartHistory.vue'
import MatchingStatus from '@/presentation/components/home/MatchingStatus.vue'
import DirectReview from '@/presentation/components/home/DirectReview.vue'
import Banner from '@/presentation/components/home/Banner.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventStore } from '../stores/eventStore'
import { useRouter } from 'vue-router'
import { usePopupStore } from '../stores/popupStore'
import BottomSheetAgree from '../components/popUp/BottomSheetAgree.vue'
import BottomSheetTerm from '../components/popUp/BottomSheetTerm.vue'

const eventStore = useEventStore()
const popupStore = usePopupStore()
const router = useRouter()
const { endsAt } = storeToRefs(eventStore)

const openBottomSheet = (type) => {
  if (type === 'sevice') {
    popupStore.termType = type
    popupStore.bottomSheetVisible.agree = true
  } else {
    popupStore.termType = type
    popupStore.bottomSheetVisible.terms = true
  }
}

onMounted(() => {
  eventStore.fetchEventEndsAt()
})
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
