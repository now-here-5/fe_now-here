<template>
  <div class="direct-reivew-container">
    <span class="title">의견 남기기</span>
    <span class="desc">더 좋은 서비스를 만들기 위해, 많은 의견을 남겨주세요!</span>
    <div class="input-container">
      <div class="input-background">
        <input type="text" placeholder="내용을 작성해 주세요" class="input-field" />
        <button class="submit-button">
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
    font-size: 14px;
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
    background-color: #f4f4f4;
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
        font-size: 14px;
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
