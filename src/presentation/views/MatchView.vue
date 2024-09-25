<template>
  <div class="matching-container">
    <nav class="mathcing-nav-container">
      <router-link to="/match" class="tab">매칭</router-link>
      <router-link to="/match/received-hearts" class="tab">받은 하트</router-link>
      <router-link to="/match/sent-hearts" class="tab">보낸 하트</router-link>
      <router-link to="/match/status" class="tab">매칭 현황</router-link>
    </nav>
    <!-- 매칭 -->
    <main v-if="route.path === '/match'" class="matching-content">
      <div v-if="isLoading" class="loading-wrapper">
        <LoadingSpinner />
      </div>
      <template v-else>
        <template v-if="recommendedMembers.length > 0">
          <div class="info-wrapper">
            <div class="event-info">
              <span class="sub-info">Now Here in</span>
              <span class="main-info">{{ eventStore.eventName }}</span>
            </div>
            <div class="desc-info">
              <span class="main-info">지금 여기, 당신의 인연이 있나요?</span>
              <span class="sub-info">카드를 클릭해 하트를 전달해보세요!</span>
            </div>
          </div>
          <div class="cards-wrapper">
            <TodayCardItem
              :member-info="recommendedMembers[0]"
              :is-flipped="isFlipped"
              :show-desc="true"
              :show-mbti="true"
              :on-custom-click="() => sendHeart(recommendedMembers[0])"
            />
            <TodayCardItem
              :member-info="recommendedMembers[1]"
              :is-flipped="isFlipped"
              :show-desc="true"
              :show-mbti="true"
              :on-custom-click="() => sendHeart(recommendedMembers[1])"
            />
          </div>
          <div class="reroll-button-wrapper">
            <button @click="reroll">다시 뽑기</button>
          </div>
        </template>
        <div v-else class="no-matching-wrapper">
          <span class="title">현재 매칭 가능한 상대가 없어요!</span>
          <span>조금만 기다려주세요!</span>
        </div>
      </template>
    </main>
    <!-- 하위 라우터에서 설정된 컴포넌트들이 여기에 렌더링됨 -->
    <router-view></router-view>
  </div>

  <MatchAgreeModal />
  <FeedbackModal />
  <HeartSendModal v-if="popupStore.modalLVisible.heart" :member-info="selectedMember" />
</template>

<script setup>
import TodayCardItem from '@/presentation/components/home/TodayCardItem.vue'
import MatchAgreeModal from '@/presentation/components/popUp/MatchAgreeModal.vue'
import FeedbackModal from '@/presentation/components/popUp/FeedbackModal.vue'
import HeartSendModal from '../components/popUp/HeartSendModal.vue'

import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { usePopupStore } from '@/presentation/stores/popupStore.js'
import { useMatchingStore } from '../stores/matchingStore'
import { useEventStore } from '@/presentation/stores/eventStore'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const popupStore = usePopupStore() // 스토어 인스턴스를 가져옴
const eventStore = useEventStore()
const matchingStore = useMatchingStore()
const { recommendedMembers } = storeToRefs(matchingStore)

const isLoading = ref(false)
const isFlipped = ref(false)
const selectedMember = ref(null)

const reroll = () => {
  isFlipped.value = !isFlipped.value
  setTimeout(async () => {
    await matchingStore.fetchRecommendedCards()
  }, 1000)
}

const sendHeart = async (member) => {
  selectedMember.value = member
  await matchingStore.getSpecialHeart()
  popupStore.modalLVisible.heart = true
}

const handleRouteChange = (to) => {
  if (to.path === '/match') {
    if (popupStore.matchAgree === false) {
      popupStore.modalLVisible.matchLanding = true
    } else {
      popupStore.fetchFeedbackModal() // 함수 호출
    }
  } else if (to.path === '/match/status') {
    popupStore.fetchFeedbackModal() // 함수 호출
  }
}
onMounted(async () => {
  isLoading.value = true
  handleRouteChange(route) // 첫 마운트 시에 라우트 확인

  await matchingStore.fetchRecommendedCards()
  isLoading.value = false
})
watch(route, (to) => {
  handleRouteChange(to)
})
</script>

<style scoped lang="scss">
.matching-container {
  /* margin-top: 70px; */

  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 500px;
  }

  .no-matching-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80vh;

    .title {
      font-size: $textXXL_size;
      font-weight: $textB_weight;
    }
  }

  .mathcing-nav-container {
    display: flex;
    width: 400px;
    position: fixed;
    top: 60px;
    left: 50%; /* 좌우 중앙으로 이동 */
    transform: translateX(-50%);
    height: 30px;
    justify-content: space-around;
    background-color: white;
    z-index: 100;

    .tab {
      text-decoration: none;
      color: $gray;
      font-size: $textM_size;
      font-weight: $textB_weight;
    }
    .tab.router-link-exact-active {
      font-weight: $textB_weight;
      color: $dark;
    }
  }
  @media (max-width: 767px) {
    .mathcing-nav-container {
      width: 100vw;
    }
  }

  .matching-content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-top: 90px;
    justify-content: space-around;
    .event-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 5px;
      color: $point;
      .sub-info {
        font-size: $textMS_size;
        font-weight: $textS_weight;
      }
      .main-info {
        font-size: $textXXL_size;
        font-weight: $textB_weight;
      }
    }

    .desc-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      .sub-info {
        font-size: $textMS_size;
        font-weight: $textM_weight;
      }
      .main-info {
        font-size: $textL_size;
        font-weight: $textB_weight;
      }
    }

    .cards-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-top: 15px;
    }

    .reroll-button-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;

      button {
        width: 160px;
        height: 60px;
        border-radius: 13px;
        padding: 20px;
        background-color: $point;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: $textL_size;
        font-weight: $textB_weight;
      }
    }
  }
}
</style>
