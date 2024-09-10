<template>
  <div class="card_L">
    <div class="infoContainer">
      <div class="scoreContainer">
        <p class="score">{{ mbtiScore }}</p>
        <p class="text">케미 점수</p>
      </div>
      <div class="detailContainer">
        <div class="mbtiContainer">
          <p>ENTJ</p>
        </div>
        <div class="nameContainer">
          <p class="name">{{ memberInfo.nickname }}</p>
          <p class="age-gender">{{ age }}세, {{ gender }}</p>
        </div>
      </div>
      <div class="imgContainer">
        <img class="MBTIimg" :src="avatarImgUrl" />
      </div>
    </div>
    <div class="contentContainer">
      <div class="textContainer">
        <p>{{ memberInfo?.description }}</p>
      </div>
    </div>
  </div>

  <div v-if="memberInfo.phoneNumber" class="phoneContainer">
    <p>{{ formatPhoneNumber(memberInfo?.phoneNumber) }}</p>
  </div>
</template>

<script setup>
import { useMatchingStore } from '../stores/matchingStore'
import { computed } from 'vue'

const props = defineProps({
  memberInfo: {
    type: Object,
    required: true
  }
})

const matchingStore = useMatchingStore()

const memberInfo = computed(() => {
  const gender = matchingStore.getRecommendedMemberGender(props.memberInfo)
  const age = matchingStore.getRecommendedMemberAge(props.memberInfo)
  const mbtiScore = matchingStore.getRecommendedMemberMbtiScore(props.memberInfo)
  const avatarImgUrl = matchingStore.getRecommendedMemberAvatarImgUrl(props.memberInfo)
  const description = props.memberInfo.description
  const memberId = props.memberInfo.memberId
  const phoneNumber = props.memberInfo.phoneNumber

  return { gender, age, mbtiScore, avatarImgUrl, description, memberId, phoneNumber }
})

const gender = computed(() => memberInfo.value.gender)
const age = computed(() => memberInfo.value.age)
const mbtiScore = computed(() => memberInfo.value.mbtiScore)
const avatarImgUrl = computed(() => memberInfo.value.avatarImgUrl)

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '-'
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}
</script>

<style lang="scss">
.card_L {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 250px;

  background: $light_gray;
  box-shadow:
    0px 1px 2px rgba($dark, 0.3),
    0px 2px 6px 2px rgba($dark, 0.15);
  border-radius: 13px 13px 13px 13px;
  .infoContainer {
    position: relative;

    width: 250px;
    height: 250px;
  }
  .scoreContainer {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    width: 80px;
    height: 64px;
    left: 170px;
    z-index: 10; /* imgContainer보다 위에 위치하도록 설정 */

    background: $point;
    box-shadow:
      0px 8px 12px 6px rgba($dark, 0.15),
      0px 4px 4px rgba($dark, 0.3);
    border-radius: 0px 12px 0px 7px;

    .score {
      font-size: $textXXL_size;
      font-weight: $textB_weight;
      color: $white;
      text-align: center;

      line-height: 30pt;
    }

    .text {
      font-size: $textMS_size;
      font-weight: $textB_weight;
      color: $white;
      text-align: center;

      line-height: 9pt;
    }
  }

  .detailContainer {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 10px;
    gap: 5px;

    position: absolute;
    width: 100%;
    height: 50%;
    top: 125px;

    background: linear-gradient(180deg, rgba($white, 0) 0%, #2e2e2e 100%);
    z-index: 5; /* imgContainer보다 위에 위치하도록 설정 */
  }
  .mbtiContainer {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 8px;

    background: $white;
    box-shadow: 0px 4px 4px rgba($dark, 0.25);
    border-radius: 5px;
    p {
      font-size: $textM_size;
      font-weight: $textB_weight;
      color: #1c1c1c;
    }
  }
  .nameContainer {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 2px;

    width: 100%;
    .name {
      font-size: $textM_size;
      font-weight: $textB_weight;
      color: $white;
      align-self: stretch;
      flex-grow: 0;
    }

    .age-gender {
      font-size: $textS_size;
      font-weight: $textS_weight;
      color: $white;
      align-self: stretch;
      flex-grow: 0;
    }
  }

  .imgContainer {
    display: flex;
    flex-direction: row;
    align-items: center;

    position: absolute;
    width: 250px;
    height: 250px;
    left: 0px;
    top: 0px;
    z-index: 1; /* 다른 요소들보다 아래에 위치 */
  }
  .MBTIimg {
    width: 250px;
    height: 250px;

    border-radius: 12px;
  }

  .contentContainer {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 100%;

    border-radius: 8px;
  }
  .textContainer {
    /* Auto layout */
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px 12px;

    height: 64px;

    background: $white;
    box-shadow:
      0px 1px 2px rgba($dark, 0.3),
      0px 1px 3px 1px rgba($dark, 0.15);
    border-radius: 0px 0px 10px 10px;

    p {
      font-size: $textS_size;
      font-weight: $textB_weight;
      color: $dark;

      display: flex;
      align-items: center;

      align-self: stretch;
      flex-grow: 1;
    }
  }
}

.phoneContainer {
  width: 100%;
  height: 50px;
  background-color: $point;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: -30px;
  font-size: $textXL_size;
  font-weight: $textB_weight;
}
</style>
