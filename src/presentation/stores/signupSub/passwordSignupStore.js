import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePasswordSignupStore = defineStore('password', () => {
	const password = ref("");
	const passwordConfirm = ref("");
	const alertMessage = ref(false);
	
	return {
		password,
		passwordConfirm,
		alertMessage,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			`password`,
			`passwordConfirm`,
		]
	}
});