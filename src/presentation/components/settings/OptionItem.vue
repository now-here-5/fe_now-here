<template>
  <div class="optionItem" @click="handleClick">
    <span>{{ label }}</span>
    <img v-if="visible" src="/images/keyboard_arrowRight.png" class="navigate_next" alt="navigate_next" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  onClick: {
    type: Function,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  }
})
const handleClick = () => {
  props.onClick()
}
</script>

<style scoped lang="scss">
.optionItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  width: 100%;
  align-self: stretch;
  cursor: pointer;
  span {
    font-weight: $textB_weight;
    font-size: $textM_size;
    line-height: 23px;
    text-align: center;
    color: $dark;
  }
}
.navigate_next {
  width: 24px;
  height: 24px;
}
</style>