<template>
  <div class="body">
    <div class="profileCardContainer">
      <img class="imgContainer" :src="avatarSrc" alt="profile" />
      <div class="textContainer">
        <p>{{ store_profile.mbti }}</p>
        <div class="subContainer">
          <p>{{ store_profile.nickname }}</p>
          <div class="detailContainer">
            <p>만 {{ store_profile.birthdate }}세</p>
            <p>{{ store_profile.gender }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="editBtn" @click="navigateToEditProfile">
      <p>프로필 수정</p>
    </div>
    <div class="optionList">
      <div class="optionItem" @click="navigateToContact">
        <p>문의하기</p>
        <img src="/images/keyboard_arrowRight.png" class="navigate_next" alt="navigate_next" />
      </div>
      <div class="optionItem" @click="navigateToReview">
        <p>의견 남기기</p>
        <img src="/images/keyboard_arrowRight.png" class="navigate_next" alt="navigate_next" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue' // useRouter를 추가로 import

import { profileStore } from '@/presentation/stores/profileStore.js'
import { getAvatarSrc } from '@/core/usecases/GetAvatar.js'

const router = useRouter() // useRouter 사용
const store_profile = profileStore()

onMounted(async () => {
  const profile = await store_profile.fetchProfile()
  if (profile) {
    console.log(profile)
  }
})

// 성별을 영어로 가져오기 위해 store_profile의 원래 값을 유지
const avatarSrc = computed(() => {
  const gender = store_profile.gender === '여성' ? 'Female' : 'Male'
  const mbti = store_profile.mbti

  const src = getAvatarSrc(gender, mbti)
  console.log('baseImgSrc', src)
  return src
})

const navigateToEditProfile = () => {
  router.push('/editProfile')
}
const navigateToContact = () => {
  router.push(`/interaction/inquiry`);
}
const navigateToReview = () => {
  router.push(`/interaction/feedback`);
}
</script>

<style scoped lang="scss">
.body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 30px;

  height: calc(100vh - 140px); /* 부모의 전체 높이를 차지하도록 설정 */

  margin-top: 70px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
  overflow: hidden; /* 스크롤 생성을 방지하고 숨김 */
}
.profileCardContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  gap: 15px;

  width: 100%;
  height: 110px;

  background: $point;
  box-shadow:
    0px 6px 10px 4px rgba($dark, 0.15),
    0px 2px 3px rgba($dark, 0.3);
  border-radius: 18px;
}
.imgContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  width: 100px;
  height: 100px;

  border: 2px solid $white;
  border-radius: 12px;
}
.textContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  p {
    font-weight: $textB_weight;
    font-size: $textXXL_size;
    color: $white;
    line-height: 30px;
  }
}
.subContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  p {
    font-weight: $textB_weight;
    font-size: $textM_size;
    line-height: 19px;
    color: $white;
  }
}
.detailContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: 10px;
  p {
    font-weight: $textS_weight;
    font-size: $textM_size;
    line-height: 19px;
    color: $white;
  }
}
.editBtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;

  width: 335px;
  border-radius: 5px;

  background: $dark;
  p {
    font-weight: $textB_weight;
    font-size: $textM_size;
    line-height: 23px;
    text-align: center;

    color: #ffffff;
  }
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
  cursor: pointer;
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
</style>
