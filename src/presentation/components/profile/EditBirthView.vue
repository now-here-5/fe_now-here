<template>
  <BirthComponent :store="profileStore" />
</template>

<script setup>
import { onMounted } from 'vue' // useMount hook import
import { onBeforeRouteLeave } from 'vue-router' // useRouter를 추가로 import
import { useProfileStore } from '@/presentation/stores/profileStore'
import BirthComponent from '@/presentation/components/inputComponent/BirthComponent.vue'

const profileStore = useProfileStore() // 스토어 사용

onMounted(() => {
  console.log(profileStore.birthInput)
})

onBeforeRouteLeave((to, from, next) => {
  profileStore.restoreOriginalData()
  next()
})
</script>

<style scoped lang="scss">
</style>
