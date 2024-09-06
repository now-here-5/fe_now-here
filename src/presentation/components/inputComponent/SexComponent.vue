<template>
  <div class="sexComponent">
    <p>성별</p>
    <div class="btnContainer">
      <div
          class="sexBtn"
          @click="selectSex('male')"
          :class="{ selected: selectedSex === 'male' }"
      >
        <p>남자</p>
      </div>
      <div
          class="sexBtn"
          @click="selectSex('female')"
          :class="{ selected: selectedSex === 'female' }"
      >
        <p>여자</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
});

const selectedSex = ref(props.store.selectedSex || '');

const selectSex = (sex) => {
  selectedSex.value = sex;
  props.store.selectedSex = selectedSex.value;
};
</script>

<style scoped lang="scss">
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

  cursor: pointer;
  p {
    font-size: $textL_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}
.sexBtn.selected {
  background-color: $point; /* 남성이 선택되었을 때 버튼의 배경 색상 */
  p {
    color: $white;
  }
}
</style>