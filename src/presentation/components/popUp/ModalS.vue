<template>
  <div v-if="isVisible" class="M_Overlay">
    <div class="modalS">
      <div class="modalS_body">
        <div class="modalS_contentContainer">
          <div v-if="imageSrc" class="modalS_imgContainer">
            <img class="modalS_img" :src="imageSrc" alt="modal image" />
          </div>
          <div class="modalS_titleContainer">
            <p v-html="title"></p>
          </div>
          <div class="modalS_detailContainer">
            <p v-html="message"></p>
          </div>
        </div>
      </div>
      <div class="modalS_btn" @click="handleClick">
        <p>{{ buttonText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  title: String,
  message: String,
  buttonText: String,
  imageSrc: String,
});

const emit = defineEmits(['close']);

const handleClick = () => {
  emit('close');
};
</script>

<style scoped lang="scss">

/* modal 오버레이 */
.M_Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
/* modalS */
.modalS {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 205px;

  background: $white;
  border-radius: 12px;
}
.modalS_body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 12px;

  width: 100%;
}
.modalS_contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  border-radius: 12px;
}
.modalS_imgContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 17px 0px 0px;

  width: 100%;
}
.modalS_img {
  width: 150px;
  height: 150px;

  border: 3px solid $dark;
  border-radius: 8px;
}
.modalS_titleContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 17px 0px 0px;

  width: 100%;
  p {
    font-size: $textM_size;
    font-weight: $Bold_weight;
    color: $dark;
    text-align: center;
  }
}
.modalS_detailContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 205px;
  min-height: 65px;

  border-bottom: 1px solid $dark;
  p {
    font-size: $textS_size;
    font-weight: $Regular_weight;
    color: $dark;
    text-align: center;
  }
}
.modalS_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 12px 12px;

  width: 100%;
  p {
    font-size: $textMS_size;
    font-weight: $Bold_weight;
    color: $dark;
    cursor: pointer;
  }
}
</style>