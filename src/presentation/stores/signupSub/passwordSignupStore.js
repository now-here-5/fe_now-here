import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePasswordSignupStore = defineStore('password', () => {
	const password = ref("");
	const passwordConfirm = ref("");
	const alertMessage = ref(false);
	
	// 상태와 메서드를 return 해야 컴포넌트에서 사용할 수 있습니다.
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