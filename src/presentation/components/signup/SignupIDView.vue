<template>
  <div class="IDComponent">
    <span>카카오톡 ID</span>
    <div class="inputBtnAlert">
      <div class="inputBtn">
        <input
          class="inputBox"
          type="text"
          placeholder="아이디"
          v-model="signupIDStore.ID"
          @input="handleID"
          maxlength="15"
        />
        <div
          :class="['duplicateBtn', { active: signupIDStore.DuplicateBtn }]"
          @click="signupIDStore.DuplicateBtn && signupIDStore.getIDDuplicate()"
        >
          <span>중복확인</span>
        </div>
      </div>
      <span
        :class="{
          success: signupStore.signupCompleted.ID,
          error: !signupStore.signupCompleted.ID,
         }"
        v-if="signupIDStore.alertMessageVisible"
      >
        {{ signupIDStore.alertMessage }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSignupIDStore } from '@/presentation/stores/signupSub/signupIDStore.js'
import { useSignupStore } from '@/presentation/stores/signupStore.js'

const signupIDStore = useSignupIDStore()
const signupStore = useSignupStore()
signupStore.signupCompleted.auth = false
signupStore.signupStep = 0

const handleID = () => {
  signupIDStore.ID = signupIDStore.ID.replace(/[^a-z0-9]/g, '');
  signupIDStore.DuplicateBtn = signupIDStore.ID.length >= 3 && signupIDStore.ID.length <= 15;
  if (!signupIDStore.ID) {
    signupStore.signupCompleted.ID = false;
    signupIDStore.alertMessageVisible = false
    signupIDStore.alertMessage = ''
    return
  }
  signupStore.signupCompleted.ID = false;
  signupIDStore.alertMessageVisible = true;
  signupIDStore.alertMessage = '중복 여부를 확인해주세요.';
};
onMounted(() => {
  handleID();
});
</script>

<style scoped lang="scss">
.IDComponent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  span {
    font-size: $textM_size;
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
}
.inputBtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.inputBox {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 10px;
  flex: 1;
  height: 44px;
  border: 1px solid $dark;
  border-radius: 5px;
}
.duplicateBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 5px;
  gap: 10px;
  width: 90px;
  background: $middle_gray;
  border-radius: 8px;
  cursor: not-allowed;
  span {
    font-size: $textS_size;
    font-weight: $textB_weight;
    color: $gray;
  }
  &.active {
    background: $point;
    cursor: pointer;
    span {
      color: $white;
    }
  }
}
</style>
