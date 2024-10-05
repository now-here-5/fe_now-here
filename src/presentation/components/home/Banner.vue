<template>
  <div class="matching-banner">
    <img
      class="img"
      src="/images/iceCream.png"
      alt="img"
    />
    <div class="info-wrapper">
      <span class="title">
        매칭만 되면  <br />
        자동으로 응모!
      </span>
      <span class="desc">10명에게 파인트를 쏩니다!</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.matching-banner {
  position: relative;
  display: flex;
  align-items: center;
  background-color: $white;
  border-radius: 10px;
  border: 2px solid $light_gray;
  width: 100%;
  height: 100px;
  margin-top: 30px;
  overflow: hidden;

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  .info-wrapper {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    gap: 5px;
    padding: 15px;
    .title {
      text-align: left;
      font-size: $textMS_size;
      font-weight: $textB_weight;
    }
    .desc {
      font-size: $textS_size;
      font-weight: $textS_weight;
    }
  }
}
</style>
