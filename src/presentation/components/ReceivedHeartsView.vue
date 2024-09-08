<template>
  <div class="received-hearts-container">
    <div class="title-wrapper">
      <span class="title">
        <span class="point">총 {{ senderList.length }}분</span>이 당신에게
        <span class="point">하트</span>를 보냈어요!
      </span>
      <span class="desc"> 카드를 눌러 수락 여부를 선택해주세요 </span>
    </div>
    <div v-if="senderList.length > 0" class="cards-wrapper">
      <TodayCardItem
        v-for="(member, idx) in senderList"
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

  <ModalL_CardL v-if="modalL_cardL" :member-info="selectedMember" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMatchingStore } from '../stores/matchingStore'
import TodayCardItem from './home/TodayCardItem.vue'
import ModalL_CardL from './popUp/ModalL_CardL.vue'
import { popupStore } from '../stores/popupStore'
import { storeToRefs } from 'pinia'
import LoadingSpinner from './LoadingSpinner.vue'

const matchingStore = useMatchingStore()
const popUpStore = popupStore()
const senderList = ref([])
const selectedMember = ref({})
const { modalL_cardL } = storeToRefs(popUpStore)

const receiveHearts = (memberInfo) => {
  selectedMember.value = memberInfo
  popUpStore.modalL_cardL = true
}

onMounted(async () => {
  senderList.value = await matchingStore.getReceivedHeartList()
})
</script>

<style lang="scss">
.received-hearts-container {
  padding: 10px;
  margin-top: 90px;
  margin-bottom: 70px;

  .title-wrapper {
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: $textL_size;
      font-weight: $textB_weight;
      .point {
        color: $point;
        font-weight: $textB_weight;
      }
    }
    .desc {
      font-size: $textMS_size;
      font-weight: $textM_weight;
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
