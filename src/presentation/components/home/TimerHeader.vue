<template>
  <div class="timer-header">
    <p class="timer-title"><strong>건국대학교</strong>에서 짝을 만날 시간</p>
    <div class="timer">
      <div class="time-segment">
        <span class="time">01</span>
        <span class="label">일</span>
      </div>
      <span class="separator">:</span>
      <div class="time-segment">
        <span class="time">14</span>
        <span class="label">시</span>
      </div>
      <span class="separator">:</span>
      <div class="time-segment">
        <span class="time">32</span>
        <span class="label">분</span>
      </div>
      <span class="separator">:</span>
      <div class="time-segment">
        <span class="time">11</span>
        <span class="label">초</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.timer-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: $point;
  border-radius: 10px;
  box-shadow: 0px 1px 3px 1px #00000026;

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
