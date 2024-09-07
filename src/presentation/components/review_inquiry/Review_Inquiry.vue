<template>
  <div class="frame">
    <BackspaceHeader
      :title="type === 'review' ? '의견 남기기' : '문의하기'"
    />
    <main class="body">
      <div class="text_component">
        <div class="text_container">
          <p1 v-if="type === 'review'">별점 등록</p1>
          <p1 v-else>휴대폰 번호</p1>

          <p2 v-if="type === 'review'">
            Now Here를 이용해 주셔서 감사합니다.<br>
            서비스 개선을 위해 소중한 의견을 남겨주세요.
          </p2>
          <p2 v-else>답변받을 휴대폰 번호를 입력해주세요.</p2>
        </div>
        <div v-if="type === 'review'" class="componentContainer_Review">
          <img
            v-for="n in 5"
            :key="n"
            :src="n <= rate ? starFilled : starUnfilled"
            alt="star"
            class="star"
            @click="setRating(n)"
          />
        </div>
        <input
          v-if="type === 'inquiry'"
          class="componentContainer_Inquiry"
          type="tel"
          placeholder="010-0000-0000"
          v-model="phoneNumber"
          @input="handlePhoneNumberInput"
          maxlength="13"
        />
      </div>
      <div class="text_Input">
        <p v-if="type === 'review'">의견 작성</p>
        <p v-else>문의 내용</p>
        <div class="input_conunt">
          <textarea
            class="input"
            :placeholder="type === 'review' ? '내용을 작성해주세요.' : '문의 내용을 작성해주세요.'"
            v-model="contents"
            @input="formContents"
          />
          <p>{{ contents.length }}/30</p>
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
import BackspaceHeader from '@/presentation/components/BackspaceHeader.vue'
import starFilled from '/images/star_filled.png';
import starUnfilled from '/images/star.png';
import SelectBtn from "@/presentation/components/SelectBtn.vue";

import { ref, watch, onMounted } from "vue";
import { useRouter } from 'vue-router';

import { review_inquiryStore } from "@/presentation/stores/review_inquiryStore.js";
import { popupStore } from '@/presentation/stores/popupStore.js'
import { formPhoneNumber } from '@/core/usecases/FormNumber.js'

// 여기서 props로 type을 받아옴
const props = defineProps({
  type: {
    type: String,
    required: true
  }
});
const store_Review_inquiry = review_inquiryStore();
const store_Popup = popupStore();

const phoneNumber = ref(store_Review_inquiry.inquiry_Num);
const contents = ref(store_Review_inquiry.textContent || "");
const rate = ref(0);
const Active = ref(false);
const router = useRouter(); // useRouter 사용

const setRating = (rating) => {
  rate.value = rating;
  console.log('별점:', rate.value);
  store_Review_inquiry.rate = rate.value;
};

const handlePhoneNumberInput = () => {
  phoneNumber.value = formPhoneNumber(phoneNumber.value); // 포맷 적용
  store_Review_inquiry.inquiry_Num = phoneNumber.value;
};

const formContents = () => {
  store_Review_inquiry.textContent = contents.value;
  console.log(store_Review_inquiry.textContent);
};

// 제출 버튼 클릭 시 핸들링
const handleSubmit = async () => {
  const isSuccess = await store_Review_inquiry.submitFeedback(props.type); // props.type을 사용

  if (isSuccess) {
    console.log(props.type === 'review' ? '리뷰 성공!' : '문의 성공!');
    router.back(); // 3초 후에 뒤로 가기
    setTimeout(() => {
      store_Popup.tostMessage.visible = false;
    }, 3000);
  }
};

// 문의 내용과 별점 또는 휴대폰 번호의 변화를 감지하여 버튼 활성화 상태를 업데이트
watch([phoneNumber, contents, rate], () => {
  if (props.type === 'review') {
    Active.value = contents.value.length > 0 && rate.value > 0;
  } else {
    Active.value = phoneNumber.value.length === 13 && contents.value.length > 0;
  }
});
onMounted(() => {
  store_Review_inquiry.textContent = "";
  store_Review_inquiry.rate = 0
  store_Review_inquiry.inquiry_Num = "";
});
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

.body {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0px;
  gap: 30px;

  width: 100%;
}
.text_component {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
}
.text_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  width: 100%;
  p1 {
    font-size: $textXL_size;
    font-weight: $Bold_weight;
    color: $dark;
  }
  p2 {
    font-size: $textS_size;
    font-weight: $Regular_weight;
    color: $dark;
  }
}
.componentContainer_Review {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
}
.componentContainer_Inquiry {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  width: 100%;
  height: 36px;

  border: none;
  border-bottom: 1px solid #A4A4A4;
  border-radius: 0;
  outline: none;

  font-size: $textL_size;
  font-weight: $Bold_weight;

  &::placeholder {
    font-size: $textL_size;
    font-weight: $Bold_weight;
    color: $gray;
  }
}
.star {
  width: 55px;
  height: 55px;
}
.text_Input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  width: 100%;
  p {
    font-size: $textXL_size;
    font-weight: $Bold_weight;
    color: $dark;
  }
}
.input_conunt {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  width: 100%;
  p {
    font-size: $textS_size;
    font-weight: $Regular_weight;
    color: $gray;
  }
}
.input {
  box-sizing: border-box;

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
  outline: none;
  resize: none;

  font-size: $textM_size;
  font-weight: $Regular_weight;
  color: $dark;
  &::placeholder {
    font-size: $textMS_size;
    font-weight: $Regular_weight;
    color: $gray;
    text-align: left;  // 가로 정렬을 왼쪽으로 설정
  }
}
.input::placeholder {
  font-size: $textMS_size;
  font-weight: $Regular_weight;
  color: $gray;
}

.bottom {
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
