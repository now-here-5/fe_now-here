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
.nameComponent {
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
.input_btn_text {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
  .success {
    color: $green; /* 사용 가능한 닉네임일 때 */
  }
  .error {
    color: $red; /* 닉네임 중복 시 */
  }
  .warning {
    color: $red; /* 닉네임 중복 시 */
  }
}
.input_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 100%;
}
.nameInput {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 8px 0px;

  flex: 1;
  height: 48px;

  border: none;
  border-bottom: 1px solid $dark;
  border-radius: 0px;

  outline: none;
  font-size: $textM_size;
  font-weight: $textS_weight;
  color: $dark;
  &::placeholder {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
}
.duplicateBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 5px;

  width: 90px;
  height: 45px;

  background: $middle_gray;
  border-radius: 8px;
  p {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.duplicateBtn.filled {
  background: $point;
  cursor: pointer;
  p {
    color: $white; /* 입력된 숫자의 색상 */
  }
}
</style>
