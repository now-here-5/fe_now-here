<template>
  <div class="matching-container">
    <nav class="mathcing-nav-container">
      <router-link to="/match" class="tab">매칭</router-link>
      <router-link to="/match/sent-hearts" class="tab">보낸 하트</router-link>
      <router-link to="/match/received-hearts" class="tab">받은 하트</router-link>
      <router-link to="/match/status" class="tab">매칭 현황</router-link>
    </nav>
    <main class="matching-content">
      <div class="info-wrapper">
        <div class="event-info">
          <span class="sub-info">Now Here in</span>
          <span class="main-info">건국대학교</span>
        </div>
        <div class="desc-info">
          <span class="main-info">지금 여기, 당신의 인연이 있나요?</span>
          <span class="sub-info">카드를 클릭해 하트를 전달해보세요!</span>
        </div>
      </div>
      <div class="cards-wrapper">
        <TodayCardItem :member-info="dummyEntityData" />
        <TodayCardItem :member-info="dummyEntityData" />
      </div>
      <div class="reroll-button-wrapper">
        <button>다시 뽑기</button>
      </div>
    </main>
    <!-- 하위 라우터에서 설정된 컴포넌트들이 여기에 렌더링됨 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { RecommendedMemberEntity } from '@/core/entities/RecommendedMemberEntity'
import TodayCardItem from '@/presentation/components/home/TodayCardItem.vue'

const dummyData = {
  memberId: 1,
  nickname: '인수인수',
  mbti: 'ESTJ',
  birthdate: '1999-12-02',
  gender: 'FEMALE'
}

const dummyEntityData = new RecommendedMemberEntity(dummyData)
</script>

<style scoped lang="scss">
.matching-container {
  /* margin-top: 70px; */

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
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;

    .tab {
      text-decoration: none;
      color: $grey;
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

      .loading-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 230px;
      }
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

/* 모바일 환경을 위한 미디어 쿼리 */
</style>
