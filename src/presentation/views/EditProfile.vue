<template>
  <div class="frame">
    <header class="header">
      <img class="backspace" src="/images/backspace.png" alt="backspace" @click="navigateToBack" />
      <div class="titleContainer">
        <p v-if="route.path === '/editProfile'">프로필 수정</p>
        <p v-if="route.path === '/editSelf'">자기소개 수정</p>
        <p v-if="route.path === '/editName'">닉네임 수정</p>
        <p v-if="route.path === '/editMBTI'">MBTI 수정</p>
      </div>
    </header>
    <main class="body">
      <router-view />
      <div class="selfEdit" v-if="route.path === '/editProfile'">
        <div class="optionItem" @click="navigateToSelf">
          <p>자기소개</p>
          <img src="/images/keyboard_arrowRight.png" class="navigate_next" alt="navigate_next" />
        </div>
        <div class="selfText">
          <div class="textContainer">
            <p>{{ profileStore.description }}</p>
          </div>
          <p>{{ profileStore.description.length }}/30</p>
        </div>
      </div>
      <div class="editItemList" v-if="route.path === '/editProfile'">
        <div class="editItem">
          <p>휴대폰 번호</p>
          <div class="text_component">
            <p>{{ profileStore.phone }}</p>
            <div class="componentSpace"></div>
          </div>
        </div>
        <div class="editItem" @click="navigateToName">
          <p>닉네임</p>
          <div class="text_component">
            <p>{{ profileStore.nickname }}</p>
            <div class="componentSpace">
              <img
                src="/images/keyboard_arrowRight.png"
                class="navigate_next"
                alt="navigate_next"
              />
            </div>
          </div>
        </div>
        <div class="editItem">
          <p>나이</p>
          <div class="text_component">
            <p>만 {{ profileStore.birthdate }}세</p>
            <div class="componentSpace"></div>
          </div>
        </div>
        <div class="editItem">
          <p>성별</p>
          <div class="text_component">
            <p>{{ profileStore.gender }}</p>
            <div class="componentSpace"></div>
          </div>
        </div>
        <div class="editItem" @click="navigateToMBTI">
          <p>MBTI</p>
          <div class="text_component">
            <p>{{ profileStore.mbti }}</p>
            <div class="componentSpace">
              <img
                src="/images/keyboard_arrowRight.png"
                class="navigate_next"
                alt="navigate_next"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="bottom">
      <SelectBtn
        v-if="route.path !== '/editProfile'"
        :isActive="profileStore.hasChanges"
        buttonText="수정 완료"
        @click="handleSubmit"
      />
    </footer>
  </div>
</template>

<script setup>
import SelectBtn from '@/presentation/components/SelectBtn.vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfileStore } from '@/presentation/stores/profileStore'

const route = useRoute()
const router = useRouter() // useRouter 사용

const profileStore = useProfileStore()

const handleSubmit = () => {
  profileStore.submit(route.path) // 현재 라우트를 전달
}

const navigateToSelf = () => {
  router.push('/editSelf')
}
const navigateToName = () => {
  router.push('/editName')
}
const navigateToMBTI = () => {
  router.push('/editMBTI')
}
const navigateToBack = () => {
  profileStore.restoreOriginalData()
  router.back()
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
  padding: 25px 0px;
  gap: 20px;

  width: 100%;
  height: 100vh;

  flex-grow: 1;
}
.selfEdit {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  gap: 15px;
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
.selfText {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  width: 100%;
  p {
    font-weight: $textS_weight;
    font-size: $textS_size;

    color: $gray;
  }
}
.textContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  gap: 10px;

  width: 100%;
  height: 110px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  p {
    font-weight: $textS_weight;
    font-size: $textMS_size;

    color: $dark;
  }
}
.editItemList {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
}
.editItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
  gap: 10px;

  width: 100%;
  height: 40px;

  background: $white;
  p {
    font-weight: $textS_weight;
    font-size: $textM_size;

    color: $gray;
  }
}
.text_component {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  height: 24px;
  p {
    font-weight: $textS_weight;
    font-size: $textM_size;

    color: $dark;
  }
}
.componentSpace {
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
