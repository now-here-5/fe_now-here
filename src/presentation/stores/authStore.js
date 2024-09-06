import { defineStore } from 'pinia';
import { ref } from 'vue';

export const authStore = defineStore('auth', () => {
	const token = ref(''); // 초기 토큰 값을 비워둡니다.
	
	return {
		token,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			`token`,
		]
	}
});