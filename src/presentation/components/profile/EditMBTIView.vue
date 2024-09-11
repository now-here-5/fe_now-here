<template>
  <MBTIComponent :store="profileStore" />
</template>

<script setup>
import MBTIComponent from '@/presentation/components/inputComponent/MBTIComponent.vue'
import { onBeforeRouteLeave } from 'vue-router' // useRouter를 추가로 import
import { useProfileStore } from '@/presentation/stores/profileStore'

const profileStore = useProfileStore() // 스토어 사용

onBeforeRouteLeave((to, from, next) => {
  profileStore.restoreOriginalData()
  next()
})
</script>

<style scoped lang="scss">
.mbtiComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.btnContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px;

  width: 100%;
}
.btnColumn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  width: 100%;
}
.mbtiBtn {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 12px;

  width: 62px;
  height: 62px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 7px;
  p {
    font-size: $textXXL_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.mbtiBtn.selected {
  background-color: $point; /* 선택된 버튼의 배경색 */
  p {
    color: $white; /* 선택된 버튼의 텍스트 색상 */
  }
}
</style>
