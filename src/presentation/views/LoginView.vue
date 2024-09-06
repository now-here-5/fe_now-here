<template>
  <div class="frame">
    <header class="header">
      <img class="logo_text" src="@/assets/images/Text_Logo/logo_text.png" alt="logo" />
      <div class="slogan_text">
        <span>지금 여기, 새로운 만남의 시작</span>
      </div>
    </header>
    <main class="body">
      <InputForm />
      <div class="selectBtn" @click="handleLogin">
        <p>로그인</p>
      </div>
    </main>
    <footer class="bottom">
      <div class="left_content" @click="openBottomSheet">
        <span>회원가입</span>
      </div>
      <div class="right_content" @click="navigateToContact">
        <span>문의하기</span>
      </div>
    </footer>

    <BottomSheet />
  </div>
</template>

<script setup>
import InputForm from "@/presentation/components/login/InputForm.vue";
import BottomSheet from "@/presentation/components/popUp/BottomSheet.vue";

import { onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';  // useRoute 추가
import { loginStore } from "@/presentation/stores/loginStore";
import { eventStore } from "@/presentation/stores/eventStore";

const route = useRoute();  // useRoute를 통해 패스 변수를 추출
const router = useRouter();
const store_Login = loginStore();
const store_Event = eventStore();

// onMounted에서 store의 checkEventExistence 함수를 호출
onMounted(async () => {
  store_Login.encodedId = route.params.encodedId;  // 경로 변수 추출
  console.log("encodedId" ,store_Login.encodedId)

  const isExist = await store_Login.checkEventExistence(store_Event); // store에서 직접 호출
  if (!isExist) {
    router.push('/error');
  }
});

const handleLogin = () => {
  if (!store_Login.phone && store_Login.password) {
    store_Login.alertMessage = '휴대폰 번호를 입력해 주세요.';
  } else if (store_Login.phone && !store_Login.password) {
    store_Login.alertMessage  = '비밀번호를 입력해 주세요.';
  } else if (!store_Login.phone && !store_Login.password) {
    store_Login.alertMessage  = '휴대폰 번호와 비밀번호를 입력해 주세요';
  } else {
    store_Login.alertMessage  = '';
    store_Login.login();
  }
};

const openBottomSheet = () => {
  store_Login.bottomSheetVisible.agree = true;
};
const navigateToContact = () => {
  router.push('/contact'); // 원하는 라우트로 이동
}
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px 0px 0px 25px;

  width: 100%;
  height: 175px;
}
.logo_text {
  height: 56px;
}
.slogan_text {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;

  height: 35px;

  border-top: 2px solid #4910D2;

  align-self: stretch;
  span {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $point;
    cursor: default;
  }
}

.body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 0px;
  gap: 10px;
}
.selectBtn {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 315px;
  height: 50px;
  background-color: $point;
  border-radius: 7px;
  cursor: pointer;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $white;
  }
}

.bottom {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: 70px;
}
.left_content {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px 30px;

  height: 20px;

  border-right: 1px solid $dark;

  flex: 1;
  order: 0;
  span {
    font-size: $textMS_B;
    font-weight: $font_Bold;
    color: $dark;
    cursor: pointer;
  }
}
.right_content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 30px;


  height: 20px;

  border-left: 1px solid $dark;

  flex: 1;
  order: 0;
  span {
    font-size: $textMS_B;
    font-weight: $font_Bold;
    color: $dark;
    cursor: pointer;
  }
}

/* 모바일 장치에 적용할 스타일 */
@media only screen and (max-width: 600px) {
  .header {
    height: 175px;
  }

  .body {
    height: 450px;
  }
}
/* 데스크톱에 적용할 스타일 */
@media only screen and (min-width: 601px) {
  .header {
    height: 250px;
  }

  .body {
    align-self: stretch;
    flex-grow: 1;
  }
}
</style>