<template>
  <div class="frame">
    <header class="header">
      <img class="logo_text" src="/images/Text_Logo/logo_text.png" alt="logo" />
      <div class="slogan_text">
        <span>지금 여기, 새로운 만남의 시작</span>
      </div>
    </header>
    <main class="body">
      <InputForm />
      <SelectBtn isActive="true" buttonText="로그인" @click="handleLogin" />
    </main>
    <footer class="bottom">
      <div class="left_content" @click="openBottomSheet">
        <span>회원가입</span>
      </div>
      <div class="right_content" @click="navigateToContact">
        <span>문의하기</span>
      </div>
    </footer>
  </div>

  <BottomSheet_Agree />
  <BottomSheet_Term />
</template>

<script setup>
import InputForm from '@/presentation/components/login/InputForm.vue'
import SelectBtn from '@/presentation/components/SelectBtn.vue'
import BottomSheet_Agree from '@/presentation/components/popUp/BottomSheet_Agree.vue'
import BottomSheet_Term from '@/presentation/components/popUp/BottomSheet_Term.vue'

import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router' // useRoute 추가

import { useLoginStore } from '@/presentation/stores/loginStore.js'
import { useEventStore } from '@/presentation/stores/eventStore.js'
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const route = useRoute() // useRoute를 통해 패스 변수를 추출
const router = useRouter()

const loginStore = useLoginStore()
const eventStore = useEventStore()
const popupStore = usePopupStore()

// onMounted에서 store의 checkEventExistence 함수를 호출
onMounted(async () => {
  eventStore.encodedId = route.params.encodedId // 경로 변수 추출
  console.log('encodedId', eventStore.encodedId)

  const isExist = await eventStore.checkEventExistence() // store에서 직접 호출
  if (!isExist) {
    router.push('/error')
  }
})

const handleLogin = () => {
  loginStore.login()
}

const openBottomSheet = () => {
  popupStore.bottomSheetVisible.agree = true
}
const navigateToContact = () => {
  router.push(`/interaction/inquiry`);
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
  .logo_text {
    height: 56px;
  }
  .slogan_text {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 10px;

    height: 35px;

    border-top: 2px solid $point;

    align-self: stretch;
    span {
      font-size: $textM_size;
      font-weight: $textB_weight;
      color: $point;
      cursor: default;
    }
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
.bottom {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: 70px;
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
      font-size: $textMS_size;
      font-weight: $textB_weight;
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
      font-size: $textMS_size;
      font-weight: $textB_weight;
      color: $dark;
      cursor: pointer;
    }
  }
}

/* 모바일 장치에 적용할 스타일 */
@media only screen and (max-width: 767px) {
  .header {
    height: 175px;
  }

  .body {
    height: 450px;
  }
}
/* 데스크톱에 적용할 스타일 */
@media only screen and (min-width: 767px) {
  .header {
    height: 250px;
  }

  .body {
    align-self: stretch;
    flex-grow: 1;
  }
}
</style>
