<template>
  <div class="mbtiComponent">
    <p>MBTI</p>
    <div class="btnContainer">
      <div class="btnColumn">
        <div
          class="mbtiBtn"
          @click="selectMBTI('E', 0)"
          :class="{ selected: selectedMBTI[0] === 'E' }"
        >
          <p>E</p>
        </div>
        <div
          class="mbtiBtn"
          @click="selectMBTI('I', 0)"
          :class="{ selected: selectedMBTI[0] === 'I' }"
        >
          <p>I</p>
        </div>
      </div>
      <div class="btnColumn">
        <div
          class="mbtiBtn"
          @click="selectMBTI('N', 1)"
          :class="{ selected: selectedMBTI[1] === 'N' }"
        >
          <p>N</p>
        </div>
        <div
          class="mbtiBtn"
          @click="selectMBTI('S', 1)"
          :class="{ selected: selectedMBTI[1] === 'S' }"
        >
          <p>S</p>
        </div>
      </div>
      <div class="btnColumn">
        <div
          class="mbtiBtn"
          @click="selectMBTI('F', 2)"
          :class="{ selected: selectedMBTI[2] === 'F' }"
        >
          <p>F</p>
        </div>
        <div
          class="mbtiBtn"
          @click="selectMBTI('T', 2)"
          :class="{ selected: selectedMBTI[2] === 'T' }"
        >
          <p>T</p>
        </div>
      </div>
      <div class="btnColumn">
        <div
          class="mbtiBtn"
          @click="selectMBTI('P', 3)"
          :class="{ selected: selectedMBTI[3] === 'P' }"
        >
          <p>P</p>
        </div>
        <div
          class="mbtiBtn"
          @click="selectMBTI('J', 3)"
          :class="{ selected: selectedMBTI[3] === 'J' }"
        >
          <p>J</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router' // useRouter를 추가로 import

import { ref } from 'vue'
import { useProfileStore } from '@/presentation/stores/profileStore'

const profileStore = useProfileStore() // 스토어 사용

const selectedMBTI = ref(
  typeof profileStore.mbti === 'string'
    ? profileStore.mbti.split('')
    : Array.isArray(profileStore.mbti)
      ? profileStore.mbti
      : ['', '', '', '']
)

const selectMBTI = (value, index) => {
  selectedMBTI.value[index] = value
  profileStore.mbti = selectedMBTI.value.join('')
  console.log(profileStore.mbti)
}

// 사용자가 페이지를 떠나기 전에 원본 데이터 복구
onBeforeRouteLeave((to, from, next) => {
  profileStore.restoreOriginalData()
  next()
})
</script>

<style scoped lang="scss">
.mbtiComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textL_size;
    font-weight: $textB_weight;
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
    font-size: $textXXL_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.mbtiBtn.selected {
  background-color: $point; /* 선택된 버튼의 배경색 */
  p {
    color: $white; /* 선택된 버튼의 텍스트 색상 */
  }
}
</style>
