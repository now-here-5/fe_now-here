<template>
  <NameComponent :store="signupProfileStore" />
  <BirthComponent :store="signupProfileStore" />
  <SexComponent :store="signupProfileStore" />
  <MBTIComponent :store="signupProfileStore" />
  <SelfComponent :store="signupProfileStore" />
</template>

<script setup>
import NameComponent from "@/presentation/components/inputComponent/NameComponent.vue";
import BirthComponent from "@/presentation/components/inputComponent/BirthComponent.vue";
import SexComponent from "@/presentation/components/inputComponent/SexComponent.vue";
import MBTIComponent from "@/presentation/components/inputComponent/MBTIComponent.vue";
import SelfComponent from "@/presentation/components/inputComponent/SelfComponent.vue";
import { useSignupStore } from "@/presentation/stores/signupStore.js";
import { useSignupProfile } from "@/presentation/stores/signupSub/signupProfileStore.js";

const signupStore = useSignupStore();
const signupProfileStore = useSignupProfile();
signupStore.signupCompleted.proile = false;
signupStore.signupStep = 2;
signupProfileStore.isDuplicate = null;

</script>

<style scoped lang="scss">
</style>