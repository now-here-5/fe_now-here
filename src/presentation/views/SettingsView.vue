<template>
  <div class="frame">
    <BackspaceHeader :title="pageTitle" />
    <router-view />
    <main class="body" v-if="route.path === '/settings'">
      <div class="optionList">
        <div class="optionItem">
          <p>문자 알림</p>
          <div class="toggle-switch">
            <input
              type="checkbox"
              id="switch"
              :checked="!settingStore.notification"
              @change="settingStore.fetchNotification"
            />
            <label for="switch"></label>
          </div>
        </div>
        <OptionItem label="로그아웃" :on-click="settingStore.logout" :visible=false />
        <OptionItem label="계정 탈퇴" :on-click="openWithdrawModal" :visible=false />
      </div>
    </main>
  </div>

  <WithdrawModal />
</template>

<script setup>
import BackspaceHeader from '@/presentation/components/BackspaceHeader.vue'
import WithdrawModal from '@/presentation/components/popUp/WithdrawModal.vue'
import OptionItem from '@/presentation/components/settings/OptionItem.vue'
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useSettingStore } from '@/presentation/stores/settingStore.js'
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const route = useRoute()
const settingStore = useSettingStore()
const popupStore = usePopupStore()

onMounted(() => {
  settingStore.getNotification()
})
const pageTitle = computed(() => {
  if (route.path === '/settings') {
    return '설정'
  } else {
    return '계정 탈퇴'
  }
})
const openWithdrawModal = () => {
  popupStore.modalLVisible.withdraw = true
}
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px 25px;

  height: 100vh;
}
.body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0px;
  gap: 30px;

  width: 100%;
}
.optionList {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
}
.optionItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;

  width: 100%;

  align-self: stretch;

  p {
    font-weight: $textB_weight;
    font-size: $textM_size;
    line-height: 23px;
    text-align: center;

    color: $dark;
  }
}
.toggle-switch {
  position: relative;
  width: 64px;
  height: 32px;
}
.toggle-switch input[type='checkbox'] {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $point;
  transition: 0.4s;
  border-radius: 24px;
}
.toggle-switch label:before {
  position: absolute;
  content: '';
  height: 25px;
  width: 25px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
.toggle-switch input:checked + label {
  background-color: $gray;
}
.toggle-switch input:checked + label:before {
  transform: translateX(31px);
}
/* 모바일 장치에 적용할 스타일 */
@media only screen and (max-width: 600px) {
  .body {
    height: 520px;
  }
}
/* 데스크톱에 적용할 스타일 */
@media only screen and (min-width: 601px) {
  .body {
    align-self: stretch;
    flex-grow: 1;
  }
}
</style>
