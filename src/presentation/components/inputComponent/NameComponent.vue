<template>
  <div class="nameComponent">
    <p>닉네임</p>
    <div class="input_btn_text">
      <div class="input_btn">
        <input
          class="nameInput"
          type="text"
          placeholder="2자리 이상 8자리 이하 입력"
          v-model="name"
          @input="formName"
          maxlength="8"
        />
        <div
          class="duplicateBtn"
          :class="{ filled: duplicateBtn }"
          :disabled="!duplicateBtn"
          @click="checkDuplicate"
        >
          <p>중복 확인</p>
        </div>
      </div>
      <p
        :class="{
          success: store.isDuplicate === false,
          error: store.isDuplicate === true,
          warning: store.isDuplicate === null
        }"
        v-if="store.alertMessageVisible"
      >
        {{ store.alertMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// 부모로부터 store를 props로 받습니다.
const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})

// 로컬 상태를 store에서 받아옵니다.
const name = ref(props.store.name)
const duplicateBtn = ref(false)

// watch를 사용하여 name을 store와 동기화합니다.
watch(name, (newName) => {
  props.store.name = newName
})

// 이름 형식 처리 함수
const formName = () => {
  let formedName = name.value.replace(/[^a-zA-Z가-힣0-9\s]/g, '')
  if (formedName.length > 8) {
    formedName = formedName.slice(0, 8)
  }
  name.value = formedName

  // 이름이 비어 있으면 중복 확인 메시지를 초기화하고, 더 이상 처리하지 않음
  if (!name.value) {
    props.store.alertMessage = ''
    props.store.alertMessageVisible = false
    duplicateBtn.value = false
    return
  }

  // store에 name 값을 업데이트하여 반응성을 유지
  props.store.name = name.value

  // 이름이 변경될 때 중복 확인 메시지를 초기 상태로 되돌림
  props.store.isDuplicate = null
  props.store.alertMessage = props.store.alertMessageInventory[0]
  props.store.alertMessageVisible = true

  duplicateBtn.value = formedName.length >= 2 && formedName.length <= 8
}

// 닉네임 중복 확인 함수
const checkDuplicate = () => {
  props.store.checkDuplicate()
}

onMounted(() => {
  formName()
})
</script>

<style scoped lang="scss">
.nameComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.input_btn_text {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
  .success {
    color: $green; /* 사용 가능한 닉네임일 때 */
  }
  .error {
    color: $red; /* 닉네임 중복 시 */
  }
  .warning {
    color: $red; /* 닉네임 중복 시 */
  }
}
.input_btn {
  /* Auto layout */
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
  padding: 8px 0px;

  flex: 1;
  height: 48px;

  border: none;
  border-bottom: 1px solid $dark;
  border-radius: 0px;

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
  p {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.duplicateBtn.filled {
  background: $point;
  cursor: pointer;
  p {
    color: $white; /* 입력된 숫자의 색상 */
  }
}
</style>
