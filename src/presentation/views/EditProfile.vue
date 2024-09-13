<template>
  <div class="frame">
    <BackspaceHeader :title="pageTitle" />
    <main class="body">
      <router-view />
      <div class="selfContainer" v-if="route.path === '/editProfile'">
        <OptionItem
          label="아이디"
          :boldText= true
          :none= false
          :detail="profileStore.accountId"
          :visible=false
          :boldDetail=true
        />
        <OptionItem label="자기소개" :boldText= true :onClick="navigateToSelf" />
        <div class="selfTextArea">
          <div class="textContainer">
            <span>{{ profileStore.selfIntro }}</span>
          </div>
          <span>{{ profileStore.selfIntro.length }}/30</span>
        </div>
      </div>
      <div class="editItemList" v-if="route.path === '/editProfile'">
        <OptionItem
          label="카카오톡 아이디"
          :detail="profileStore.snsID"
          :onClick="navigateToSnsID"
        />
        <OptionItem
          label="닉네임"
          :onClick="navigateToName"
          :detail="profileStore.name"
          :visible=true
        />
        <OptionItem
          label="나이"
          :detail="'만 ' + profileStore.age + '세'"
          :onClick="navigateToBirth"
          :visible=true
        />
        <OptionItem
          label="성별"
          :detail="profileStore.gender"
          :visible=false
        />
        <OptionItem
          label="MBTI"
          :onClick="navigateToMBTI"
          :detail="profileStore.selectedMBTI"
          :visible=true
        />
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
import BackspaceHeader from '@/presentation/components/BackspaceHeader.vue'
import OptionItem from '@/presentation/components/settings/OptionItem.vue'
import SelectBtn from '@/presentation/components/SelectBtn.vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfileStore } from '@/presentation/stores/profileStore'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const profileStore = useProfileStore()

const pageTitle = computed(() => {
  const titles = {
    '/editProfile': '프로필 수정',
    '/editSelf': '자기소개 수정',
    '/editSnsID': '카카오톡 아이디 수정',
    '/editName': '닉네임 수정',
    '/editBirth': '생년월일 수정',
    '/editMBTI': 'MBTI 수정'
  }
  return titles[route.path] || '수정하기'
})

const handleSubmit = () => {
  profileStore.submit(route.path)
}
const navigateToSelf = () => {
  router.push('/editSelf')
}
const navigateToSnsID = () => {
  router.push('/editSnsID')
}
const navigateToName = () => {
  router.push('/editName')
}
const navigateToBirth = () => {
  router.push('/editBirth')
}
const navigateToMBTI = () => {
  router.push('/editMBTI')
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 25px 0;
  gap: 20px;
  width: 100%;
  height: 100vh;
  flex-grow: 1;
}
.selfContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 15px;
  width: 100%;
}
.selfTextArea {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  width: 100%;
  span {
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
  span {
    font-weight: $textS_weight;
    font-size: $textMS_size;
    color: $dark;
  }
}
.editItemList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
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
