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
        <OptionItem label="로그아웃" :on-click="settingStore.logout" :visible="false"/>
        <OptionItem label="계정 탈퇴" :on-click="openWithdrawModal" :visible="false"/>
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

.header {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: flex-end;
  gap: 10px;

  width: 100%;
  height: 30px;
}
.backspace {
  width: 30px;
  height: 30px;
}
.titleContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 30px 0px 0px;

  height: 24px;

  flex: 1;
  p {
    font-size: $textXL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
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
.navigate_next {
  width: 24px;
  height: 24px;
}
.bottom {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  gap: 10px;

  height: 110px;
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

.bottom {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  gap: 10px;

  height: 110px;
}
.selectBtn {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 315px;
  height: 50px;
  background-color: $middle_gray;
  border-radius: 7px;
  cursor: pointer;
  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $gray;
  }
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

.M_Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

/* modalL */
.modalL {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 250px;
}
.modalL_contentContainer {
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 100%;

  background: $white;
  border-bottom: 1px solid $dark;
  border-radius: 15px 15px 0px 0px;
}
.modalL_header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 10px 0px;

  width: 100%;
  height: 60px;
}
.modalL_titleContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0px 0px 0px 34px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.modalL_clearContainer {
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.modalL_imgContainer {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
}
.modalL_img {
  width: 150px;
  height: 150px;
}
.modalL_detailContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 20px;
  gap: 15px;

  width: 100%;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  p {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.modalL_progressComponent {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  width: 55px;
}
.modalL_circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: $middle_gray;
}
.active-circle {
  background: $dark;
}
.modalL_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;

  width: 100%;

  background: $white;
  border-radius: 0px 0px 15px 15px;
}
.modalL_btnBg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 40px;

  background: $middle_gray;
  border-radius: 12px;

  flex-grow: 1;
  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $gray;
  }
  &.active {
    background: $point; /* active 클래스가 있을 때의 배경 색상 */
    p {
      color: $white;
    }
  }
}
.modalL_btnBg.active {
  background: $point;
  cursor: pointer;
}
.modalL_btnBg.active p {
  color: $white;
}
</style>
