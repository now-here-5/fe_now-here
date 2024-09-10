<template>
  <div class="selfComponent">
    <div class="titleDesc">
      <span class="title">자기소개</span>
      <span class="desc">
        전화번호, SNS 등의 개인정보를 입력한 경우,<br />
        임의로 계정이 삭제되며 재가입이 어려울 수 있습니다.
      </span>
    </div>
    <div class="inputContainer">
      <textarea
        class="selfInput"
        placeholder="자기소개를 입력해주세요."
        v-model="selfIntro"
        maxlength="30"
      />
      <span>{{ selfIntroduction.length }}/30</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})

const selfIntro = ref(props.store.selfIntro || '')

watch(selfIntro, (newValue) => {
  props.store.selfIntro = newValue
})
</script>

<style scoped lang="scss">
.selfComponent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0 0;
  gap: 10px;
  width: 100%;
}
.titleDesc {
  display: flex;
  flex-direction: column;
  .title {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  .desc {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
}
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  span {
    font-size: $textS_size;
    font-weight: $textS_weight;
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
  resize: none;
  font-size: $textML_size;
  &::placeholder {
    font-size: $textML_size;
    font-weight: $textS_weight;
    color: $gray;
    text-align: left;
  }
}
</style>
