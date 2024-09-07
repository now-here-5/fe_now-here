<template>
  <div class="textContainer">
    <div class="locatnion">
      <p>Now, Here in "{{ location }}"</p>
    </div>
    <div class="title_mention">
      <p1>{{ title }}</p1>
      <p v-html="mention" v-if="mention"></p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  location: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  mention: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.textContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}
.locatnion {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 5px 0px;
  gap: 10px;

  border-bottom: 2px solid $point;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $point;
  }
}
.title_mention {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  p1 {
    font-size: $textXXL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  p {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $dark;
  }
}
</style>
