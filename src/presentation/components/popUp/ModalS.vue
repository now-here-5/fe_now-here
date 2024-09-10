<template>
  <div v-if="isVisible" class="overlay">
    <div class="modalS">
      <div class="body">
        <div class="contentContainer">
          <div v-if="imageSrc" class="imgContainer">
            <img class="modalImg" :src="imageSrc" alt="modalImg" />
          </div>
          <div class="titleContainer">
            <span v-html="title"></span>
          </div>
          <div class="detailContainer">
            <span v-html="message"></span>
          </div>
        </div>
      </div>
      <div class="btn" @click="handleClick">
        <span>{{ buttonText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isVisible: Boolean,
  title: String,
  message: String,
  buttonText: String,
  imageSrc: String
})

const emit = defineEmits(['close'])

const handleClick = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.overlay {
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
.modalS {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 205px;

  background: $white;
  border-radius: 12px;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 12px;
  width: 100%;
}
.contentContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 12px;
}
.imgContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 17px 0 0;
  width: 100%;
}
.modalImg {
  width: 150px;
  height: 150px;
  border: 3px solid $dark;
  border-radius: 8px;
}
.titleContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 17px 0 0;
  width: 100%;
  span {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $dark;
    text-align: center;
  }
}
.detailContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 205px;
  min-height: 65px;
  border-bottom: 1px solid $dark;
  span {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $dark;
    text-align: center;
  }
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 12px 12px;
  width: 100%;
  span {
    font-size: $textMS_size;
    font-weight: $textB_weight;
    color: $dark;
    cursor: pointer;
  }
}
</style>
