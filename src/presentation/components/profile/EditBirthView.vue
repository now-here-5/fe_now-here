<template>
  <BirthComponent :store="profileStore" />
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router' // useRouter를 추가로 import
import { useProfileStore } from '@/presentation/stores/profileStore'
import BirthComponent from '@/presentation/components/inputComponent/BirthComponent.vue'

const profileStore = useProfileStore() // 스토어 사용

onBeforeRouteLeave((to, from, next) => {
  profileStore.restoreOriginalData()
  next()
})
</script>

<style scoped lang="scss">
</style>
