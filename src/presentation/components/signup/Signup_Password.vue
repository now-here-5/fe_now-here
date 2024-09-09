<template>
  <PasswordComponent v-model="passwordInput" label="비밀번호" />
  <PasswordComponent
    v-model="passwordConfirmInput"
    label="비밀번호 확인"
    :errorMessage="store_Password.alertMessage ? '비밀번호가 일치하지 않습니다.' : ''"
  />
</template>

<script setup>
import PasswordComponent from '@/presentation/components/signup/PasswordComponent.vue'
import { ref, watch, computed } from 'vue'
import { signupStore } from '@/presentation/stores/signupStore.js'
import { passwordStore } from '@/presentation/stores/signupSub/passwordStore.js'

const store_Signup = signupStore()
const store_Password = passwordStore()
store_Signup.signupCompleted.password = false
store_Signup.signupStep = 1

const passwordInput = ref(store_Password.password || '')
const passwordConfirmInput = ref(store_Password.passwordConfirm || '')

const isPasswordValid = computed(() => {
  return passwordInput.value.length === 4 && passwordConfirmInput.value.length === 4
})

// watch를 사용하여 isPasswordValid 변경 시 store의 상태를 업데이트
watch(
  [passwordInput, passwordConfirmInput],
  () => {
    store_Password.password = passwordInput.value
    store_Password.passwordConfirm = passwordConfirmInput.value

    store_Signup.signupCompleted.password = isPasswordValid.value
  },
  { immediate: true }
) // immediate: true 추가하여 컴포넌트가 마운트될 때도 실행되도록 함
</script>

<style scoped lang="scss" />
<style />
