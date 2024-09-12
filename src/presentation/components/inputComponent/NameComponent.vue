<template>
  <div class="nameComponent">
    <span>닉네임</span>
    <div class="inputBtnAlert">
      <div class="inputBtn">
        <input
          class="nameInput"
          type="text"
          placeholder="2자리 이상 8자리 이하 입력"
          v-model="props.store.name"
          @input="formName"
          maxlength="8"
        />
        <div
          class="duplicateBtn"
          :class="{ filled: duplicateBtn }"
          @click="checkDuplicate"
        >
          <span>중복 확인</span>
        </div>
      </div>
      <span
        :class="{
          success: store.isDuplicate === false,
          error: store.isDuplicate === true,
        }"
        v-if="store.alertMessageVisible"
      >
        {{ store.alertMessage }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})
const duplicateBtn = ref(false)

const formName = () => {
  props.store.name = (props.store.name || '').replace(/[^a-zA-Z가-힣0-9\s]/g, '');
  if (props.store.name.length > 8) {
    props.store.name = props.store.name.slice(0, 8)
  }
  if (!props.store.name) {
    props.store.alertMessageVisible = false
    props.store.alertMessage = ''
    duplicateBtn.value = false
    return
  }
  props.store.isDuplicate = null
  props.store.alertMessageVisible = true
  props.store.alertMessage = props.store.alertMessageInventory[0]
  duplicateBtn.value = props.store.name.length >= 2 && props.store.name.length <= 8
  if (props.store.originalData && props.store.name === props.store.originalData.name) {
    props.store.alertMessageVisible = false;
    props.store.alertMessage = '';
    duplicateBtn.value = false;
  }
}
const checkDuplicate = () => {
  if (!duplicateBtn.value) return
  props.store.checkDuplicate()
}
onMounted(() => {
  formName()
})
</script>

<style scoped lang="scss">
.nameComponent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0 0;
  gap: 10px;
  width: 100%;
  span {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.inputBtnAlert {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  span {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
  .success {
    color: $green;
  }
  .error {
    color: $red;
  }
  .warning {
    color: $red;
  }
}
.inputBtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.nameInput {
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
.duplicateBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 5px;
  width: 90px;
  height: 45px;
  background: $middle_gray;
  border-radius: 8px;
  span {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.duplicateBtn.filled {
  background: $point;
  cursor: pointer;
  span {
    color: $white;
  }
}
</style>
