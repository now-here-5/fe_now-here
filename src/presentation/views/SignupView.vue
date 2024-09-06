<template>
  <div class="frame">
    <BackspaceHeader />
    <main class="body">
      <div class="contentContainer" :class="{ profile: store_Signup.signupStep === 2 }">
        <TextContainer
          :location= store_Event.eventName
          :title= store_Signup.textTitleSelect
          :mention= store_Signup.textMentionSelect
        />
        <router-view />
      </div>
    </main>
    <footer class="bottom">
      <SelectBtn
        :isActive="store_Signup.isActive"
        :buttonText="store_Signup.BtnTextSelect"
        @click="handleSubmit"
      />
    </footer>

    <ModalS
      :isVisible="store_Signup.ModalS_duplicated"
      :title="store_Signup.modalSTitle"
      :message="store_Signup.modalSMessage"
      :buttonText="store_Signup.modalSBtnText[0]"
      @close= "store_Signup.closeModalS_duplicated"
    />
    <ModalS
      :isVisible="store_Signup.ModalS_authError"
      :title="store_Signup.modalSTitle"
      :message="store_Signup.modalSMessage"
      :buttonText="store_Signup.modalSBtnText[0]"
      @close= "store_Signup.closeModalS_authError"
    />
    <ModalS
      :isVisible="store_Signup.ModalS_completed"
      :title="store_Signup.modalSTitle"
      :message="store_Signup.modalSMessage"
      buttonText="매칭하러 가기"
      :imageSrc="store_ProfileSignup.modalImag"
      @close="store_Signup.closeModalS_completed"
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
import { signupStore } from "@/presentation/stores/SignupStore.js";
import { eventStore } from '@/presentation/stores/eventStore.js';
import { phoneAuthStore } from '@/presentation/stores/signupSub/phoneAuthStore.js';
import { passwordStore } from '@/presentation/stores/signupSub/passwordStore.js';
import { profileSignupStore } from "@/presentation/stores/signupSub/profileSignupStore.js";

const router = useRouter();
const store_Signup = signupStore();
const store_Event = eventStore();
const store_PhoneAuth = phoneAuthStore();
const store_Password = passwordStore();
const store_ProfileSignup = profileSignupStore();

const handleSubmit = () => {
  store_Signup.submit(router);
};

onMounted(() => {
  store_Signup.ModalS_duplicated = false;
  store_Signup.ModalS_authError = false;
  store_Signup.ModalS_completed = false;

  console.log('Loaded event_id from store:', store_Event.encodedId);
  console.log('Loaded event_name from store:', store_Event.eventName);

  console.log('Loaded phone from store:', store_PhoneAuth.phoneNumber);

  console.log('Loaded password from store:', store_Password.password);
  console.log('Loaded passwordConfirm from store:', store_Password.passwordConfirm);

  console.log('Loaded name from store:', store_Signup.name);
  console.log('Loaded email from store:', store_Signup.duplicateName);
  console.log('Loaded isDuplicate from store:', store_Signup.isDuplicate);
  console.log('Loaded birth from store:', store_Signup.birth);
  console.log('Loaded selectedSex from store:', store_Signup.selectedSex);
  console.log('Loaded selectedMBTI from store:', store_Signup.selectedMBTI);
  console.log('Loaded selfIntro from store:', store_Signup.selfIntro);
  console.log('Loaded signupStep from store:', store_Signup.signupStep);
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