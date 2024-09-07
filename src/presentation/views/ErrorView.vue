<template>
  <div class="Frame">
    <img class="imageContainer" src="/images/404_error.png" alt="error" />
    <p v-html="'페이지에 접근할 수 없습니다.<br> QR코드를 통해 접속해주세요'"></p>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.Frame {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 150px 0px;
  gap: 50px;

  height: 100vh;
  p {
    font-weight: $textS_weight;
    font-size: $textM_size;
    text-align: center;

    color: $dark;
  }
}
.imageContainer {
  width: 300px;
  height: 215px;
}
/* 데스크톱에 적용할 스타일 */
@media only screen and (min-width: 601px) {
  .Frame {
    justify-content: center;
  }
}
</style>
