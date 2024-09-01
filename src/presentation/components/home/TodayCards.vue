<template>
  <div class="today-card-container">
    <span class="title">오늘의 카드</span>
    <span class="desc">카드를 누르면 더 많은 정보를 확인할 수 있어요!</span>
    <div class="cards-wrapper">
      <div v-if="!recommendedMembers.length" class="loading-wrapper">
        <LoadingSpinner />
      </div>
      <template v-else>
        <TodayCardItem :member-info="recommendedMembers[0]" />
        <TodayCardItem :member-info="recommendedMembers[1]" />
      </template>
    </div>
  </div>
</template>

<script setup>
import TodayCardItem from '@/presentation/components/home/TodayCardItem.vue'
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'

const matchingStore = useMatchingStore()
const { recommendedMembers } = storeToRefs(matchingStore)

onMounted(async () => {
  await matchingStore.fetchRecommendedCards()
})
</script>

<style lang="scss">
.today-card-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .desc {
    font-size: 14px;
    font-weight: 500;
  }
  .cards-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 15px;

    .loading-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 230px;
    }
  }
}
</style>
