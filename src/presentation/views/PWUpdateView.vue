<template>
  <div class="frame">
    <BackspaceHeader />
    <main class="body">
      <div class="contentContainer">
        <LocationDescComponent
          :location="eventStore.eventName"
          :title="pwUpdateStore.textTitle[pwUpdateStore.step]"
          :Desc="pwUpdateStore.textMention[pwUpdateStore.step]"
        />
        <router-view />
      </div>
    </main>
    <footer class="bottom">
      <SelectBtn
        :isActive="pwUpdateStore.isActive"
        :buttonText="pwUpdateStore.btnText[pwUpdateStore.step]"
        @click="handleSubmit"
      />
    </footer>

    <ModalS
      :isVisible="popupStore.modalSVisible.updatePWError"
      :title="popupStore.modalSTitle"
      :message="`가입되지 않은 전화번호입니다.<br>올바른 전화번호를 입력해주세요.`"
      buttonText="확인"
      @close="popupStore.closeModal('updatePWError')"
    />
    <ModalS
      :isVisible="popupStore.modalSVisible.authError"
      :title="popupStore.modalSTitle"
      :message="`인증 번호가 일치하지 않습니다.<br>다시 입력해주세요.`"
      buttonText="확인"
      @close="popupStore.closeModal('authError')"
    />
    <ModalS
      :isVisible="popupStore.modalSVisible.completePW"
      :title="popupStore.modalSTitle"
      :message="`비밀번호가 변경되었습니다.<br>다시 로그인을 시도해주세요.`"
      buttonText="확인"
      @close="popupStore.closeModal('completePW')"
    />
  </div>
</template>

<script setup>
import BackspaceHeader from '@/presentation/components/BackspaceHeader.vue';
import LocationDescComponent from '@/presentation/components/signup/LocationDescComponent.vue';
import SelectBtn from '@/presentation/components/SelectBtn.vue';
import ModalS from '@/presentation/components/popUp/ModalS.vue';
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';
import { usePWUpdateStore } from '@/presentation/stores/pwUpdateStore.js';

const pwUpdateStore = usePWUpdateStore();
const eventStore = useEventStore();
const popupStore = usePopupStore();

const handleSubmit = () => {
  pwUpdateStore.submit();
};

</script>

<style scoped lang="scss">
.frame {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px 25px;
  height: 100vh;
  background: $white;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0;
  gap: 20px;
  width: 100%;
}
.contentContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  gap: 10px;
  height: 110px;
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