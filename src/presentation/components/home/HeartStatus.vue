<template>
  <div class="heart-status-container">
    <span class="title">하트 내역</span>
    <span class="desc">받은 하트와 보낸 하트를 한 눈에 볼 수 있어요!</span>
    <div class="heart-item-wrapper">
      <div class="heart-item">
        <span class="heart-text">보낸 하트</span>
        <span class="heart-count">5</span>
        <span class="new-badge">N</span>
      </div>
      <div class="heart-item">
        <span class="heart-text">받은 하트</span>
        <span class="heart-count">5</span>
        <span class="new-badge">N</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.heart-status-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .desc {
    font-size: 14px;
    font-weight: 500;
  }

  .heart-item-wrapper {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-top: 10px;

    .heart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px 0;
      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      .heart-text {
        font-size: 15px;
        font-weight: bold;
      }

      .heart-count {
        color: red;
        font-size: 15px;
        font-weight: bold;
        margin-left: 10px;
        flex-grow: 1;
      }

      .new-badge {
        background-color: black;
        color: white;
        font-size: 14px;
        font-weight: bold;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
    }
  }
}
</style>
