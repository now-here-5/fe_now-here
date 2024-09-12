<template>
  <div class="pinContainer" @click="focusInput">
    <span class="title">{{ label }}</span>
    <div class="pinRow">
      <div
        v-for="(char, index) in 4"
        :key="index"
        class="numberInput"
        :class="{ filled: internalValue[index] }"
      >
        <div class="circle" :class="{ filled: internalValue[index] }">
          {{ internalValue[index] ? '*' : '•' }}
        </div>
      </div>
    </div>
    <input
      ref="hiddenInput"
      type="tel"
      maxlength="4"
      class="hiddenInput"
      v-model="internalValue"
      @input="onInput"
    />
    <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue)
const hiddenInput = ref(null)

const onInput = (event) => {
  const inputValue = event.target.value.replace(/\D/g, '').slice(0, 4)
  internalValue.value = inputValue
  emit('update:modelValue', inputValue)
}
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  }
)
const focusInput = () => {
  nextTick(() => {
    hiddenInput.value.focus()
  })
}
</script>

<style scoped lang="scss">
.hiddenInput {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
.pinContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  .title {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  .error {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $red;
  }
}
.pinRow {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
}
.numberInput {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  width: 45px;
  height: 55px;
  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
}
.numberInput.filled {
  background: $point;
}
.circle {
  font-size: 24px;
  color: $gray;
}
.circle.filled {
  margin-top: 10px;
  color: $white;
}
</style>
