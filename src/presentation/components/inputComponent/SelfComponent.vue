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
          placeholder="자기소개를 입력해주세요."
          v-model="selfIntroduction"
          maxlength="30"
      />
      <p>{{ selfIntroduction.length }}/30</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
});

const selfIntroduction = ref(props.store.selfIntro || '');

watch(selfIntroduction, (newValue) => {
  props.store.selfIntro = newValue;
});
</script>

<style scoped lang="scss">
.selfComponent {
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
    font-size: $textL_size;
    font-weight: $Bold_weight;
    color: $dark;
  }
  p2 {
    font-size: $textMS_size;
    font-weight: $Regular_weight;
    color: $gray;
  }
}
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  width: 100%;
  p {
    font-size: $textS_size;
    font-weight: $Regular_weight;
    color: $gray;
    align-self: flex-end;
  }
}
.selfInput {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;

  width: 98%;
  height: 110px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  resize: none;  // 사용자가 크기 조절하지 못하게 설정


  font-size: $textML_size;
  &::placeholder {
    font-size: $textML_size;
    font-weight: $Regular_weight;
    color: $gray;
    text-align: left;  // 가로 정렬을 왼쪽으로 설정
  }
}
</style>