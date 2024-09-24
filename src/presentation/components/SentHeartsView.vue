<template>
  <div class="sent-hearts-container">
    <div v-if="isLoading" class="loading-spinner-wrapper">
      <LoadingSpinner />
    </div>

    <template v-else>
      <div v-if="sentList.length === 0" class="no-sent-hearts-wrapper">
        <span class="title">보낸 하트가 없어요.</span>
        <span>활발한 매칭을 시도해보세요!</span>
      </div>
      <div v-else class="cards-wrapper">
        <TodayCardItem
          v-for="(member, idx) in sentList"
          :key="idx"
          :member-info="member"
          :show-desc="true"
          :show-mbti="true"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TodayCardItem from './home/TodayCardItem.vue'
import { useMatchingStore } from '../stores/matchingStore'
import LoadingSpinner from './LoadingSpinner.vue'

const matchingStore = useMatchingStore()
const sentList = ref([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  sentList.value = await matchingStore.getSentHeartList()
  isLoading.value = false
})
</script>

<style lang="scss">
.sent-hearts-container {
  padding: 10px;
  margin-top: 90px;
  margin-bottom: 70px;

  .no-sent-hearts-wrapper {
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
    grid-template-columns: repeat(2, 1fr);
    gap: 10px; /* 아이템 간의 간격 */
    row-gap: 20px;
    padding: 0 10px; /* 그리드 전체의 좌우 공백 */
  }

  .loading-spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 500px;
  }
}
</style>
