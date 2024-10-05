<template>
  <PasswordComponent
    v-model="passwordInput"
    label="비밀번호"
  />
  <PasswordComponent
    v-model="passwordConfirmInput"
    label="비밀번호 확인"
    :errorMessage="pwUpdateStore.alertMessage"
  />
</template>

<script setup>
import PasswordComponent from "@/presentation/components/signup/PasswordComponent.vue";
import { ref, watch, computed } from 'vue';
import { usePWUpdateStore } from '@/presentation/stores/pwUpdateStore.js';

const pwUpdateStore = usePWUpdateStore();
pwUpdateStore.step = 1;
pwUpdateStore.stepCompleted.password = false;

const passwordInput = ref(pwUpdateStore.password || '');
const passwordConfirmInput = ref(pwUpdateStore.passwordConfirm || '');

const isPasswordValid = computed(() => {
  return (
    passwordInput.value.length === 4 &&
    passwordConfirmInput.value.length === 4
  );
});
const isPasswordMatch = computed(() => {
  return passwordInput.value === passwordConfirmInput.value;
});

watch([passwordInput, passwordConfirmInput], () => {
  pwUpdateStore.password = passwordInput.value;
  pwUpdateStore.passwordConfirm = passwordConfirmInput.value;
  pwUpdateStore.stepCompleted.password = isPasswordValid.value;
  if (passwordConfirmInput.value.length === 4) {
    pwUpdateStore.alertMessage = isPasswordMatch.value
      ? '비밀번호가 일치합니다.'
      : '비밀번호가 일치하지 않습니다.';
  } else {
    pwUpdateStore.alertMessage = '';
  }
}, { immediate: true });
</script>

<style scoped lang="scss"/>
<style/>