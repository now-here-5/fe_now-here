<template>
  <NameComponent :store="store_ProfileSignup" />
  <BirthComponent :store="store_ProfileSignup" />
  <SexComponent :store="store_ProfileSignup" />
  <MBTIComponent :store="store_ProfileSignup" />
  <SelfComponent :store="store_ProfileSignup" />
</template>

<script setup>
import NameComponent from "@/presentation/components/inputComponent/NameComponent.vue";
import BirthComponent from "@/presentation/components/inputComponent/BirthComponent.vue";
import SexComponent from "@/presentation/components/inputComponent/SexComponent.vue";
import MBTIComponent from "@/presentation/components/inputComponent/MBTIComponent.vue";
import SelfComponent from "@/presentation/components/inputComponent/SelfComponent.vue";

import { signupStore } from "@/presentation/stores/SignupStore.js";
import { profileSignupStore } from "@/presentation/stores/signupSub/profileSignupStore.js";

const store_Signup = signupStore();
const store_ProfileSignup = profileSignupStore();
store_Signup.signupCompleted.proile = false;
store_Signup.signupStep = 2;
store_ProfileSignup.isDuplicate = null;

</script>

<style scoped lang="scss">
</style>