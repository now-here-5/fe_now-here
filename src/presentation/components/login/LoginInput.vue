<template>
  <div class="inputDescContainer">
    <div class="inputDesc">
      <span>
        각 이벤트마다 별도 가입이 필요합니다.<br/>
        해당 이벤트에 처음 참여하신다면 "회원가입"을 눌러주세요.
      </span>
      <div class="inputContainer">
        <input
          class="inputBox"
          type="text"
          placeholder="휴대폰 번호"
          v-model="loginStore.phoneNumber"
          @input="formatPhone"
          maxlength="15"
        />
        <input
          class="inputBox"
          type="tel"
          placeholder="4자리 비밀번호"
          v-model="loginStore.password"
          @input="formatPassword"
          maxlength="4"
        />
      </div>
    </div>
    <div class="alertContainer">
      <span v-if="loginStore.alertMessage" v-html="loginStore.alertMessage" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/presentation/stores/loginStore.js'

const loginStore = useLoginStore()

const formatPhone = () => {
  loginStore.phoneNumber = loginStore.formatPhone(loginStore.phoneNumber)
}
const formatPassword = () => {
  loginStore.password = loginStore.formatPassword(loginStore.password)
}
</script>

<style scoped lang="scss">
.inputDescContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 315px;
}
.inputDesc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  span {
    line-height: 16px;
    font-size: $MBTI_score_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.inputBox {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  width: 315px;
  height: 44px;
  border: 1px solid $dark;
  border-radius: 5px;
  &::placeholder {
    display: flex;
    align-items: center;
    color: $gray;
  }
}
.alertContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  span {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $red;
    cursor: default;
  }
}
</style>