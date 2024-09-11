<template>
  <div class="match-status-container">
    <div v-if="matchedList.length > 0" class="cards-wrapper">
      <MemberLargeCard v-for="member in matchedList" :key="member.memberId" :member-info="member" />
    </div>

    <div v-else class="loading-spinner-wrapper">
      <LoadingSpinner />
    </div>
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

const matchedList = ref([])

onMounted(async () => {
  matchedList.value = await matchingStore.getMatchStatusList()
})
</script>

<style scoped lang="scss">
  .match-status-container {
   padding: 10px;
   margin-top: 90px;
   margin-bottom: 70px;

   .cards-wrapper {
     display: grid;
     grid-template-columns: repeat(1, 1fr);
     gap: 10px; /* 아이템 간의 간격 */
     row-gap: 40px;
     padding: 0 calc((100% - 250px) / 2); /* 그리드 전체의 좌우 공백 */
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
