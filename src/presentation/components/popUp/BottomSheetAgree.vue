<template>
  <div
    v-if="popupStore.bottomSheetVisible.agree"
    class="overlay"
    @click="closeBottomSheet('agree')"
  >
    <div class="bottomSheet" @click.stop>
      <div class="header">
        <span>약관 동의</span>
        <img @click="closeBottomSheet('agree')" src="/images/clear.png" alt="clear"/>
      </div>
      <div class="contentContainer">
        <div class="descContainer">
          <span>회원가입을 위해 약관을 동의해주세요.</span>
        </div>
        <div class="componentContainer">
          <div class="agreeContainer">
            <div
              class="agreeSub"
              :class="{ active: popupStore.agreeState.service }"
              @click="toggleSubAgree('service')"
            >
              <div class="agreeBtnS" />
              <span>[필수] 서비스 약관 동의</span>
              <img
                class="arrowRight"
                src="/images/keyboard_arrowRight.png"
                alt="arrowRight"
                @click="openTermBottomSheet('service')"
              />
            </div>
            <div
              class="agreeSub"
              :class="{ active: popupStore.agreeState.privacy }"
              @click="toggleSubAgree('privacy')"
            >
              <div class="agreeBtnS" />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
              <img
                class="arrowRight"
                src="/images/keyboard_arrowRight.png"
                alt="arrowRight"
                @click="openTermBottomSheet('privacy')"
              />
            </div>
            <div class="agreeAll" :class="{ active: popupStore.agreeState.all }">
              <div class="agreeBtnL" @click="toggleAllAgree" />
              <span>전체 동의</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <SelectBtn
          :isActive="popupStore.agreeState.service && popupStore.agreeState.privacy"
          buttonText="확인"
          @click="navigateToSignUp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectBtn from '@/presentation/components/SelectBtn.vue'
import { useRouter } from 'vue-router'
import { usePopupStore } from '@/presentation/stores/popupStore.js'
import { useSignupPhoneStore } from '@/presentation/stores/signupSub/signupPhoneStore.js'
import { useSignupPWStore } from '@/presentation/stores/signupSub/signupPWStore.js'
import { useSignupProfile } from '@/presentation/stores/signupSub/signupProfileStore.js'

const router = useRouter()
const popupStore = usePopupStore()

const closeBottomSheet = (type) => {
  popupStore.bottomSheetVisible[type] = false
}
const toggleSubAgree = (type) => {
  popupStore.agreeState[type] = !popupStore.agreeState[type]
  popupStore.agreeState.all = popupStore.agreeState.service && popupStore.agreeState.privacy
}
const toggleAllAgree = () => {
  popupStore.agreeState.all = !popupStore.agreeState.all
  popupStore.agreeState.service = popupStore.agreeState.all
  popupStore.agreeState.privacy = popupStore.agreeState.all
}
const openTermBottomSheet = (type) => {
  popupStore.termType = type
  popupStore.bottomSheetVisible.terms = true
}
const navigateToSignUp = () => {
  if (popupStore.agreeState.service && popupStore.agreeState.privacy) {
    closeBottomSheet('agree')
    // 모든 Pinia 스토어를 초기화
    const stores = [useSignupPhoneStore(), useSignupPWStore(), useSignupProfile()];
    stores.forEach(store => store.$reset());
    router.push('/signup/signup-phone')
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
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
}
.bottomSheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: auto;
  background: $white;
  border-radius: 30px 30px 0 0;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 28px 10px 28px;
  width: 375px;
  span {
    font-size: $textXXL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  img {
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
}
.contentContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
}
.descContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 28px;
  width: 375px;
  span {
    font-size: $textM_size;
    font-weight: $textS_weight;
    color: $dark;
  }
}
.componentContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px 28px;
  gap: 10px;
  width: 375px;
}

.agreeContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 315px;
}
.agreeSub {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px 0 0;
  gap: 10px;
  width: 315px;
  height: 35px;
  span {
    font-weight: $textS_weight;
    font-size: $textMS_size;
    color: $gray;
    flex: 1;
  }
}
.agreeSub.active span {
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
.agreeSub.active .agreeBtnS {
  background: $point;
}
.agreeBtnS::after {
  content: '';
  display: block;
  width: 6px;
  height: 11px;
  border: solid $gray;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  position: absolute;
  top: 5px;
  left: 8px;
}
.agreeSub.active .agreeBtnS::after {
  border: solid $white;
  border-width: 0 2px 2px 0;
}
.arrowRight {
  width: 24px;
  height: 24px;
}
.agreeAll {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px 0 0;
  gap: 10px;
  width: 315px;
  border-top: 2px solid $dark;
  span {
    font-size: $textXL_size;
    font-weight: $textB_weight;
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
.agreeAll.active .agreeBtnL {
  background: $point;
}
.agreeAll.active .agreeBtnL::after {
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
  transform: rotate(45deg);
  position: absolute;
  top: 6px;
  left: 10px;
}
.agreeBtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 315px;
  height: 50px;
  background-color: $middle_gray;
  border-radius: 7px;
  cursor: not-allowed;
  span {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.agreeBtn.active {
  background-color: $point;
  cursor: pointer;
}
.agreeBtn.active span {
  color: $white;
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 29px;
  width: 375px;
  height: 70px;
  order: 2;
}
</style>
