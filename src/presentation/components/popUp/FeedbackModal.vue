<template>
  <div v-if="popupStore.modalLVisible.review" class="overlay">
    <div class="modalL">
      <div class="contentContainer">
        <div class="header">
          <div class="titleContainer">
            <span>1분만!<br />시간 내주실 수 있나요?</span>
          </div>
          <div class="clearContainer"></div>
        </div>
        <div class="imgContainer">
          <img src="/images/Modal_Image/modal_Mailbox.png" class="modalL_img" alt="mailBox"/>
        </div>
        <div class="detailContainer">
          <span>
            소중한 의견을 남겨주시면,<br>
            상대방에게 메세지 알림이 가는<br>
            '스페셜 하트' 5개를 드립니다!"
          </span>
        </div>
      </div>
      <div class="btn">
        <div class="btnBg" @click="closeModal">
          <span>싫어요</span>
        </div>
        <div class="btnBg active" @click="navigateToReview">
          <span>좋아요</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const router = useRouter()
const popupStore = usePopupStore()

const closeModal = () => {
  popupStore.modalLVisible.review = false
}
const navigateToReview = () => {
  popupStore.modalLVisible.review = false
  router.push('/interaction/feedback')
}
</script>

<style scoped lang="scss">
.overlay {
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
.modalL {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 250px;
}
.contentContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: $white;
  border-bottom: 1px solid $dark;
  border-radius: 15px 15px 0 0;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 10px 0;
  width: 100%;
  height: 60px;
}
.titleContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0 0 0 34px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  span {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.clearContainer {
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.imgContainer {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
}
.modalL_img {
  width: 150px;
  height: 150px;
}
.detailContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 20px;
  gap: 15px;
  width: 100%;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  span {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;
  width: 100%;
  background: $white;
  border-radius: 0 0 15px 15px;
}
.btnBg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  background: $middle_gray;
  border-radius: 12px;
  flex-grow: 1;
  span {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $gray;
  }
  &.active {
    background: $point;
    span {
      color: $white;
    }
  }
}
.btnBg.active {
  background: $point;
  cursor: pointer;
}
.btnBg.active span {
  color: $white;
}
</style>
