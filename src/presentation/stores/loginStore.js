import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { formPhoneNumber, formID, formPassword, cleanPhoneNumber } from '@/composition/FormNumber.js';
import { MemberAuthRepository } from "@/infrastructure/repositories/MemberAuthRepository.js";
import { useAuthStore } from '@/presentation/stores/authStore.js';
import { useEventStore } from '@/presentation/stores/eventStore.js';

const memberAuthRepository = new MemberAuthRepository();

export const useLoginStore = defineStore('login', () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const eventStore = useEventStore();
	
	const ID = ref('');
	const password = ref('');
	const alertMessage = ref('');
	const alertMessageInventory = ref([
		'아이디를 입력해 주세요.',
		'비밀번호를 입력해 주세요.',
		'아이디와 비밀번호를 입력해 주세요',
		`아이디 또는 비밀번호가 잘못되었습니다.<br>확인 후 다시 입력해 주세요.`,
	]);
	
	const formatID = (id) => {
		return formID(id);
	}
	const formatPhone = (phoneNumber) => {
		return formPhoneNumber(phoneNumber);
	}
	const formatPassword = (passwordNumber) => {
		return formPassword(passwordNumber);
	};
	
	const login = async () => {
		if (!ID.value && password.value) {
			alertMessage.value = alertMessageInventory.value[0];
			return;
		}
		if (ID.value && !password.value) {
			alertMessage.value = alertMessageInventory.value[1];
			return;
		}
		if (!ID.value && !password.value) {
			alertMessage.value = alertMessageInventory.value[2];
			return;
		}
		alertMessage.value  = '';
		const loginData = {
			accountId: ID.value,
			password: password.value,
		};
		try {
			const response = await memberAuthRepository.postLogin(eventStore.encodedId, loginData);
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
		ID,
		password,
		alertMessage,
		formatID,
		formatPhone,
		formatPassword,
		login,
	};
});