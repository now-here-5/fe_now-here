<template>
  <div class="timer-header">
    <p class="timer-title"><strong>건국대학교</strong>에서 짝을 만날 시간</p>
    <div class="timer">
      <div class="time-segment">
        <span class="time">{{ formatNumber(days) }}</span>
        <span class="label">일</span>
      </div>
      <span class="separator">:</span>
      <div class="time-segment">
        <span class="time">{{ formatNumber(hours) }}</span>
        <span class="label">시</span>
      </div>
      <span class="separator">:</span>
      <div class="time-segment">
        <span class="time">{{ formatNumber(minutes) }}</span>
        <span class="label">분</span>
      </div>
      <span class="separator">:</span>
      <div class="time-segment">
        <span class="time">{{ formatNumber(seconds) }}</span>
        <span class="label">초</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  endsAt: {
    type: String,
    required: true
  }
})

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let intervalId

// 두 자리 숫자로 포맷팅하는 함수
const formatNumber = (num) => {
  return num.toString().padStart(2, '0')
}

// 남은 시간을 계산하는 함수
const calculateRemainingTime = () => {
  const now = new Date()
  const end = new Date(props.endsAt)
  const diff = end - now

  if (diff <= 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    clearInterval(intervalId) // 타이머 중지
    return
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

// 컴포넌트가 마운트될 때 타이머 시작
onMounted(() => {
  calculateRemainingTime() // 초기 계산
  intervalId = setInterval(calculateRemainingTime, 1000) // 1초마다 계산
})

// 컴포넌트가 언마운트될 때 타이머 중지
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style lang="scss">
.timer-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: $point;
  border-radius: 10px;
  box-shadow: 0px 2px 3px 0px #0000004d;
  box-shadow: 0px 6px 10px 4px #00000026;

  .timer-title {
    font-size: 14px;
    margin-bottom: 3px;
    color: $white;
    strong {
      font-weight: bold;
    }
  }

  .timer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 20px;
    font-family: 'Arial', sans-serif;
    color: $white;

    .time-segment {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 8px;

      .time {
        font-weight: bold;
      }

      .label {
        font-size: 8px;
        margin-top: 2px;
        color: $white;
      }
    }

    .separator {
      font-size: 20px;
      margin: 0 8px;
    }
  }
}
</style>
