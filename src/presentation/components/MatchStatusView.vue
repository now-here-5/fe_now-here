<template>
  <div class="match-status-container">
    <div v-if="isLoading" class="loading-spinner-wrapper">
      <LoadingSpinner />
    </div>

    <template v-else>
      <div v-if="matchedList.length === 0" class="no-match-wrapper">
        <span class="title">매칭된 상대가 없어요.</span>
        <span>활발한 매칭을 시도해보세요!</span>
      </div>
      <div v-else class="cards-wrapper">
        <MemberLargeCard
          v-for="member in matchedList"
          :key="member.memberId"
          :member-info="member"
        />
      </div>
    </template>
  </div>
  <FeedbackModal />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MemberLargeCard from './MemberLargeCard.vue'
import { useMatchingStore } from '../stores/matchingStore'
import LoadingSpinner from './LoadingSpinner.vue'
import FeedbackModal from '@/presentation/components/popUp/FeedbackModal.vue'

const matchingStore = useMatchingStore()
const isLoading = ref(false)
const matchedList = ref([])

onMounted(async () => {
  isLoading.value = true
  matchedList.value = await matchingStore.getMatchStatusList()
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.match-status-container {
  padding: 10px;
  margin-top: 90px;
  margin-bottom: 70px;

  .loading-spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 500px;
  }

  .no-match-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80vh;

    .title {
      font-size: $textXXL_size;
      font-weight: $textB_weight;
    }
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px; /* 아이템 간의 간격 */
    row-gap: 40px;
    padding: 0 calc((100% - 250px) / 2); /* 그리드 전체의 좌우 공백 */
  }
}
</style>
