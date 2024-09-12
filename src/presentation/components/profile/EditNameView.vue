<template>
  <NameComponent :store="profileStore" />
  <ModalS
    :isVisible="popupStore.modalSVisible.duplicateName"
    :title="popupStore.modalSTitle"
    :message="`이미 사용 중인 닉네임입니다.<br>다른 닉네임을 지어주세요.`"
    buttonText="확인"
    @close="popupStore.closeModal('duplicateName')"
  />
</template>

<script setup>
import NameComponent from '@/presentation/components/inputComponent/NameComponent.vue'
import ModalS from '@/presentation/components/popUp/ModalS.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useProfileStore } from '@/presentation/stores/profileStore'
import { usePopupStore } from '@/presentation/stores/popupStore'

const profileStore = useProfileStore()
const popupStore = usePopupStore()

onBeforeRouteLeave((to, from, next) => {
  profileStore.restoreOriginalData()
  next()
})
</script>

<style scoped lang="scss">
</style>
