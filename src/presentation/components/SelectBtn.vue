<template>
  <div class="selectBtn" :class="{ disabled: !isActive }" @click="handleClick">
    <p>{{ buttonText }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isActive: Boolean,
  buttonText: String,
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (props.isActive) {
    emit('click');
  }
};
</script>

<style scoped lang="scss">
.selectBtn {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 315px;
  height: 50px;
  background-color: $point;
  border-radius: 7px;
  cursor: pointer;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $white;
  }
}
.selectBtn.disabled {
  /* 비활성화 상태 스타일 */
  background-color: $middle_gray;
  cursor: not-allowed;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}
</style>