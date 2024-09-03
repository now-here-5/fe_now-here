<template>
  <div class="heart-status-container">
    <span class="title">하트 내역</span>
    <span class="desc">받은 하트와 보낸 하트를 한 눈에 볼 수 있어요!</span>
    <div class="heart-item-wrapper">
      <div class="heart-item">
        <LoadingSpinner v-if="isLoading" />
        <template v-else>
          <span class="heart-text">보낸 하트</span>
          <span class="heart-count">{{ matchingSummary.sendLove }}</span>
          <span v-if="matchingSummary.sendLove !== 0" class="new-badge">N</span>
        </template>
      </div>
      <div class="heart-item">
        <LoadingSpinner v-if="isLoading" />
        <template v-else>
          <span class="heart-text">보낸 하트</span>
          <span class="heart-count">{{ matchingSummary.receiveLove }}</span>
          <span v-if="matchingSummary.sendLove !== 0" class="new-badge">N</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { onMounted, ref } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'

const mathingStore = useMatchingStore()
const matchingSummary = ref({})
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  const { data } = await mathingStore.getMatchingSummaryForHomeView()
  matchingSummary.value = data.data[0]
  isLoading.value = false
})
</script>

<style lang="scss">
.heart-status-container {
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

  .heart-item-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    width: 100%;
    margin-top: 10px;

    .heart-item {
      display: flex;
      justify-content: space-between;
      background-color: $light_grey;
      padding: 15px;
      align-items: center;
      border-radius: 15px;
      cursor: pointer;
      box-shadow: 0px 1px 3px 0px #0000004d;

      .heart-text {
        font-size: 15px;
        font-weight: bold;
      }

      .heart-count {
        color: $point;
        font-size: 15px;
        font-weight: bold;
        margin-left: 10px;
        flex-grow: 1;
      }

      .new-badge {
        background-color: $point;
        color: $white;
        font-size: 12px;
        font-weight: 700;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
    }
  }
}
</style>
