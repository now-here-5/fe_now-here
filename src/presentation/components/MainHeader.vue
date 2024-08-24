<template>
  <header class="main-header">
    <div class="top-header">
      <span class="logo">Now, Here.</span>
      <RouterLink to="/notice"><img src="@/assets/images/notifications.png" /></RouterLink>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'

// 브라우저 width에 따라 header width 조정
onMounted(() => {
  const mainContainer = document.querySelector('.main-container')
  const mainHeader = document.querySelector('.main-header')
  const parentWidth = mainContainer.offsetWidth
  if (mainHeader) {
    mainHeader.style.width = `${parentWidth - 40}px`
  }
})
</script>

<style lang="scss">
.main-header {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  z-index: 100;
  background-color: white;

  .top-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .logo {
      font-size: 28px;
      line-height: 28px;
      font-weight: 700;
    }
    img {
      width: 30px;
      cursor: pointer;
    }
  }
}
</style>
