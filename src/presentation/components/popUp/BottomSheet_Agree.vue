<template>
  <div
    v-if="store_Popup.bottomSheetVisible.agree"
    class="overlay"
    @click="closeBottomSheet('agree')"
  >
    <div class="bottomSheet" @click.stop>
      <div class="bottomSheet_header">
        <p>약관 동의</p>
        <img
          @click="closeBottomSheet('agree')"
          src="/images/clear.png"
        />
      </div>
      <div class="bottomSheet_contentContainer">
        <div class="bottomSheet_detailContainer">
          <p>회원가입을 위해 약관을 동의해주세요.</p>
        </div>
        <div class="bottomSheet_componentCotainer">
          <div class="subAgreeContainer">
            <div
              class="subAgree"
              :class="{ active: store_Popup.agreeState.service }"
              @click="toggleSubAgree('service')"
            >
              <div class="agreeBtnS"/>
              <p>[필수] 서비스 약관 동의</p>
              <img
                class="arrowRight"
                src="/images/keyboard_arrowRight.png"
                @click="openTermBottomSheet('service')"
              />
            </div>
            <div
              class="subAgree"
              :class="{ active: store_Popup.agreeState.privacy }"
              @click="toggleSubAgree('privacy')"
            >
              <div class="agreeBtnS"/>
              <p>[필수] 개인정보 수집 및 이용 동의</p>
              <img
                class="arrowRight"
                src="/images/keyboard_arrowRight.png"
                @click="openTermBottomSheet('privacy')"
              />
            </div>
            <div class="allAgree" :class="{ active: store_Popup.agreeState.all }">
              <div class="agreeBtnL" @click="toggleAllAgree"/>
              <p>전체 동의</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomSheet_bottom">
        <SelectBtn
          :isActive="store_Popup.agreeState.service && store_Popup.agreeState.privacy"
          buttonText="확인"
          @click="navigateToSignUp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectBtn from '@/presentation/components/SelectBtn.vue'

import { useRouter } from 'vue-router';

import { popupStore } from '@/presentation/stores/popupStore.js'

const router = useRouter();

const store_Popup = popupStore();

const closeBottomSheet = (type) => {
  store_Popup.bottomSheetVisible[type] = false;
};

const toggleSubAgree = (type) => {
  store_Popup.agreeState[type] = !store_Popup.agreeState[type];

  // Update allAgree based on sub agrees
  store_Popup.agreeState.all = store_Popup.agreeState.service && store_Popup.agreeState.privacy;
};
const toggleAllAgree = () => {
  store_Popup.agreeState.all = !store_Popup.agreeState.all;

  store_Popup.agreeState.service = store_Popup.agreeState.all;
  store_Popup.agreeState.privacy = store_Popup.agreeState.all;
};
const openTermBottomSheet = (type) => {
  store_Popup.termType = type;
  store_Popup.bottomSheetVisible.terms = true;
};

const navigateToSignUp = () => {
  if (store_Popup.agreeState.service && store_Popup.agreeState.privacy) {
    closeBottomSheet('agree');
    router.push('/signup/signup_mobileAuth');
  }
};
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
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
}

.bottomSheet {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 375px;
  height: auto;

  background: $white;
  border-radius: 30px 30px 0px 0px;
}
.bottomSheet_header {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 28px 10px 28px;

  width: 375px;

  p {
    font-size: $textXXL_size;
    font-weight: $Bold_weight;
    color: $dark;
  }
  img {
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
}
.bottomSheet_contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;


  width: 375px;
}
.bottomSheet_detailContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 28px;

  width: 375px;

  p {
    font-size: $textM_size;
    font-weight: $Regular_weight;
    color: $dark;
  }
  p2 {
    font-size: $textXS_size;
    font-weight: $Regular_weight;
    color: $dark;
  }
}
.bottomSheet_componentCotainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px 28px;
  gap: 10px;

  width: 375px;
}

.subAgreeContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  width: 315px;
}
.subAgree {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 10px 0px 0px;
  gap: 10px;

  width: 315px;
  height: 35px;

  p {
    font-weight: $Regular_weight;
    font-size: $textMS_size;
    color: $gray;
    flex: 1;
  }
}
.subAgree.active p {
  color: $dark;
}
.agreeBtnS {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  position: relative;
  display: flex;
  background: $middle_gray;
}
.subAgree.active .agreeBtnS {
  background: $point; // 전체 동의 선택 시 색상
}
.agreeBtnS::after {
  content: '';
  display: block;
  width: 6px;
  height: 11px;
  border: solid $gray;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg); /* 체크마크를 45도 회전시켜 체크모양으로 만듭니다 */
  position: absolute; /* 위치를 절대값으로 지정하여 자유롭게 위치 조정이 가능하게 함 */
  top: 4.5px; /* 위쪽 여백 조정 */
  left: 8px; /* 왼쪽 여백 조정 */
}
.subAgree.active .agreeBtnS::after {
  border: solid $white;
  border-width: 0 2px 2px 0;
}
.arrowRight {
  width: 24px;
  height: 24px;
}
.allAgree {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px 0px 0px;
  gap: 10px;

  width: 315px;

  border-top: 2px solid #1C1C1C;
  p {
    font-size: $textXL_size;
    font-weight: $Bold_weight;
    color: $dark;
    flex: 1;
  }
}
.agreeBtnL {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  display: flex;
  background: $middle_gray;
}
.allAgree.active .agreeBtnL {
  background: $point; // 전체 동의 선택 시 색상
}
.allAgree.active .agreeBtnL::after {
  border: solid $white;
  border-width: 0 3px 3px 0;
}
.agreeBtnL::after {
  content: '';
  display: block;
  width: 8px;
  height: 14px;
  border: solid $gray;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg); /* 체크마크를 45도 회전시켜 체크모양으로 만듭니다 */
  position: absolute; /* 위치를 절대값으로 지정하여 자유롭게 위치 조정이 가능하게 함 */
  top: 6px; /* 위쪽 여백 조정 */
  left: 10px; /* 왼쪽 여백 조정 */
}
.agreeBtn {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 315px;
  height: 50px;
  background-color: $middle_gray;
  border-radius: 7px;
  cursor: not-allowed;
  p {
    font-size: $textM_size;
    font-weight: $Bold_weight;
    color: $gray;
  }
}
.agreeBtn.active {
  background-color: $point; // 모두 동의 시 활성화되는 버튼 색상
  cursor: pointer;
}
.agreeBtn.active p {
  color: $white;
}

.bottomSheet_bottom {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 29px;

  width: 375px;
  height: 70px;

  order: 2;
}
</style>
