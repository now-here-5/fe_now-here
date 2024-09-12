<template>
  <SnsIDComponent :store="profileStore" />
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router' // useRouter를 추가로 import
import { useProfileStore } from '@/presentation/stores/profileStore'
import SnsIDComponent from '@/presentation/components/inputComponent/SnsIDComponent.vue'

const profileStore = useProfileStore() // 스토어 사용

onBeforeRouteLeave((to, from, next) => {
  profileStore.restoreOriginalData()
  next()
})
</script>

<style scoped lang="scss">
</style>
