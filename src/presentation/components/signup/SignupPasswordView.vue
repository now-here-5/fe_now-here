<template>
  <PasswordComponent
    v-model="passwordInput"
    label="비밀번호"
  />
  <PasswordComponent
    v-model="passwordConfirmInput"
    label="비밀번호 확인"
    :errorMessage="passwordSignupStore.alertMessage ? '비밀번호가 일치하지 않습니다.' : ''"
  />
</template>

<script setup>
import PasswordComponent from "@/presentation/components/signup/PasswordComponent.vue";
import { ref, watch, computed } from 'vue';
import { useSignupStore } from "@/presentation/stores/signupStore.js";
import { useSignupPWStore } from "@/presentation/stores/signupSub/signupPWStore.js";

const passwordSignupStore = useSignupPWStore();
const signupStore = useSignupStore();
signupStore.signupCompleted.password = false;
signupStore.signupStep = 1;

const passwordInput = ref(passwordSignupStore.password || '');
const passwordConfirmInput = ref(passwordSignupStore.passwordConfirm || '');

const isPasswordValid = computed(() => {
  return (
    passwordInput.value.length === 4 &&
    passwordConfirmInput.value.length === 4
  );
});

watch([passwordInput, passwordConfirmInput], () => {
  passwordSignupStore.password = passwordInput.value;
  passwordSignupStore.passwordConfirm = passwordConfirmInput.value;

  signupStore.signupCompleted.password = isPasswordValid.value;
}, { immediate: true });  // immediate: true 추가하여 컴포넌트가 마운트될 때도 실행되도록 함
</script>

<style scoped lang="scss"/>
<style/>