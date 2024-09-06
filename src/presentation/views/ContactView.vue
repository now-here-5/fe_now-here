<template>
  <div class="frame">
    <header class="header">
      <img class="backspace" src="@/assets/images/backspace.png" alt="backspace" @click="navigateToBack"/>
      <div class="titleContainer">
        <p>문의하기</p>
      </div>
    </header>
    <main class="body">
      <div class="text_component">
        <div class="text_container">
          <p1>휴대폰 번호</p1>
          <p2>답변받을 휴대폰 번호를 입력해주세요.</p2>
        </div>
        <input
          class="componentContainer"
          type="tel"
          placeholder="010-0000-0000"
          v-model="phoneNumber"
          @input="formPhoneNumber"
          maxlength="13"
        />
      </div>
      <div class="text_Input">
        <p>문의 내용</p>
        <div class="input_conunt">
          <textarea
            class="input"
            placeholder="내용을 작성해주세요."
            v-model="contents"
            @input="formContents"
          />
          <p>10/30</p>
        </div>
      </div>
    </main>
    <footer class="bottom">
      <SelectBtn
        :isActive="Active"
        buttonText="작성완료"
        @click="handleSubmit"
      />
    </footer>
  </div>


</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watch } from "vue";
import { contact_inquiryStore } from "@/presentation/stores/contact_inquiryStore.js";
import SelectBtn from "@/presentation/components/SelectBtn.vue";

const router = useRouter(); // useRouter 사용

const store_Contact_inquiry = contact_inquiryStore();
const phoneNumber = ref(store_Contact_inquiry.number);
const contents = ref(''); // 문의 내용 추가
const Active = ref(false);

const handleSubmit = async () => {
  const isSuccess = await store_Contact_inquiry.fetchInquiry(); // 성공 여부 반환 받음
  console.log(store_Contact_inquiry.tostM_inquiry);

  if (isSuccess) {
    console.log('문의 성공!');
    router.back(); // 3초 후에 뒤로 가기
    // 3초(3000ms) 후에 tostM_review.value를 false로 설정
    setTimeout(() => {
      store_Contact_inquiry.tostM_inquiry = false;
    }, 3000);
  }
};


const formPhoneNumber = () => {
  let number = phoneNumber.value.replace(/[^0-9]/g, '');
  if (number.length > 3 && number.length <= 7) {
    number = number.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (number.length > 7) {
    number = number.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  }
  phoneNumber.value = number; // 로컬 상태 업데이트
  store_Contact_inquiry.number = phoneNumber.value;

  console.log(phoneNumber.value);
  console.log(store_Contact_inquiry.number);
};

// 문의 내용 처리 함수
const formContents = () => {
  store_Contact_inquiry.textContent = contents.value;
  console.log(store_Contact_inquiry.textContent);
};
// 휴대폰 번호와 문의 내용의 변화를 감지하여 버튼 활성화 상태를 업데이트
watch([phoneNumber, contents], () => {
  Active.value = phoneNumber.value.length === 13 && contents.value.length > 0;
});

const navigateToBack = () => {
  router.back();
};
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px 25px ;

  height: 100vh;
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
  p {
    font-size: $textXL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
}

.body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0px;
  gap: 30px;

  width: 100%;
}
.text_component {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
}
.text_container {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  width: 100%;
  p1 {
    font-size: $textXL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
  p2 {
    font-size: $textS;
    font-weight: $font_Regular;
    color: $dark;
  }
}
.componentContainer {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  width: 100%;
  height: 36px;

  border: none;
  border-bottom: 1px solid #A4A4A4;
  border-radius: 0px;
  outline: none;

  font-size: $textL_B;
  font-weight: $font_Bold;

  &::placeholder {
    font-size: $textL_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}
.text_Input {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  width: 100%;
  p {
    font-size: $textXL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
}
.input_conunt {
  /* Auto layout */
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
.input {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 12px;
  gap: 10px;

  width: 100%;
  height: 180px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  resize: none;  // 사용자가 크기 조절하지 못하게 설정

  font-size: $textM;
  font-weight: $font_Regular;
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