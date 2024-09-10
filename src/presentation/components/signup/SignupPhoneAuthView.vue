<template>
  <div class="numberContainer">
    <p>휴대폰 번호</p>
    <div class="input_btn">
      <input
        class="inputBox"
        type="tel"
        placeholder="010-0000-0000"
        v-model="phoneNum"
        @input="handlePhoneNumberInput"
        maxlength="13"
      />
      <div
        :class="['authBtn', { active: phoneAuthSignupStore.authBtnReady }]"
        @click="phoneAuthSignupStore.fetchAuthNumber()"
      >
        <p>{{ phoneAuthSignupStore.authBtnText }}</p>
      </div>
    </div>
  </div>
  <div class="numberContainer">
    <p>인증 번호</p>
    <div class="input_btn">
      <input
        class="inputBox"
        type="tel"
        placeholder="000000"
        v-model="authNumber"
        @input="handleAuthNumberInput"
        maxlength="6"
        :disabled="!phoneAuthSignupStore.isAuthSend"
        :class="{ 'disabled-input': !phoneAuthSignupStore.isAuthSend }"
      />
      <div class="time"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formPhoneNumber } from '@/Composition/FormNumber.js'
import { usePhoneAuthSignupStore } from '@/presentation/stores/signupSub/phoneAuthSignupStore.js'
import { useSignupStore } from '@/presentation/stores/signupStore.js'

const phoneAuthSignupStore = usePhoneAuthSignupStore()
const signupStore = useSignupStore()
signupStore.signupCompleted.auth = false
signupStore.signupStep = 0

const phoneNum = ref(phoneAuthSignupStore.phoneNumber || '')
const authNumber = ref('')

// 새로고침 시 폰 번호를 하이픈(-) 처리된 상태로 표시
onMounted(() => {
  if (phoneNum.value) {
    handlePhoneNumberInput()
  }
})

// 전화번호 입력 처리 함수
const handlePhoneNumberInput = () => {
  phoneNum.value = formPhoneNumber(phoneNum.value) // 포맷 적용
  phoneAuthSignupStore.phoneNumber = phoneNum.value

  // 전화번호 13자리 여부에 따라 인증 버튼 활성화
  phoneAuthSignupStore.authBtnReady = phoneNum.value.length === 13
}

// 인증 번호 입력 처리 함수
const handleAuthNumberInput = () => {
  authNumber.value = authNumber.value.replace(/[^0-9]/g, '').slice(0, 6)
  phoneAuthSignupStore.authNumber = authNumber.value

  // 인증 번호가 6자리가 되면 인증 완료로 상태 변경
  signupStore.signupCompleted.auth = authNumber.value.length === 6
}
</script>

<style scoped lang="scss">
.numberContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;

  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.input_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
}
.inputBox {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 10px;

  flex: 1;
  height: 44px;

  border: 1px solid $dark;
  border-radius: 5px;
}
.disabled-input {
  background-color: $light_gray;
  border: 1px solid $gray;
  cursor: not-allowed;
}
.authBtn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 5px;
  gap: 10px;

  width: 90px;

  background: $middle_gray;
  border-radius: 8px;

  cursor: not-allowed;

  p {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $gray;
  }
  &.active {
    background: $point; /* 활성화 시 버튼 색상 변경 */
    cursor: pointer; /* 커서 모양 변경 */
    p {
      color: $white; /* 텍스트 색상 변경 */
    }
  }
}
.time {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 5px;
  gap: 10px;

  width: 90px;
  height: 43px;
  border-radius: 8px;
}
</style>
