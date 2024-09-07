<template>
  <div @click="onCustomClick" class="character-card" :class="{ 'is-flipped': isFlipped }">
    <div class="character-card-front">
      <!-- 앞면 -->
      <div class="character-card__header">
        <img :src="avatarImgUrl" alt="profile_img" class="character-card__image" />
        <div class="character-card__score">
          <span class="character-card__score-value">{{ mbtiScore }}</span>
          <span class="character-card__score-text-value">케미 점수</span>
        </div>
        <div class="character-card__body">
          <h2 class="character-card__name">{{ memberInfo?.nickname }}</h2>
          <p class="character-card__info">{{ age }}세, {{ gender }}</p>
        </div>
      </div>
      <div class="character-card__footer">
        <div class="character-card__footer_content">
          {{ showDesc ? memberInfo?.description : '?' }}
        </div>
      </div>
    </div>

    <!-- 뒷면 -->
    <div class="character-card-back">
      <img class="img-logo" src="/images/Image_Logo/logo_lined.png" />
      <img class="text-logo" src="/images/Text_Logo/logo_text.png" />
    </div>
  </div>

  <ModalL_Heart :member-info="memberInfo" />
</template>

<script setup>
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { computed } from 'vue'
import ModalL_Heart from '../popUp/ModalL_Heart.vue'

const props = defineProps({
  memberInfo: {
    type: Object,
    required: true
  },
  isFlipped: { type: Boolean, required: false },
  showDesc: {
    type: Boolean,
    required: false,
    withDefaults: false
  },
  onCustomClick: {
    type: Function,
    required: false
  }
})

const matchingStore = useMatchingStore()
const recommendedInfo = computed(() => {
  const gender = matchingStore.getRecommendedMemberGender(props.memberInfo)
  const age = matchingStore.getRecommendedMemberAge(props.memberInfo)
  const mbtiScore = matchingStore.getRecommendedMemberMbtiScore(props.memberInfo)
  const avatarImgUrl = matchingStore.getRecommendedMemberAvatarImgUrl(props.memberInfo)
  return { gender, age, mbtiScore, avatarImgUrl }
})

const gender = computed(() => recommendedInfo.value.gender)
const age = computed(() => recommendedInfo.value.age)
const mbtiScore = computed(() => recommendedInfo.value.mbtiScore)
const avatarImgUrl = computed(() => recommendedInfo.value.avatarImgUrl)
</script>

<style lang="scss">
.character-card {
  width: 170px;
  height: 230px; // 카드의 높이를 명시적으로 설정
  position: relative;
  border-radius: 13px;
  box-shadow: 0px 1px 3px 1px #00000026;
  background-color: #fff;
  cursor: pointer;

  transform-style: preserve-3d;
  perspective: 1000px; // 3D 효과

  transition: transform 3s ease-in-out; // 더 부드러운 애니메이션

  &-front,
  &-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 13px;
    backface-visibility: hidden; // 뒷면이 보이지 않도록
  }

  &-back {
    transform: rotateY(180deg); // 뒷면을 180도로 회전
    background-color: $point;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .img-logo {
      width: 95%;
    }
    .text-logo {
      width: 120px;
      background-color: $white;
      border-radius: 15px;
      padding: 10px 5px;
      margin-top: -10px;
    }
  }

  &.is-flipped {
    transform: rotateY(360deg); // 카드 전체를 180도 회전
  }

  &__header {
    position: relative;
    background: #f5f5f5;
    text-align: center;
    height: 170px;
    border-radius: 13px;

    img {
      border-radius: 13px;
    }

    // 이미지 위에 그라데이션 오버레이 추가
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0) 50%
      ); // 그라데이션 설정
      pointer-events: none; // 마우스 이벤트를 무시하도록 설정
    }
  }

  &__image {
    width: 170px;
    border-bottom: 2px solid #e0e0e0;
  }

  &__score {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: $point;
    color: #fff;
    border-bottom-left-radius: 13px;
    border-top-right-radius: 13px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;

    &-value {
      font-size: $textL_size;
      font-weight: $textB_weight;
    }

    &-text-value {
      font-size: $textXXS_size;
      font-weight: $textB_weight;
    }
  }

  &__body {
    position: absolute;
    padding: 10px;
    text-align: center;
    bottom: 0;
    text-align: start;
    z-index: 100;
  }

  &__name {
    margin: 0;
    font-size: $textMS_size;
    font-weight: $textB_weight;
    color: $white;
  }

  &__info {
    font-size: $textXS_size;
    color: $white;
  }

  &__footer {
    background-color: $light_gray;
    text-align: center;
    padding: 5px;
    font-size: $textM_size;
    font-weight: 700;
    height: 60px;
    .character-card__footer_content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: $white;
      border-bottom-left-radius: 13px;
      border-bottom-right-radius: 13px;
      box-shadow: 0px 1px 3px 1px #00000026;
      font-size: $textXS_size;
    }
  }
}
</style>
