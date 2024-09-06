<template>
  <div class="frame">
    <header class="header">
      <img class="backspace" src="@/assets/images/backspace.png" alt="backspace" @click="navigateToBack"/>
      <div class="titleContainer">
        <p>의견 남기기</p>
      </div>
    </header>
    <main class="body">
      <div class="text_component">
        <div class="text_container">
          <p1>별점 등록</p1>
          <p2>
            Now Here를 이용해 주셔서 감사합니다.<br>
            서비스 개선을 위해 소중한 의견을 남겨주세요.
          </p2>
        </div>
        <div class="componentContainer">
          <!-- Update :src to correctly use filled and unfilled images -->
          <img
            v-for="n in 5"
            :key="n"
            :src="n <= rate ? starFilled : starUnfilled"
            alt="star"
            class="star"
            @click="setRating(n)"
          />
        </div>
      </div>
      <div class="text_Input">
        <p>의견 작성</p>
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
import SelectBtn from "@/presentation/components/SelectBtn.vue"; // useRouter를 추가로 import

// 이미지 경로 불러오기
import starFilled from '@/assets/images/star_filled.png';
import starUnfilled from '@/assets/images/star.png';

const router = useRouter(); // useRouter 사용

const store_Contact_inquiry = contact_inquiryStore();
const contents = ref(''); // 문의 내용 추가
const Active = ref(false);
const rate = ref(0); // 별점 값 저장

// 별점 클릭 시 field 값 설정
const setRating = (rating) => {
  rate.value = rating;
  console.log('별점:', rate.value);
  store_Contact_inquiry.rate = rate.value;
};

const handleSubmit = async () => {
  const isSuccess = await store_Contact_inquiry.fetchReview();
  console.log(store_Contact_inquiry.tostM_review);

  if (isSuccess) {
    console.log('리뷰 성공!');
    router.back(); // 3초 후에 뒤로 가기
    // 3초(3000ms) 후에 tostM_review.value를 false로 설정
    setTimeout(() => {
      store_Contact_inquiry.tostM_review = false;
    }, 3000);
  }
};

const formContents = () => {
  store_Contact_inquiry.textContent = contents.value;
  console.log(store_Contact_inquiry.textContent);
};

// 문의 내용의 변화를 감지하여 버튼 활성화 상태를 업데이트
watch([contents], () => {
  Active.value = contents.value.length > 0 && rate.value > 0; // 별점과 내용이 모두 입력된 경우 활성화
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
}
.star {
  width: 55px;
  height: 55px;
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


