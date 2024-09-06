import { defineStore } from 'pinia';
import { ref } from 'vue';

import { AuthPhoneRepository } from "@/infrastructure/repositories/AuthPhoneRepository.js";
import { eventStore } from '@/presentation/stores/eventStore.js';
import { signupStore } from '@/presentation/stores/signupStore.js';

const authPhoneRepository = new AuthPhoneRepository();
const store_Event = eventStore();

export const phoneAuthStore = defineStore('phoneAuth', () => {
	const phoneNumber = ref("");
	
	const authBtnReady = ref(false);
	const fetchAuthNumber = async () => {
		const store_Signup = signupStore();
		
		const phone = phoneNumber.value.replace(/[^0-9]/g, '');
		const eventId = store_Event.encodedId;
		
		try {
			const data = await authPhoneRepository.getAuthNumber(eventId, phone);
			if ( data.message === '현재 이벤트로 이미 가입된 번호입니다.' ) {
				store_Signup.ModalS_duplicated = true;
			} else {
				store_Signup.ModalS_duplicated = false;
				authBtnText.value = '재전송';
				isAuthSend.value = true;
			}
		} catch (error) {
			console.error('Auth number fetch failed:', error);
		}
	}
	
	const authBtnText = ref("인증번호 요청");
	const isAuthSend = ref(false);
	
	const authNumber = ref("");
	
	// 상태와 메서드를 return 해야 컴포넌트에서 사용할 수 있습니다.
	return {
		phoneNumber,
		
		authBtnReady,
		
		fetchAuthNumber,
		
		authBtnText,
		isAuthSend,
		
		authNumber,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'phoneNumber',
		]
	}
});