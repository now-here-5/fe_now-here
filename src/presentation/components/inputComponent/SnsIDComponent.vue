<template>
  <div class="snsIDComponent">
    <div class="titleDesc">
      <span class="title">카카오톡 ID</span>
      <p v-html="Desc" v-if="Desc"></p>
      <span class="desc">매칭 성공 시 입력하신 카카오톡 ID가<br>상대방에게 자동으로 노출됩니다.</span>
    </div>
    <div class="inputSpace">
      <input
        class="IDInput"
        type="text"
        placeholder="kakao"
        v-model="props.store.snsID"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.snsIDComponent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0 0;
  gap: 5px;
  width: 100%;
  span {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.titleDesc {
  display: flex;
  flex-direction: column;
  gap: 5px;
  .title {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  .desc {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
}

.inputSpace {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.IDInput {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 8px 0;
  flex: 1;
  height: 48px;
  border: none;
  border-bottom: 1px solid $dark;
  border-radius: 0;
  outline: none;
  font-size: $textM_size;
  font-weight: $textS_weight;
  color: $dark;
  &::placeholder {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
}
</style>
