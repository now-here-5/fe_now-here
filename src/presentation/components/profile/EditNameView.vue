<template>
  <NameComponent :store="profileStore" />
</template>

<script setup>
import NameComponent from '@/presentation/components/inputComponent/NameComponent.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useProfileStore } from '@/presentation/stores/profileStore'

const profileStore = useProfileStore()

onBeforeRouteLeave((to, from, next) => {
  profileStore.restoreOriginalData()
  next()
})
</script>

<style scoped lang="scss">
</style>
