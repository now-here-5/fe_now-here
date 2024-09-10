<template>
  <div v-if="popupStore.modalLVisible.matchLanding" class="overlay">
    <div class="modalL">
      <div class="contentContainer">
        <div class="header">
          <div class="titleContainer">
            <span>잠깐! 꼭 확인해주세요.</span>
          </div>
          <img class="clearContainer" src="/images/clear.png" @click="navigateToHome" alt="clear"/>
        </div>
        <div class="slider">
          <div class="slider">
            <div class="slides" :style="{ transform: `translateX(-${currentStep * 100}%)` }">
              <div v-for="(image, index) in images" :key="index" class="slide">
                <div class="imgContainer">
                  <img :src="image" class="img" alt="modalImg"/>
                </div>
              </div>
            </div>
            <div class="slide-left-area" @click="prevSlide"></div>
            <div class="slide-right-area" @click="nextSlide"></div>
          </div>
        </div>
        <div class="detailContainer">
          <span v-html="currentText" />
          <div class="progressComponent">
            <div
              v-for="(circle, index) in 3"
              :key="index"
              :class="{ mod: true, 'active-circle': index === currentStep }"
            />
          </div>
        </div>
      </div>
      <div class="btn">
        <div
          class="btnBg"
          :class="{ active: currentStep === 2 }"
          @click="currentStep === 2 ? agreeModal() : null"
        >
          <span>동의하고 계속하기</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import matchLandingMobile from '/images/Modal_Image/modal_mobile.png'
import matchLandingCouple from '/images/Modal_Image/modal_Couple.png'
import matchLandingNotification from '/images/Modal_Image/modal_Notification.png'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const router = useRouter()
const popupStore = usePopupStore()

const currentStep = ref(0) // 현재 슬라이드 위치 (0부터 시작)
const images = [matchLandingMobile, matchLandingCouple, matchLandingNotification]
const texts = [
  '매칭이 성사되면 서로의 전화번호를<br>동시에 공유해드립니다.',
  '매칭 후의 모든 연락과 만남은<br>사용자의 판단과 책임 하에 이뤄집니다.',
  '서비스 사용 전,<br>주의사항을 꼭 확인해주세요.'
]
const currentText = computed(() => texts[currentStep.value])

const navigateToHome = () => {
  popupStore.modalLVisible.matchLanding = false
  popupStore.matchAgree = false
  router.push('/')
}
const agreeModal = () => {
  popupStore.modalLVisible.matchLanding = false
  popupStore.matchAgree = true
}
const prevSlide = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
const nextSlide = () => {
  if (currentStep.value < images.length - 1) {
    currentStep.value++
  }
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
.img {
  width: 150px;
  height: 150px;
}
.detailContainer {
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
  span {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.progressComponent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  width: 55px;
}
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $middle_gray;
}
.active-circle {
  background: $dark;
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
  border-radius: 0px 0px 15px 15px;
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
