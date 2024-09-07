<template>
  <header class="header">
    <img
      class="backspace"
      src="/images/backspace.png"
      alt="backspace"
      @click="handleBackspaceClick"
    />
    <div class="titleContainer">
      <p>{{ title }}</p>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const handleBackspaceClick = () => {
  router.go(-1) // 이전 페이지로 이동
}
</script>

<style scoped lang="scss">
.header {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: flex-end;
  gap: 10px;

  width: 100%;
  height: 30px;
}
.backspace {
  width: 30px;
  height: 30px;
}
.titleContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 30px 0px 0px;

  height: 24px;

  flex: 1;
  p {
    font-size: $textXL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
</style>
