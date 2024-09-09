<template>
  <div class="numberContainer">
    <p>휴대폰 번호</p>
    <div class="input_btn">
      <input
        class="inputBox"
        type="tel"
        placeholder="010-0000-0000"
        v-model="phoneNum"
        @input="formPhoneNumber"
        maxlength="13"
      />
      <div
        :class="['authBtn', { active: store_PhoneAuth.authBtnReady }]"
        @click="store_PhoneAuth.fetchAuthNumber()"
      >
        <p>{{ store_PhoneAuth.authBtnText }}</p>
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
        @input="formAuthNumber"
        maxlength="6"
        :disabled="!store_PhoneAuth.isAuthSend"
        :class="{ 'disabled-input': !store_PhoneAuth.isAuthSend }"
      />
      <div class="time" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { phoneAuthStore } from '@/presentation/stores/signupSub/phoneAuthStore.js'
import { signupStore } from '@/presentation/stores/signupStore.js'
import { authStore } from '@/presentation/stores/authStore.js'

const store_Auth = authStore()
const store_PhoneAuth = phoneAuthStore()
const store_Signup = signupStore()
store_Signup.signupCompleted.auth = false
store_Signup.signupStep = 0

const phoneNum = ref(store_PhoneAuth.phoneNumber || '')
const authNumber = ref('')

const formPhoneNumber = () => {
  let number = phoneNum.value.replace(/[^0-9]/g, '')
  if (number.length > 3 && number.length <= 7) {
    number = number.replace(/(\d{3})(\d+)/, '$1-$2')
  } else if (number.length > 7) {
    number = number.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
  }
  phoneNum.value = number
  store_PhoneAuth.phoneNumber = phoneNum.value

  if (number.length === 13) {
    store_PhoneAuth.authBtnReady = true
  } else {
    store_PhoneAuth.authBtnReady = false
  }
}

const formAuthNumber = () => {
  authNumber.value = authNumber.value.replace(/[^0-9]/g, '').slice(0, 6)
  store_PhoneAuth.authNumber = authNumber.value
  console.log(`store authNumber: ${store_PhoneAuth.authNumber}`)

  if (authNumber.value.length === 6) {
    store_Signup.signupCompleted.auth = true

    console.log(`store step: ${store_Signup.signupStep}`)
  } else {
    store_Signup.signupCompleted.auth = false
  }
}

// 새로고침 시 폰 번호를 하이픈(-) 처리된 상태로 표시
onMounted(() => {
  store_Auth.token = ''
  console.log(`store step: ${store_Auth.token}`)

  if (phoneNum.value) {
    formPhoneNumber()
  }
})
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
    font-size: $textM_B;
    font-weight: $font_Bold;
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

  border: 1px solid #1c1c1c;
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
    font-size: $textS_B;
    font-weight: $font_Bold;
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
