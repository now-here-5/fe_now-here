<template>
  <div class="character-card">
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
      <div class="character-card__footer_content">?</div>
    </div>
  </div>
</template>

<script setup>
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { computed } from 'vue'

const props = defineProps({
  memberInfo: {
    type: Object,
    required: true
  }
})

const memberInfo = props.memberInfo
const matchingStore = useMatchingStore()

const recommendedInfo = computed(() => {
  const gender = matchingStore.getRecommendedMemberGender(memberInfo)
  const age = matchingStore.getRecommendedMemberAge(memberInfo)
  const mbtiScore = matchingStore.getRecommendedMemberMbtiScore(memberInfo)
  const avatarImgUrl = matchingStore.getRecommendedMemberAvatarImgUrl(memberInfo)
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
  border-radius: 13px;
  box-shadow: 0px 1px 3px 1px #00000026;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;

  &__header {
    position: relative;
    background: #f5f5f5;
    text-align: center;
    height: 170px;

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
    background-color: #6200ea;
    color: #fff;
    border-bottom-left-radius: 13px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;

    &-value {
      font-size: 18px;
      font-weight: 700;
    }

    &-text-value {
      font-size: 9px;
      font-weight: 700;
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
    font-size: 14px;
    font-weight: 700;
    color: $white;
  }

  &__info {
    font-size: 10px;
    color: $white;
  }

  &__footer {
    background-color: $light_grey;
    text-align: center;
    padding: 5px;
    font-size: 16px;
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
    }
  }
}
</style>
