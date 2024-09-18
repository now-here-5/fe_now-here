<template>
  <div class="heart-status-container">
    <span class="title">하트 내역</span>
    <span class="desc">받은 하트와 보낸 하트를 한 눈에 볼 수 있어요!</span>
    <div class="heart-item-wrapper">
      <div class="heart-item" @click="router.push('/match/sent-hearts')">
        <LoadingSpinner v-if="isLoading" />
        <template v-else>
          <span class="heart-text">보낸 하트</span>
          <span class="heart-count">{{ matchingSummary.sendLove }}</span>
          <span v-if="matchingSummary.sendLove != 0" class="new-badge">N</span>
        </template>
      </div>
      <div class="heart-item" @click="router.push('/match/received-hearts')">
        <LoadingSpinner v-if="isLoading" />
        <template v-else>
          <span class="heart-text">받은 하트</span>
          <span class="heart-count">{{ matchingSummary.receiveLove }}</span>
          <span v-if="matchingSummary.receiveLove != 0" class="new-badge">N</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { onMounted, ref } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import { useRouter } from 'vue-router'

const mathingStore = useMatchingStore()
const matchingSummary = ref({})
const isLoading = ref(true)
const router = useRouter()

onMounted(async () => {
  isLoading.value = true
  const { data } = await mathingStore.getMatchingSummaryForHomeView()
  matchingSummary.value = data[0]
  isLoading.value = false
})
</script>

<style lang="scss">
.heart-status-container {
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
      background-color: $light_gray;
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
        font-size: $textS_size;
        font-weight: $textB_weight;
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
