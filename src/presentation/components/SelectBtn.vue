<template>
  <div class="selectBtn" :class="{ disabled: !isActive }" @click="handleClick">
    <span>{{ buttonText }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: Boolean,
  buttonText: String
})
const emit = defineEmits(['click'])
const handleClick = () => {
  if (props.isActive) {
    emit('click')
  }
}
</script>

<style scoped lang="scss">
.selectBtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 315px;
  height: 50px;
  background-color: $point;
  border-radius: 7px;
  cursor: pointer;
  span {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $white;
  }
}
.selectBtn.disabled {
  background-color: $middle_gray;
  cursor: not-allowed;
  span {
    color: $gray;
  }
}
</style>
