<template>
  <div class="spinner"></div>
</template>

<script setup>
// defineProps({
//   isLoading: {
//     type: Boolean,
//     required: true
//   }
// })
</script>

<style lang="scss">
.spinner {
  border: 2px solid white;
  border-left-color: $point;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
