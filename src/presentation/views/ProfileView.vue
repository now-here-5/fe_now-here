<template>
  <div class="body">
    <div class="profileCard">
      <img class="imgContainer" :src="avatarSrc" alt="profile" />
      <div class="profileInfo">
        <span>{{ profileStore.selectedMBTI }}</span>
        <div class="profileNickname">
          <span>{{ profileStore.name }}</span>
          <div class="profileDetail">
            <span>만 {{ profileStore.birthdate }}세</span>
            <span>{{ profileStore.gender }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="editBtn" @click="navigateToEditProfile">
      <span>프로필 수정</span>
    </div>
    <div class="optionList">
      <OptionItem label="문의하기" :onClick="navigateToContact" />
      <OptionItem label="의견 남기기" :onClick="navigateToReview" />
    </div>
  </div>
</template>

<script setup>
import OptionItem from '@/presentation/components/settings/OptionItem.vue'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/presentation/stores/profileStore.js'
import { getAvatarSrc } from '@/Composition/GetAvatar.js'

const router = useRouter() // useRouter 사용
const profileStore = useProfileStore()

onMounted(async () => {
  await profileStore.fetchProfile()
})

const avatarSrc = computed(() => {
  const gender = profileStore.gender === '여성' ? 'Female' : 'Male'
  const src = getAvatarSrc(gender, profileStore.selectedMBTI)
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 30px;
  height: calc(100vh - 140px);
  margin-top: 70px;
}
.profileCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  gap: 15px;
  width: 100%;
  height: 110px;
  background: $point;
  box-shadow:
    0 6px 10px 4px rgba($dark, 0.15),
    0 2px 3px rgba($dark, 0.3);
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
.profileInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  span {
    font-weight: $textB_weight;
    font-size: $textXXL_size;
    color: $white;
    line-height: 30px;
  }
}
.profileNickname {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  span {
    font-weight: $textB_weight;
    font-size: $textM_size;
    line-height: 19px;
    color: $white;
  }
}
.profileDetail {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  span {
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
  span {
    font-weight: $textB_weight;
    font-size: $textM_size;
    line-height: 23px;
    text-align: center;
    color: $white;
  }
}
.optionList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}
</style>
