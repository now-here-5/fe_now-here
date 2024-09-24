<template>
  <div class="today-card-container">
    <span class="title">오늘의 카드</span>
    <span class="desc">카드를 누르면 더 많은 정보를 확인할 수 있어요!</span>
    <div class="cards-wrapper" @click="moveToMatch">
      <div v-if="isLoading" class="loading-wrapper">
        <LoadingSpinner />
      </div>
      <template v-else>
        <template v-if="recommendedMembers.length > 0">
          <TodayCardItem :member-info="recommendedMembers[0]" />
          <TodayCardItem :member-info="recommendedMembers[1]" />
        </template>
        <div v-else class="no-match-wrapper">
          <span class="title">현재 매칭 가능한 상대가 없습니다.</span>
          <span>조금만 기다려주세요!</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import TodayCardItem from '@/presentation/components/home/TodayCardItem.vue'
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import { useRouter } from 'vue-router'

const matchingStore = useMatchingStore()
const { recommendedMembers } = storeToRefs(matchingStore)
const router = useRouter()
const isLoading = ref(false)

const moveToMatch = () => {
  router.push('/match')
}

onMounted(async () => {
  isLoading.value = true
  await matchingStore.fetchRecommendedCards()
  isLoading.value = false
})
</script>

<style lang="scss">
.today-card-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  .title {
    font-size: $textL_size;
    font-weight: $textB_weight;
  }
  .desc {
    font-size: $textMS_size;
    font-weight: $textM_weight;
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

    .no-match-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 230px;

      .title {
        font-size: $textXL_size;
        font-weight: $textB_weight;
      }
    }
  }
}
</style>
