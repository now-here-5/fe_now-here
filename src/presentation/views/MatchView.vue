<template>
  <h1>매칭</h1>
  <nav>
    <router-link to="/match" class="tab">매칭</router-link>
    <router-link to="/match/sent-hearts" class="tab">보낸 하트</router-link>
    <router-link to="/match/received-hearts" class="tab">받은 하트</router-link>
    <router-link to="/match/status" class="tab">매칭 현황</router-link>
  </nav>

  <!-- 하위 라우터에서 설정된 컴포넌트들이 여기에 렌더링됨 -->
  <router-view></router-view>

  <div v-if="modalL_matchLanding" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>잠깐! 꼭 확인해주세요.</p>
          </div>
          <img
            class="modalL_clearContainer"
            src="@/assets/images/clear.png"
            @click="navigateToHome"
          >
        </div>
        <div class="slider">
          <div class="slider">
            <div class="slides" :style="{ transform: `translateX(-${currentStep * 100}%)` }">
              <div v-for="(image, index) in images" :key="index" class="slide">
                <div class="modalL_imgContainer">
                  <img :src="image" class="modalL_img" />
                </div>
              </div>
            </div>
            <div class="slide-left-area" @click="prevSlide"></div>
            <div class="slide-right-area" @click="nextSlide"></div>
          </div>
        </div>
        <div class="modalL_detailContainer">
          <p v-html="currentText"/>
          <div class="modalL_progressComponent">
            <div
                v-for="(circle, index) in 3"
                :key="index"
                :class="{'modalL_circle': true, 'active-circle': index === currentStep}"
            />
          </div>
        </div>
      </div>
      <div class="modalL_btn">
        <div
            class="modalL_btnBg"
            :class="{ active: currentStep === 2 }"
            @click="currentStep === 2 ? agreeAlertModalL_matchLanding() : null"
        >
          <p>동의하고 계속하기</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalL_review" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>
              1분만!<br>시간 내주실 수 있나요?
            </p>
          </div>
          <div class="modalL_clearContainer">
          </div>
        </div>
        <div class="modalL_imgContainer">
          <img src="@/assets/images/Modal_Image/modal_Mailbox.png" class="modalL_img" />
        </div>
        <div class="modalL_detailContainer">
          <p>
            이용해 주셔서 감사합니다.<br>
            서비스 개선을 위해<br>
            소중한 의견을 남겨주세요.
          </p>
        </div>
      </div>
      <div class="modalL_btn">
        <div class="modalL_btnBg" @click="closeAlertModalL_review">
          <p>싫어요</p>
        </div>
        <div class="modalL_btnBg active" @click="navigateToReview">
          <p>좋아요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import matchLandingMobile from "@/assets/images/Modal_Image/modal_mobile.png";
import matchLandingCouple from "@/assets/images/Modal_Image/modal_Couple.png";
import matchLandingNotification from "@/assets/images/Modal_Image/modal_Notification.png";

import { matchStore } from "@/presentation/stores/matchStore";
import router from "@/presentation/router/index.js";

const route = useRoute();

const store_match = matchStore();

const modalL_matchLanding = ref(false);
const currentStep = ref(0); // 현재 슬라이드 위치 (0부터 시작)
const images = [matchLandingMobile, matchLandingCouple, matchLandingNotification];
const texts = [
  '매칭이 성사되면 서로의 전화번호를<br>동시에 공유해드립니다.',
  '매칭 후의 모든 연락과 만남은<br>사용자의 판단과 책임 하에 이뤄집니다.',
  '서비스 사용 전,<br>주의사항을 꼭 확인해주세요.'
];
// 현재 이미지와 텍스트를 상태에 따라 가져옴
const currentText = computed(() => texts[currentStep.value]);

const modalL_review = ref(store_match.modalL_review);

const openAlertModalL_matchLanding = () => {
  modalL_matchLanding.value = true;
};
const navigateToHome = () => {
  modalL_matchLanding.value = false;
  store_match.matchAgree = false;
  router.push('/');
};
const agreeAlertModalL_matchLanding = () => {
  modalL_matchLanding.value = false;
  store_match.matchAgree = true;
};
const prevSlide = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
const nextSlide = () => {
  if (currentStep.value < images.length - 1) {
    currentStep.value++;
  }
};

onMounted(() => {
  handleRouteChange(route); // 첫 마운트 시에 라우트 확인
});

// 라우트가 변경될 때마다 실행
watch(route, (to) => {
  handleRouteChange(to);
});

const handleRouteChange = (to) => {
  if (to.path === '/match') {
    // '/match' 라우트일 때
    if (store_match.matchAgree === false) {
      openAlertModalL_matchLanding();
    } else {
      store_match.getFeedbackModalTF();
    }
  } else if (to.path === '/match/status') {
    // '/match/status' 라우트일 때
    store_match.getFeedbackModalTF();
  }
};

const closeAlertModalL_review = () => {
  modalL_review.value = false;
};
const navigateToReview = () => {
  router.push('/review');
};
</script>

<style scoped lang="scss">
/* 임시 css */
.tab {
  margin-right: 20px;
  text-decoration: none;
  color: black;
}
.tab.router-link-exact-active {
  font-weight: bold;
  color: blue;
}

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
  z-index: 1;
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
    font-size: $textM_B;
    font-weight: $font_Bold;
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
    font-size: $textS_B;
    font-weight: $font_Bold;
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
    font-size: $textM_B;
    font-weight: $font_Bold;
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

.slide-left-area, .slide-right-area {
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
