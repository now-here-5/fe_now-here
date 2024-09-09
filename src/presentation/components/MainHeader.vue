<template>
  <header class="main-header">
    <img class="logo" src="/images/logo_text.png" alt="logo" />
    <RouterLink v-if="route.path === '/profile'" to="/settings">
      <img src="/images/settings.png" alt="settings" />
    </RouterLink>
    <RouterLink v-else to="/notice">
      <img src="/images/notifications.png" />
      <span v-if="notificationCounts > 0" class="count">{{ notificationCounts }}</span>
    </RouterLink>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMatchingStore } from '../stores/matchingStore'

const route = useRoute()
const matchingStore = useMatchingStore()
const notificationCounts = ref(0)

onMounted(async () => {
  const { data } = await matchingStore.fetchMatchingNotificationCounts()
  notificationCounts.value = data
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
  border-left: 1px solid $white;
  border-right: 1px solid $white;

  .logo {
    width: 210px;
  }
  img {
    width: 30px;
    cursor: pointer;
    margin-top: 5px;
  }
}
</style>
