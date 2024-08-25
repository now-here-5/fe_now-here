<template>
  <header class="main-header">
    <span class="logo">Now, Here.</span>
    <RouterLink to="/notice"><img src="@/assets/images/notifications.png" /></RouterLink>
  </header>
</template>

<script setup></script>

<style lang="scss">
.main-header {
  width: 400px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  padding: 0 20px;
  height: 60px;
  z-index: 100;
  background-color: white;
  box-sizing: border-box;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;

  .logo {
    font-size: 28px;
    line-height: 28px;
    font-weight: 700;
  }
  img {
    width: 30px;
    cursor: pointer;
    margin-top: 5px;
  }
}
</style>
