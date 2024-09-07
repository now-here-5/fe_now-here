<template>
  <main class="body">
    <div class="text_component">
      <div class="text_container">
        <p1>탈퇴 사유</p1>
        <p2>
          회원 탈퇴 시, 등록된 정보가 모두 삭제되며,<br>
          삭제된 정보는 복구할 수 없습니다.
        </p2>
      </div>
    </div>
    <div class="text_Input">
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
        buttonText="작성 완료"
        @click="handleSubmit"
    />
  </footer>
</template>

<script setup>
import {ref, watch} from 'vue';
import { settingStore } from '@/presentation/stores/settingStore.js';
import SelectBtn from "@/presentation/components/SelectBtn.vue";

const store_setting = settingStore();

const contents = ref(''); // 문의 내용 추가
const Active = ref(false);

const handleSubmit = async () => {
  await store_setting.deleteTo();
};

const formContents = () => {
  store_setting.textContent = contents.value;
  console.log(store_setting.textContent);
};
// 휴대폰 번호와 문의 내용의 변화를 감지하여 버튼 활성화 상태를 업데이트
watch([contents], () => {
  Active.value = contents.value.length > 0;
});

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
    font-size: $textXL_size;
    font-weight: $Bold_weight;
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
.componentContainer {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  width: 100%;
  height: 36px;

  border: none;
  border-bottom: 1px solid $gray;
  border-radius: 0px;
  outline: none;

  font-size: $textL_size;
  font-weight: $Bold_weight;

  &::placeholder {
    font-size: $textL_size;
    font-weight: $Bold_weight;
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
    font-size: $textXL_size;
    font-weight: $Bold_weight;
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
    font-size: $textS_size;
    font-weight: $Regular_weight;
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

  font-size: $textM_size;
  font-weight: $Regular_weight;
  color: $dark;

  outline: none;
  &::placeholder {
    font-size: $textMS_size;
    font-weight: $Regular_weight;
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