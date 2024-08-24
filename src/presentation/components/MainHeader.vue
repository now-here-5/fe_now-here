<template>
  <header class="main-header">
    <div class="top-header">
      <span class="logo">Now, Here.</span>
      <RouterLink to="/notice"><img src="@/assets/images/notifications.png" /></RouterLink>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss">
.main-header {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 335px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  z-index: 100;

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
