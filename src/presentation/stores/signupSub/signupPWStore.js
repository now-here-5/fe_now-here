import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSignupPWStore = defineStore('password', () => {
	const password = ref("");
	const passwordConfirm = ref("");
	const alertMessage = ref(false);
	
	const $reset = () => {
		password.value = "";
		passwordConfirm.value = "";
	};
	
	return {
		password,
		passwordConfirm,
		alertMessage,
		$reset
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