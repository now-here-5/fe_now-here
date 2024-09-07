<template>
  <div class="frame">
    <BackspaceHeader />
    <main class="body">
      <div class="contentContainer" :class="{ profile: store_Signup.signupStep === 2 }">
        <TextContainer
          :location= store_Event.eventName
          :title= "store_Signup.textTitle[store_Signup.signupStep]"
          :mention= "store_Signup.textMention[store_Signup.signupStep]"
        />
        <router-view />
      </div>
    </main>
    <footer class="bottom">
      <SelectBtn
        :isActive="store_Signup.isActive"
        :buttonText="store_Signup.btnText[store_Signup.signupStep]"
        @click="handleSubmit"
      />
    </footer>

    <ModalS
      :isVisible="store_Popup.ModalS_duplicated"
      :title="store_Popup.modalSTitle"
      :message="`이미 가입된 휴대폰 번호입니다.<br>다시 한 번 확인해주세요.`"
      buttonText="확인"
      @close="store_Popup.closeModal"
    />
    <ModalS
      :isVisible="store_Popup.ModalS_authError"
      :title="store_Popup.modalSTitle"
      :message="`인증 번호가 일치하지 않습니다.<br>다시 입력해주세요.`"
      buttonText="확인"
      @close="store_Popup.closeModal"
    />
    <ModalS
      :isVisible="store_Popup.ModalS_completed"
      :title="store_Popup.modalSTitle"
      :message="`어떤 인연이 기다리고 있을까요?<br>지금 바로 만나보세요.`"
      buttonText="매칭하러 가기"
      :imageSrc="store_ProfileSignup.modalImag"
      @close="store_Popup.closeModal"
    />
  </div>
</template>

<script setup>
import BackspaceHeader from "@/presentation/components/BackspaceHeader.vue";
import TextContainer from "@/presentation/components/signup/TextContainer.vue";
import SelectBtn from "@/presentation/components/SelectBtn.vue";
import ModalS from "@/presentation/components/popUp/ModalS.vue";

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { signupStore } from "@/presentation/stores/signupStore.js";
import { eventStore } from '@/presentation/stores/eventStore.js';
import { profileSignupStore } from "@/presentation/stores/signupSub/profileSignupStore.js";
import { popupStore } from '@/presentation/stores/popupStore.js';

const router = useRouter();
const store_Popup = popupStore();
const store_Signup = signupStore();
const store_Event = eventStore();
const store_ProfileSignup = profileSignupStore();

const handleSubmit = () => {
  store_Signup.submit(router);
};

onMounted(() => {
  store_Popup.ModalS_duplicated = false;
  store_Popup.ModalS_authError = false;
  store_Popup.ModalS_completed = false;
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