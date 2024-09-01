<template>
  <div class="matching-status-container">
    <span class="title">매칭 현황</span>
    <span class="desc">다른 유저들은 어떤 인연을 만나고 있을까요?</span>
    <Carousel v-if="matchedInfoList.length > 0" :autoplay="3000" :wrapAround="isRolling">
      <Slide v-for="matchedInfo in matchedInfoList" :key="matchedInfo">
        <div class="matching-banner">
          <div class="info-wrapper">
            <span class="title">
              {{ matchedInfo.senderNickname }}님과 <br />
              {{ matchedInfo.receiverNickname }}님이 <br />
              매칭되었어요!</span
            >
            <span class="desc">케미 점수는 {{ getMbtiScore(matchedInfo) }}점이에요!</span>
          </div>
          <div class="profile-wrapper">
            <div class="profile">
              <span class="mbti">{{ matchedInfo.senderMbti }}</span>
              <img
                class="profile-img"
                :src="getAvatarImgUrl(matchedInfo, 'sender')"
                alt="senderAvatar"
              />
            </div>
            <div class="profile">
              <span class="mbti">{{ matchedInfo.receiverMbti }}</span>
              <img
                class="profile-img"
                :src="getAvatarImgUrl(matchedInfo, 'receiver')"
                alt="receiverAvatar"
              />
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>

    <div v-else class="matching-banner no-data">
      <span class="main-text"> 새로운 매칭을 기다리고 있어요. </span>
      <span class="sub-text">곧 좋은 소식을 전해드릴게요!</span>
    </div>
  </div>
</template>

<script setup>
import { useMatchingStore } from '@/presentation/stores/matchingStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const matchingStore = useMatchingStore()
const { matchedInfoList } = storeToRefs(matchingStore)

const getMbtiScore = (matchedInfo) => {
  return matchingStore.getMatchedInfoMbtiScore(matchedInfo)
}
const getAvatarImgUrl = (matchedInfo, role) => {
  const { senderAvatarImgUrl, receiverAvatarImgUrl } =
    matchingStore.getMatchedInfoAvatarImgUrls(matchedInfo)
  return role === 'sender' ? senderAvatarImgUrl : receiverAvatarImgUrl
}

const isRolling = computed(() => matchedInfoList.value.length > 1)

onMounted(async () => {
  await matchingStore.fetchMatchedInfoList()
  // matchedInfoList.value = []
})
</script>

<style lang="scss">
.matching-status-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  > .title {
    font-size: 18px;
    font-weight: 700;
  }
  > .desc {
    font-size: 14px;
    font-weight: 500;
  }
  .matching-banner {
    display: flex;
    background-color: #f4f4f4;
    padding: 20px 15px;
    border-radius: 10px;
    width: 100%;
    margin-top: 10px;

    .info-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 50%;
      gap: 5px;
      .title {
        font-size: 14px;
        font-weight: 700;
      }
      .desc {
        font-size: 12px;
        font-weight: 400;
      }
    }

    .profile-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 50%;
      .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        .mbti {
          font-size: 14px;
          font-weight: 700;
          color: $point;
        }
        .profile-img {
          width: 70px;
          border-radius: 15px;
          border: 2px solid $point;
        }
      }
    }
  }
  .no-data {
    display: flex;
    flex-direction: column;

    .main-text {
      display: block;
      font-size: 18px;
      font-weight: 700;
    }

    .sub-text {
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
