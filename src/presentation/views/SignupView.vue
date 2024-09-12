<template>
  <div class="frame">
    <BackspaceHeader />
    <main class="body">
      <div class="contentContainer" :class="{ profile: signupStore.signupStep === 2 }">
        <LocationDescComponent
          :location= eventStore.eventName
          :title= "signupStore.textTitle[signupStore.signupStep]"
          :Desc= "signupStore.textMention[signupStore.signupStep]"
        />
        <router-view />
      </div>
    </main>
    <footer class="bottom">
      <SelectBtn
        :isActive="signupStore.isActive"
        :buttonText="signupStore.btnText[signupStore.signupStep]"
        @click="handleSubmit"
      />
    </footer>

    <ModalS
      :isVisible="popupStore.modalSVisible.duplicateID"
      :title="popupStore.modalSTitle"
      :message="`이미 사용 중인 아이디입니다.<br>다른 아이디를 사용해주세요.`"
      buttonText="확인"
      @close="popupStore.closeModal"
    />
    <ModalS
      :isVisible="popupStore.authErrorModal"
      :title="popupStore.modalSTitle"
      :message="`인증 번호가 일치하지 않습니다.<br>다시 입력해주세요.`"
      buttonText="확인"
      @close="popupStore.closeModal"
    />
    <ModalS
      :isVisible="popupStore.completeModal"
      :title="popupStore.modalSTitle"
      :message="`어떤 인연이 기다리고 있을까요?<br>지금 바로 만나보세요.`"
      buttonText="매칭하러 가기"
      :imageSrc="profileSignupStore.modalImag"
      @close="popupStore.closeModal"
    />
  </div>
</template>

<script setup>
import BackspaceHeader from "@/presentation/components/BackspaceHeader.vue";
import LocationDescComponent from "@/presentation/components/signup/LocationDescComponent.vue";
import SelectBtn from "@/presentation/components/SelectBtn.vue";
import ModalS from "@/presentation/components/popUp/ModalS.vue";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileSignupStore } from "@/presentation/stores/signupSub/profileSignupStore.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';
import { useSignupStore } from "@/presentation/stores/signupStore.js";

const router = useRouter();
const profileSignupStore = useProfileSignupStore();
const eventStore = useEventStore();
const popupStore = usePopupStore();
const signupStore = useSignupStore();

const handleSubmit = () => {
  signupStore.submit(router);
};

onMounted(() => {
  popupStore.modalSDuplicated = false;
  popupStore.modalSDuplicated = false;
  popupStore.modalSDuplicated = false;
});

</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px 25px ;

  height: 100vh;

  background: $white;
}

.body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0px;
  gap: 20px;

  width: 100%;
}
.contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  width: 100%;
}
.contentContainer.profile {
  height: calc(100vh - 300px); /* 원하는 높이로 제한 (300px은 헤더와 기타 요소 높이 고려) */
  overflow-y: auto; /* 내용이 넘칠 경우 수직 스크롤을 허용 */
}
.contentContainer::-webkit-scrollbar {
  display: none; /* 웹킷 브라우저에서 스크롤바 숨기기 */
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