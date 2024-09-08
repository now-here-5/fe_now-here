<template>
  <div class="sent-hearts-container">
    <div v-if="sentList.length > 0" class="cards-wrapper">
      <TodayCardItem
        v-for="(member, idx) in sentList"
        :key="idx"
        :member-info="member"
        :show-desc="true"
        :on-custom-click="() => receiveHearts(member)"
      />
    </div>
    <div v-else class="loading-spinner-wrapper">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TodayCardItem from './home/TodayCardItem.vue'
import { useMatchingStore } from '../stores/matchingStore'
import LoadingSpinner from './LoadingSpinner.vue'

const matchingStore = useMatchingStore()
const sentList = ref([])

onMounted(async () => {
  sentList.value = await matchingStore.getSentHeartList()
})
</script>

<style lang="scss">
.sent-hearts-container {
  padding: 10px;
  margin-top: 90px;
  margin-bottom: 70px;

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
