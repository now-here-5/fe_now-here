<template>
  <div class="matching-status-container">
    <span class="title">매칭 현황</span>
    <span class="desc">다른 유저들은 어떤 인연을 만나고 있을까요?</span>
    <div class="matching-banner">
      <div class="info-wrapper">
        <span class="title"
          >장마소년님과 <br />
          우산님이 <br />
          매칭되었어요!</span
        >
        <span class="desc">장마소년님 우산님 매칭되었어요!</span>
      </div>
      <div class="image-wrapper">
        <img src="@/assets/images/ENTJ.png" alt="ENTJ" />
        <img src="@/assets/images/ENTJ.png" alt="ENTJ" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.matching-status-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > .title {
    font-size: 18px;
    font-weight: 700;
  }
  > .desc {
    font-size: 14px;
    font-weight: 500;
  }
  .matching-banner {
    display: flex;
    background-color: #f4f4f4;
    padding: 20px 15px;
    border-radius: 10px;
    width: 100%;
    margin-top: 10px;

    .info-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 50%;
      gap: 5px;
      .title {
        font-size: 14px;
        font-weight: 700;
      }
      .desc {
        font-size: 10px;
        font-weight: 400;
      }
    }

    .image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 50%;
    }
  }
}
</style>
