<template>
  <header class="main-header">
    <span class="logo">Now, Here.</span>
    <RouterLink to="/notice"><img src="@/assets/images/notifications.png" /></RouterLink>
  </header>
</template>

<script setup></script>

<style lang="scss">
.main-header {
  display: flex;
  position: fixed;
  top: 0;
  width: 335px;
  height: 60px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  z-index: 100;
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
</style>
