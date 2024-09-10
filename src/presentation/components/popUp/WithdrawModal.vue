<template>
  <div v-if="popupStore.modalLVisible.withdraw" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>잠깐! 진짜 떠나시나요?..</p>
          </div>
          <div class="modalL_clearContainer"></div>
        </div>
        <div class="modalL_imgContainer">
          <img src="/images/Modal_Image/modal_Crying.png" class="modalL_img" />
        </div>
        <div class="modalL_detailContainer">
          <p>
            축제가 끝나면 자동 탈퇴 후,<br />
            개인정보가 파기됩니다.<br />
            벌써 떠나실 건가요?
          </p>
        </div>
      </div>
      <div class="modalL_btn">
        <div class="modalL_btnBg" @click="navigateToDeleteAccount">
          <p>탈퇴하기</p>
        </div>
        <div class="modalL_btnBg active" @click="closeAlertModalL_deleteAccount">
          <p>돌아가기</p>
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

const navigateToDeleteAccount = () => {
  popupStore.modalLVisible.withdraw = false
  router.push('withdraw')
}
const closeAlertModalL_deleteAccount = () => {
  popupStore.modalLVisible.withdraw = false
}
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
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.modalL_imgContainer {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
}
.modalL_img {
  width: 150px;
  height: 150px;
}
.modalL_detailContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 20px;
  gap: 15px;

  width: 100%;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  p {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.modalL_progressComponent {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  width: 55px;
}
.modalL_circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: $middle_gray;
}
.active-circle {
  background: $dark;
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

  background: $middle_gray;
  border-radius: 12px;

  flex-grow: 1;
  p {
    font-size: $textM_size;
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
.modalL_btnBg.active {
  background: $point;
  cursor: pointer;
}
.modalL_btnBg.active p {
  color: $white;
}

.slider {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  justify-content: center;
}
.slides {
  display: flex;
  transition: transform 0.5s ease;
}
.slide {
  min-width: 100%;
}

.slide-left-area,
.slide-right-area {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  cursor: pointer;
}
.slide-left-area {
  left: 0;
}
.slide-right-area {
  right: 0;
}
</style>
