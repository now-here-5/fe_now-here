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
        <Carousel
          class="carouselSpace"
          :itemsToScroll="1"
          :transition="0.8"
          @update:modelValue="onSlideChange"
        >
          <Slide v-for="(image, index) in images" :key="index">
            <div class="slideContent">
              <img :src="image" class="modalImg" alt="modalImg"/>
              <span v-html="texts[index]" class="text"/>
            </div>
          </Slide>
        </Carousel>
        <div class="progressComponent">
          <div
            v-for="(circle, index) in images.length"
            :key="index"
            :class="{ circle: true, 'active-circle': index === currentStep }"
          />
        </div>
      </div>
      <div class="btn">
        <div
          class="btnBg"
          :class="{ active: currentStep === images.length - 1 }"
          @click="currentStep === images.length - 1 ? agreeModal() : null"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePopupStore } from '@/presentation/stores/popupStore.js'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const router = useRouter()
const popupStore = usePopupStore()

const currentStep = ref(0)
const images = [matchLandingMobile, matchLandingCouple, matchLandingNotification]
const texts = [
  '매칭이 성사되면 서로의 카카오톡 ID를<br>동시에 공유해드립니다.',
  '매칭 후의 모든 연락과 만남은<br>사용자의 판단과 책임 하에 이뤄집니다.',
  '서비스 사용 전,<br>주의사항을 꼭 확인해주세요.'
]

const navigateToHome = () => {
  popupStore.modalLVisible.matchLanding = false
  popupStore.matchAgree = false
  router.push('/')
}
const agreeModal = () => {
  popupStore.modalLVisible.matchLanding = false
  popupStore.matchAgree = true
}
const onSlideChange = (index) => {
  currentStep.value = index;
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
.carouselSpace {
  width: 100%;
}
.slideContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  img {
    width: 150px;
    height: 150px;
  }
  .text {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.modalImg {
  width: 150px;
  height: 150px;
}
.progressComponent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 0px 20px;
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
  .span {
    color: $white;
  }
}
</style>