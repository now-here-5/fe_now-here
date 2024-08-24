<template>
  <div class="today-card-container">
    <span class="title">오늘의 카드</span>
    <span class="desc">카드를 누르면 더 많은 정보를 확인할 수 있어요!</span>
    <div class="cards-wrapper">
      <div class="today-card">카드1</div>
      <div class="today-card">카드2</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.today-card-container {
  display: flex;
  flex-direction: column;

  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .desc {
    font-size: 14px;
    font-weight: 500;
  }
  .cards-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 15px;

    .today-card {
      display: flex;
      flex-direction: column;
      width: 150px;
      height: 260px;
      background-color: black;
      border-radius: 13px;
    }
  }
}
</style>
