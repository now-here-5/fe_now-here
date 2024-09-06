<template>
  <div class="nameComponent">
    <p>닉네임</p>
    <div class="input_btn_text">
      <div class="input_btn">
        <input
            class="nameInput"
            type="text"
            placeholder="2자리 이상 8자리 이하 입력"
            v-model="store_profile.nickname"
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
        'success': isDuplicate === false,
        'error': isDuplicate === true,
        'warning': isDuplicate === null
        }"
        v-if="alertMessageVisible"
      >
        {{ alertMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { profileStore } from '@/presentation/stores/profile.js';
import { onMounted, ref, watch } from "vue";
import { eventStore } from "@/presentation/stores/eventStore.js";
import { NameDuplicateRepository } from "@/infrastructure/repositories/NameDuplicateRepository.js";

const nameDuplicateRepository = new NameDuplicateRepository();
const store_profile = profileStore();  // 스토어 사용

const name = ref(store_profile.nickname);
const duplicateBtn = ref(false);

const isDuplicate = ref(null);

const alertMessageVisible = ref(false);
const alertMessage = ref('');
const alertMessageInventory = [
  "중복 여부를 확인해주세요.",
  "사용 가능한 닉네임입니다.",
  "이미 사용 중인 닉네임입니다.",
];

// watch를 사용하여 name을 store와 동기화합니다.
watch(name, (newName) => {
  store_profile.nickname = newName;
});

const formName = () => {
  let formedName = name.value.replace(/[^a-zA-Z가-힣0-9\s]/g, '');
  if (formedName.length > 8) {
    formedName = formedName.slice(0, 8);
  }
  name.value = formedName;

  // 이름이 비어 있으면 중복 확인 메시지를 초기화하고, 더 이상 처리하지 않음
  if (!name.value) {
    store_profile.alertMessage = '';
    store_profile.alertMessageVisible = false;
    duplicateBtn.value = false;
    return;
  }

  // 이름이 변경될 때 중복 확인 메시지를 초기 상태로 되돌림
  isDuplicate.value = null;
  alertMessage.value = alertMessageInventory[0];
  alertMessageVisible.value = true;

  duplicateBtn.value = formedName.length >= 2 && formedName.length <= 8;
};

const checkDuplicate = async () => {
  const store_Event = eventStore();

  const eventId = store_Event.encodedId;
  const nameTo = store_profile.nickname

  try {
    const data = await nameDuplicateRepository.getNameDuplicate(eventId, nameTo);
    if ( data.message === "사용 가능한 닉네임입니다." ) {
      console.log('사용 가능한 닉네임입니다.');
      alertMessage.value = alertMessageInventory[1];
      isDuplicate.value = false; // 중복 확인 완료
    } else {
      alertMessage.value = alertMessageInventory[2];
      isDuplicate.value = true; // 중복 확인 완료
    }
  } catch (error) {
    console.error('name Duplicate :', error);
  }
}

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
    font-size: $textL_B;
    font-weight: $font_Bold;
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
    font-size: $textS;
    font-weight: $font_Regular;
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
  font-size: $textM;
  font-weight: $font_Regular;
  color: $dark;
  &::placeholder {
    font-size: $textMS;
    font-weight: $font_Regular;
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
    font-size: $textS_B;
    font-weight: $font_Bold;
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