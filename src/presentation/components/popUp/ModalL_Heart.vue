<template>
  <div v-if="popupStore.modalL_heart" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>알림</p>
          </div>
          <div class="modalL_clearContainer"></div>
        </div>
        <div class="modalL_detailContainer">
          <p>하트를 보내시겠습니까?</p>
        </div>
      </div>
      <div class="modalL_btn">
        <div class="modalL_btnBg" @click="sendNotHeart">
          <p>싫어요</p>
        </div>
        <div class="modalL_btnBg active" @click="sendHeart">
          <p>좋아요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePopupStore } from '@/presentation/stores/popupStore.js' // useRouter를 추가로 import

const popupStore = usePopupStore()

const sendNotHeart = () => {
  // 하트 중단 로직
  popupStore.modalL_heart = false
}
const sendHeart = () => {
  // 하트 송신 로직
  popupStore.modalL_heart = false
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

.card_L {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  background: $light_gray;
  box-shadow:
    0px 1px 2px rgba($dark, 0.3),
    0px 2px 6px 2px rgba($dark, 0.15);
  border-radius: 13px 13px 0 0;
}
.infoContainer {
  position: relative;

  width: 250px;
  height: 250px;
}
.scoreContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 80px;
  height: 64px;
  left: 170px;
  z-index: 10; /* imgContainer보다 위에 위치하도록 설정 */

  background: $point;
  box-shadow:
    0px 8px 12px 6px rgba($dark, 0.15),
    0px 4px 4px rgba($dark, 0.3);
  border-radius: 0px 12px 0px 7px;

  p1 {
    font-size: $textXXL_size;
    font-weight: $textB_weight;
    color: $white;
    text-align: center;

    line-height: 30pt;
  }

  p2 {
    font-size: $textMS_size;
    font-weight: $textB_weight;
    color: $white;
    text-align: center;

    line-height: 9pt;
  }
}

.detailContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  gap: 5px;

  position: absolute;
  width: 100%;
  height: 50%;
  top: 125px;

  background: linear-gradient(180deg, rgba($white, 0) 0%, #2e2e2e 100%);
  z-index: 5; /* imgContainer보다 위에 위치하도록 설정 */
}
.mbtiContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;

  background: $white;
  box-shadow: 0px 4px 4px rgba($dark, 0.25);
  border-radius: 5px;
  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: #1c1c1c;
  }
}
.nameContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 2px;

  width: 100%;
  p1 {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $white;
    align-self: stretch;
    flex-grow: 0;
  }

  p2 {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $white;
    align-self: stretch;
    flex-grow: 0;
  }
}

.imgContainer {
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  width: 250px;
  height: 250px;
  left: 0px;
  top: 0px;
  z-index: 1; /* 다른 요소들보다 아래에 위치 */
}
.MBTIimg {
  width: 250px;
  height: 250px;

  border-radius: 12px;
}

.contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  border-radius: 8px;
}
.textContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 12px;

  height: 64px;

  background: $white;
  box-shadow:
    0px 1px 2px rgba($dark, 0.3),
    0px 1px 3px 1px rgba($dark, 0.15);
  border-radius: 0px 0px 10px 10px;

  p {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $dark;

    display: flex;
    align-items: center;

    align-self: stretch;
    flex-grow: 1;
  }
}
</style>
