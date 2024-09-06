<template>
  <div class="input_textContainer">
    <div class="input_mention">
      <p>각 이벤트마다 별도 가입이 필요합니다.<br>해당 이벤트에 처음 참여하신다면 "회원가입"을 눌러주세요.</p>
      <div class="inputContainer">
        <input
            class="inputBox"
            type="tel"
            placeholder="휴대폰 번호"
            v-model="store_Login.phone"
            @input="formPhoneNumber"
            maxlength="13"
        />
        <input
            class="inputBox"
            type="tel"
            placeholder="비밀번호"
            v-model="store_Login.password"
            @input="formPassword"
            maxlength="4"
        />
      </div>
    </div>
    <div class="alertContainer">
      <span v-if="store_Login.alertMessage" v-html="store_Login.alertMessage"></span>
    </div>
  </div>
</template>

<script setup>
import { loginStore } from '@/presentation/stores/loginStore.js';

const store_Login = loginStore();

const formPhoneNumber = () => {
  let number = store_Login.phone.replace(/[^0-9]/g, '');
  if (number.length > 3 && number.length <= 7) {
    number = number.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (number.length > 7) {
    number = number.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  }
  store_Login.phone = number;
};

const formPassword = () => {
  store_Login.password = store_Login.password.replace(/[^0-9]/g, '').slice(0, 4);
};
</script>

<style scoped lang="scss">
.input_textContainer{
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  width: 315px;
}
.input_mention {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;

  p {
    line-height: 16px;

    font-size: $MBTI_S;
    font-weight: $font_Bold;
    color: $dark;
    cursor: default;
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

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px;
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
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 10px;
  gap: 10px;

  span {
    font-size: $textS;
    font-weight: $font_Regular;
    color: $red;
    cursor: default;
  }
}
</style>
