<template>
  <div class="optionItem" @click="handleClick">
    <span :class="detail ? 'subItile' : ''">{{ label }}</span>
    <div class="align">
      <span v-if="detail">{{ detail }}</span>
      <img v-if="visible" src="/images/keyboard_arrowRight.png" class="navigateNext" alt="navigate_next" />
      <div v-if="!visible" class="navigateNext"></div>
    </div>
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
    required: false
  },
  visible: {
    type: Boolean,
    default: true
  },
  detail: {
    type: String,
    required: false
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
  .subItile {
    font-weight: $textS_weight;
    font-size: $textM_size;
    color: $gray;
  }
}
.align {
  display: flex;
  flex-direction: row;
  span {
    font-weight: $textS_weight;
    font-size: $textM_size;
    color: $dark;
  }
}
.navigateNext {
  margin-left: 5px;
  width: 24px;
  height: 24px;
}
</style>