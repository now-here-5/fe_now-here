<template>
  <div v-if="popupStore.modalLVisible.heart" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>알림</p>
          </div>
          <div class="modalL_clearContainer">
            <img width="34px" src="/images/clear.png" @click="closeModal" />
          </div>
        </div>
        <div class="modalL_detailContainer">
          <LoadingSpinner v-if="isLoading" />
          <p v-else>
            <span>{{ memberInfo.nickname }}님께 하트를 보내시겠습니까?<br /></span>
            <span class="boldText">스페셜 하트</span>를 보내면,<br />
            상대방에게 메세지 알림이 갑니다!
          </p>
        </div>
      </div>
      <div class="modalL_btn">
        <div class="modalL_btnBg active" @click="sendHeart(false)">
          <p>하트</p>
        </div>
        <div class="modalL_btnBg active" @click="sendHeart(true)">
          <p>스폐셜 하트 x {{ specialHearts }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { usePopupStore } from '@/presentation/stores/popupStore.js' // useRouter를 추가로 import
import { ref } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const props = defineProps({
  memberInfo: {
    type: Object,
    required: true
  }
})

const popupStore = usePopupStore()
const matchingStore = useMatchingStore()
const { specialHearts } = storeToRefs(matchingStore)
const router = useRouter()

const isLoading = ref(false)

const closeModal = () => {
  popupStore.modalLVisible.heart = false
}

// 하트 보내기
const sendHeart = async (isSpecialUsed) => {
  const body = {
    receiverId: props.memberInfo.memberId,
    isSpecialUsed
  }
  try {
    await matchingStore.sendHeart(body)
    alert('하트가 전송되었습니다.')
    // 하트 전송이 되면 추천 회원을 새로운 응답으로 업데이트
    await matchingStore.fetchRecommendedCards()
    // 하트 전송이 완료되면 보낸 하트 페이지로 이동
    router.push('/match/sent-hearts')
  } catch (err) {
    alert('하트 전송 과정에서 에러가 발생했습니다.')
  } finally {
    popupStore.modalLVisible.heart = false
  }
}

// onMounted(async () => {
//   isLoading.value = true
//   specialHearts.value = await matchingStore.getSpecialHeart()
//   isLoading.value = false
// })
</script>

<style scoped lang="scss">
/* modal 오버레이 */
.M_Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}
/* modalL */
.modalL {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 250px;
}
.modalL_contentContainer {
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 100%;

  background: $white;
  border-bottom: 1px solid $dark;
  border-radius: 15px 15px 0px 0px;
}
.modalL_header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 10px 0px;

  width: 100%;
  height: 60px;
}
.modalL_titleContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0px 0px 0px 34px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.modalL_clearContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.modalL_detailContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 20px;
  gap: 15px;
  width: 100%;
  min-height: 77px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  p {
    font-size: $textS_size;
    font-weight: 500;
    color: $dark;
    text-align: center;
  }
  .boldText {
    font-weight: 900;
  }
}
.modalL_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;

  width: 100%;

  background: $white;
  border-radius: 0px 0px 15px 15px;
}
.modalL_btnBg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 40px;
  min-width: 50px;

  background: $middle_gray;
  border-radius: 12px;

  flex-grow: 1;
  p {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $gray;
  }
  &.active {
    background: $point; /* active 클래스가 있을 때의 배경 색상 */
    p {
      color: $white;
    }
  }
}
</style>
