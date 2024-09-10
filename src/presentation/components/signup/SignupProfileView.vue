<template>
  <NameComponent :store="profileSignupStore" />
  <BirthComponent :store="profileSignupStore" />
  <SexComponent :store="profileSignupStore" />
  <MBTIComponent :store="profileSignupStore" />
  <SelfComponent :store="profileSignupStore" />
</template>

<script setup>
import NameComponent from "@/presentation/components/inputComponent/NameComponent.vue";
import BirthComponent from "@/presentation/components/inputComponent/BirthComponent.vue";
import SexComponent from "@/presentation/components/inputComponent/SexComponent.vue";
import MBTIComponent from "@/presentation/components/inputComponent/MBTIComponent.vue";
import SelfComponent from "@/presentation/components/inputComponent/SelfComponent.vue";
import { useSignupStore } from "@/presentation/stores/signupStore.js";
import { useProfileSignupStore } from "@/presentation/stores/signupSub/profileSignupStore.js";

const signupStore = useSignupStore();
const profileSignupStore = useProfileSignupStore();
signupStore.signupCompleted.proile = false;
signupStore.signupStep = 2;
profileSignupStore.isDuplicate = null;

</script>

<style scoped lang="scss">
</style>