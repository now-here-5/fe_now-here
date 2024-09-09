import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { formPhoneNumber, formPassword, cleanPhoneNumber } from '@/core/usecases/FormNumber.js';

import { LoginRepository } from "@/infrastructure/repositories/LoginRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { useAuthStore } from '@/presentation/stores/authStore.js';

const loginRepository = new LoginRepository();
const eventStore = useEventStore();
const authStore = useAuthStore();

export const useLoginStore = defineStore('login', () => {
	const router = useRouter();
	
	const phone = ref('');
	const password = ref('');
	const alertMessage = ref('');
	const alertMessageInventory = ref([
		'휴대폰 번호를 입력해 주세요.',
		'비밀번호를 입력해 주세요.',
		'휴대폰 번호와 비밀번호를 입력해 주세요',
		`휴대폰 번호 또는 비밀번호가 잘못되었습니다.<br>확인 후 다시 입력해 주세요.`,
	]);
	
	const formatPhone = (phoneNumber) => {
		return formPhoneNumber(phoneNumber);  // 포맷팅 후 값을 반환
	}
	const formatPassword = (passwordNumber) => {
		return formPassword(passwordNumber);  // 포맷팅 후 값을 반환
	};
	
	const login = async () => {
		if (!phone.value && password.value) {
			alertMessage.value = alertMessageInventory.value[0];
			return;
		}
		if (phone.value && !password.value) {
			alertMessage.value = alertMessageInventory.value[1];
			return;
		}
		if (!phone.value && !password.value) {
			alertMessage.value = alertMessageInventory.value[2];
			return;
		}
		alertMessage.value  = '';
		const cleaningPhone = cleanPhoneNumber(phone.value);
		// 전화번호에서 하이픈(-)을 제거하여 숫자만 남김
		const loginData = {
			phone: cleaningPhone,
			password: password.value,
		};
		try {
			const response = await loginRepository.postLogin(eventStore.encodedId, loginData);
      if (response.message !== "로그인에 실패했습니다.") {
	      authStore.token = response.data.token
	      router.push({ name: 'home' });
      } else {
	      alertMessage.value = alertMessageInventory.value[3];
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
	}
	
	return {
		phone,
		password,
		
		alertMessage,
		
		formatPhone,
		formatPassword,
		
		login,
	};
}, {
	persist: {
		enabled: true,
		paths: [
		]
	}
});