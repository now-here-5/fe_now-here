<template>
  <MainHeader v-if="showMainHeader" />
  <div class="main-container">
    <RouterView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import MainHeader from '@/presentation/components/MainHeader.vue'
import { computed } from 'vue'
const route = useRoute()
const showMainHeader = computed(() => route.path === '/')
</script>

<style scoped lang="scss">
.main-container {
  min-width: 375px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-y: auto;

  // 추가적인 스타일링
  background-color: white;
  border: 1px solid #ddd;
}
</style>
