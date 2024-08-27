<template>
  <div class="today-card-container">
    <span class="title">오늘의 카드</span>
    <span class="desc">카드를 누르면 더 많은 정보를 확인할 수 있어요!</span>
    <div class="cards-wrapper">
      <TodayCardItem />
      <TodayCardItem />
    </div>
  </div>
</template>

<script setup>
import TodayCardItem from '@/presentation/components/home/TodayCardItem.vue'
</script>

<style lang="scss">
.today-card-container {
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
  .cards-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 15px;
  }
}
</style>
