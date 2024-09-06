<template>
  <div class="selfComponent">
    <div class="componentText_mention">
      <p1>자기소개</p1>
      <p2>
        전화번호, SNS 등의 개인정보를 입력한 경우,<br>
        임의로 계정이 삭제되며 재가입이 어려울 수 있습니다.
      </p2>
    </div>
    <div class="inputContainer">
      <textarea
        class="selfInput"
        v-model="store_profile.description"
        maxlength="30"
      />
      <p>{{ store_profile.description.length }}/30</p>
    </div>
  </div>
</template>

<script setup>
import { profileStore } from '@/presentation/stores/profile.js';

const store_profile = profileStore();  // 스토어 사용
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px 25px ;

  height: 100vh;

  background: $white;
}

.header {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: flex-end;
  gap: 10px;

  width: 100%;
  height: 30px;
}
.backspace {
  width: 30px;
  height: 30px;
}
.titleContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 30px 0px 0px;

  height: 24px;

  flex: 1;
}

.body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0px;
  gap: 20px;

  width: 100%;
}
.textContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  align-self: stretch;
}
.locatnion {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 5px 0px;
  gap: 10px;

  border-bottom: 2px solid $point;

  align-self: stretch;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $point;
  }
}
.title_mention {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  p1 {
    font-size: $textXXL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
  p2 {
    font-size: $textMS;
    font-weight: $font_Regular;
    color: $dark;
  }
}
.contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  width: 100%;
  height: calc(100vh - 300px); /* 원하는 높이로 제한 (300px은 헤더와 기타 요소 높이 고려) */
  overflow-y: auto; /* 내용이 넘칠 경우 수직 스크롤을 허용 */
  padding-right: 10px; /* 스크롤바 때문에 내용이 잘리는 것을 방지하기 위한 패딩 */
}

.nameComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
}
.input_btn_text {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textS;
    font-weight: $font_Regular;
    color: $green;
  }
}
.input_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 100%;
}
.nameInput {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 8px 0px;

  flex: 1;
  height: 48px;

  border: none;
  border-bottom: 1px solid $dark;
  border-radius: 0px;

  font-size: $textM_B;
  font-weight: $font_Bold;
  color: $dark;

  outline: none;
  &::placeholder {
    font-size: $textMS;
    font-weight: $font_Regular;
    color: $gray;
  }
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 5px;

  width: 90px;
  height: 45px;

  background: $middle_gray;
  border-radius: 8px;
  p {
    font-size: $textS_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}

.birthComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
}
.componentText_mention {
  display: flex;
  flex-direction: column;
  p1 {
    font-size: $textL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
  p2 {
    font-size: $textMS;
    font-weight: $font_Regular;
    color: $gray;
  }
}
.numberContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 325px;
  height: 55px;


  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
}
.numberInput {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  gap: 10px;

  width: 45px;
  height: 55px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}

.sexComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
}
.btnContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px;

  width: 100%;
}
.sexBtn {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 12px;

  flex: 1;
  height: 44px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  p {
    font-size: $textL_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}

.mbtiComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
}
.btnColumn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  width: 100%;
}
.mbtiBtn {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 12px;

  width: 62px;
  height: 62px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 7px;
  p {
    font-size: $textXXL_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}

.selfComponent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
}
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  width: 100%;
  p {
    font-size: $textS;
    font-weight: $font_Regular;
    color: $gray;
  }
}
.selfInput {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;

  width: 100%;
  height: 110px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  resize: none;  // 사용자가 크기 조절하지 못하게 설정

  font-size: $textM_B;
  color: $dark;

  outline: none;
  &::placeholder {
    font-size: $textMS;
    font-weight: $font_Regular;
    color: $gray;
    text-align: left;  // 가로 정렬을 왼쪽으로 설정
  }
}

.bottom {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  gap: 10px;

  height: 110px;
}

/* 모바일 장치에 적용할 스타일 */
@media only screen and (max-width: 600px) {

  .body {
    height: 520px;
  }
}
/* 데스크톱에 적용할 스타일 */
@media only screen and (min-width: 601px) {

  .body {
    align-self: stretch;
    flex-grow: 1;
  }
}
</style>