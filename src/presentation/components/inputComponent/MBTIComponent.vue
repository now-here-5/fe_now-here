<template>
  <div class="mbtiComponent">
    <span>MBTI</span>
    <div class="btnContainer">
      <div
        class="btnColumn"
        v-for="(options, index) in mbtiOptions"
        :key="index"
      >
        <div
          class="mbtiBtn"
          v-for="option in options"
          :key="option"
          @click="selectMBTI(option, index)"
          :class="{ selected: selectedMBTI[index] === option }"
        >
          <span>{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})

const mbtiOptions = [
  ['E', 'I'],
  ['N', 'S'],
  ['F', 'T'],
  ['P', 'J']
]
const selectedMBTI = ref(
  typeof props.store.selectedMBTI === 'string'
    ? props.store.selectedMBTI.split('')
    : Array.isArray(props.store.selectedMBTI)
      ? props.store.selectedMBTI
      : ['', '', '', '']
)
const selectMBTI = (value, index) => {
  selectedMBTI.value[index] = value
  props.store.selectedMBTI = selectedMBTI.value.join('')
  console.log(props.store.selectedMBTI)
}
</script>

<style scoped lang="scss">
.mbtiComponent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0 0;
  gap: 10px;
  width: 100%;
  span {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.btnContainer {
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
  span {
    font-size: $textXXL_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.mbtiBtn.selected {
  background-color: $point;
  span {
    color: $white;
  }
}
</style>
