<template>
  <div class="numberContainer">
    <p>휴대폰 번호</p>
    <div class="inputBtn">
      <input
        class="inputBox"
        type="tel"
        placeholder="010-0000-0000"
        v-model="phoneNum"
        @input="handlePhoneNumberInput"
        maxlength="13"
      />
      <div
        :class="['authBtn', { active: signupPhoneStore.authBtnReady }]"
        @click="signupPhoneStore.fetchAuthNumber()"
      >
        <p>{{ signupPhoneStore.authBtnText }}</p>
      </div>
    </div>
  </div>
  <div class="numberContainer">
    <p>인증 번호</p>
    <div class="inputBtn">
      <input
        class="inputBox"
        type="tel"
        placeholder="000000"
        v-model="authNumber"
        @input="handleAuthNumberInput"
        maxlength="6"
        :disabled="!signupPhoneStore.isAuthSend"
        :class="{ 'disabled-input': !signupPhoneStore.isAuthSend }"
      />
      <div class="time"></div>
    </div>
  </div>
  <div class="alertBox">
    <span class="title">인증 번호를 못 받으셨나요?</span>
    <span class="indent">
      • 인증번호를 수신하지 못한 경우, 재전송 버튼을 눌러주세요.
    </span>

    <span class="indent">
      • 재전송은 2회까지 가능하며, 해결되지 않을 경우<br>
      <a href="/interaction/inquiry" class="contact-link">문의하기 게시판</a>을 이용해주세요.
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formPhoneNumber } from '@/composition/FormNumber.js'
import { useSignupPhoneStore } from '@/presentation/stores/signupSub/signupPhoneStore.js'
import { useSignupStore } from '@/presentation/stores/signupStore.js'

const signupPhoneStore = useSignupPhoneStore()
const signupStore = useSignupStore()
signupStore.signupCompleted.auth = false
signupStore.signupStep = 0

const phoneNum = ref(signupPhoneStore.phoneNumber || '')
const authNumber = ref('')

onMounted(() => {
  if (phoneNum.value) {
    handlePhoneNumberInput()
  }
})

const handlePhoneNumberInput = () => {
  phoneNum.value = formPhoneNumber(phoneNum.value) // 포맷 적용
  signupPhoneStore.phoneNumber = phoneNum.value
  signupPhoneStore.authBtnReady = phoneNum.value.length === 13
}
const handleAuthNumberInput = () => {
  authNumber.value = authNumber.value.replace(/[^0-9]/g, '').slice(0, 6)
  signupPhoneStore.authNumber = authNumber.value
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
.inputBtn {
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

.alertBox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  margin-top: 0px;

  width: 100%;
  background-color: $light_gray;
  border-radius: 10px;
  .title {
    font-size: $textMS_size;
    font-weight: $textB_weight;
    color: #767676;
    margin-bottom: 5px; /* 추가된 간격 */
  }
  .indent {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: #767676;
    padding-left: 5px;
    margin-bottom: 3px; /* 추가된 간격 */
  }
  .contact-link {
    color: $dark;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
