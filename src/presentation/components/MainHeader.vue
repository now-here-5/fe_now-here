<template>
  <header class="main-header">
    <img class="logo" src="@/assets/images/logo_text.png" alt="logo" />
    <RouterLink to="/notice">
      <img src="@/assets/images/notifications.png" />
      <span class="count">{{ notificationCounts }}</span>
    </RouterLink>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMatchingStore } from '../stores/matchingStore'

const notificationCounts = ref(0)
const matchingStore = useMatchingStore()
onMounted(async () => {
  const { data } = await matchingStore.fetchMatchingNotificationCounts()
  notificationCounts.value = data.data
})
</script>

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
    width: 210px;
  }
  img {
    width: 30px;
    cursor: pointer;
    margin-top: 5px;
  }
  .count {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: white;
    background-color: red;
    border-radius: 50%;
    text-decoration: none;
    width: 16px;
    height: 16px;
    top: 10px;
    right: 17px;
    font-size: 8px;
    font-weight: 700;
  }
}
</style>
