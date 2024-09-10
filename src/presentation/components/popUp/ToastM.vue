<template>
  <div v-if="popupStore.toastMessage.visible" class="backgroud">
    <div class="mContainer">
      <span v-if="popupStore.toastMessage.type === 'inquiry'">문의 내용이 정상 접수되었습니다.</span>
      <span v-if="popupStore.toastMessage.type === 'feedback'">소중한 의견을 주셔서 감사합니다!</span>
    </div>
  </div>
</template>

<script setup>
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const popupStore = usePopupStore()
</script>

<style scoped lang="scss">
.backgroud {
  position: fixed;
  bottom: 0;
  width: 400px;
  height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.mContainer {
  padding: 12px 10px;
  width: 300px;
  height: 45px;
  background: $point;
  border-radius: 15px;
  border: 3px solid $white;
  align-self: stretch;
  span {
    color: $white;
    font-size: $textS_size;
    font-weight: $textB_weight;
    text-align: center;
  }
}
</style>
