<template>
  <div v-if="popupStore.modalLVisible.download" class="overlay" @click="closeModal">
    <div class="modalL">
      <div class="contentContainer">
        <div class="header" />
        <div class="imgContainer">
          <img :src="avatarSrc" class="modalL_img" alt="mailBox"/>
        </div>
        <div class="detailContainer" />
      </div>
      <div class="btn">
        <div class="btnBg active" @click="downloadImage">
          <span>다운로드</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePopupStore } from '@/presentation/stores/popupStore.js'
import { useProfileStore } from '@/presentation/stores/profileStore.js'
import { computed } from 'vue'
import { getAvatarSrc } from '@/composition/GetAvatar.js'

const popupStore = usePopupStore()
const profileStore = useProfileStore()

const avatarSrc = computed(() => {
  const gender = profileStore.gender === '여성' ? 'Female' : 'Male'
  const src = getAvatarSrc(gender, profileStore.selectedMBTI)
  return src
})
const closeModal = () => {
  popupStore.modalLVisible.download = false
}
const downloadImage = () => {
  popupStore.modalLVisible.download = false
  const imageUrl = avatarSrc.value; // computed 속성에서 실제 값을 가져오기 위해 .value 사용
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'MBTI.png'; // 다운로드 시 저장할 파일명
  link.click();
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}
.modalL {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 250px;
}
.contentContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: $white;
  border-bottom: 1px solid $dark;
  border-radius: 15px 15px 0 0;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 10px 0;
  width: 250px;
  height: 10px;
}
.imgContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 10px;

  width: 200px;
  height: 200px;
}
.modalL_img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 3px solid $point;
}
.detailContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  width: 250px;
  height: 10px;
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;
  width: 100%;
  background: $white;
  border-radius: 0 0 15px 15px;
}
.btnBg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  background: $middle_gray;
  border-radius: 12px;
  flex-grow: 1;
  span {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $gray;
  }
  &.active {
    background: $point;
    span {
      color: $white;
    }
  }
}
</style>