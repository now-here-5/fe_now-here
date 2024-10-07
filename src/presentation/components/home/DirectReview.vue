<template>
  <div class="direct-reivew-container">
    <span class="title">의견 남기기</span>
    <span class="desc">서비스 개선을 위해 소중한 의견을 남겨주세요!<br/>상대방에게 메세지 알림이 가는 '스페셜 하트' 5개를 드립니다.</span>
    <div class="input-container">
      <div class="input-background">
        <input
          type="text"
          placeholder="내용을 작성해 주세요"
          class="input-field"
          @keyup.enter="sendDirectReview"
          v-model="reviewValue"
        />
        <button class="submit-button" @click="sendDirectReview">
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInteractionStore } from '@/presentation/stores/interactionStore'
import { ref } from 'vue'

const interactionStore = useInteractionStore()
const reviewValue = ref('')
const isLoading = ref(false)

const sendDirectReview = async () => {
  if (isLoading.value) return

  if (!reviewValue.value.trim()) {
    return
  }

  const body = {
    content: reviewValue.value,
    field: null,
  }

  isLoading.value = true
  const res = await interactionStore.postFeedback(body)
  if (res.status === 200) alert('소중한 의견을 주셔서 감사합니다!')
  else alert('피드백 전송 과정에서 오류가 발생했습니다.')

  isLoading.value = false
  reviewValue.value = ''
}
</script>

<style lang="scss">
.direct-reivew-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  .title {
    font-size: 18px;
    font-weight: 700;
  }

  .desc {
    font-size: 12px;
    font-weight: 500;
  }

  .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 10px;
    border-radius: 15px;
    background-color: $light_gray;
    margin-top: 10px;

    .input-background {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 15px;
      width: 100%;
      height: 42px;
      padding: 0 10px;

      .input-field {
        flex: 1; // 입력 필드가 남은 공간을 모두 차지하도록

        border: none;
        outline: none; // 포커스 시 외곽선 제거
        background: none; // 기본 배경 제거
        font-size: $textMS_size;
        color: #888; // 텍스트 색상
      }

      .submit-button {
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 50%; // 버튼을 둥글게
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $point; // 버튼 배경색
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); // 버튼 그림자

        span {
          font-size: 16px;
          color: $white; // 화살표 색상
        }
      }
    }
  }
}
</style>
