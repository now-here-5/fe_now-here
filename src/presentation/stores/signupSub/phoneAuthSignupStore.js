import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PhoneAuthRepository } from "@/infrastructure/repositories/PhoneAuthRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';

const phoneAuthRepository = new PhoneAuthRepository();

export const usePhoneAuthSignupStore = defineStore('phoneAuth', () => {
	const eventStore = useEventStore();
	const popupStore = usePopupStore();
	
	const phoneNumber = ref("");
	const authNumber = ref("");
	
	const authBtnReady = ref(false);
	const authBtnText = ref("인증번호 요청");
	
	const isAuthSend = ref(false);
	
	const fetchAuthNumber = async () => {
		const phone = phoneNumber.value.replace(/[^0-9]/g, '');
		const eventId = eventStore.encodedId;
		
		try {
			const data = await phoneAuthRepository.getAuthNumber(eventId, phone);
			if ( data.message === '현재 이벤트로 이미 가입된 번호입니다.' ) {
				popupStore.ModalS_duplicated = true;
			} else {
				popupStore.ModalS_duplicated = false;
				authBtnText.value = '재전송';
				isAuthSend.value = true;
			}
		} catch (error) {
			console.error('Auth number fetch failed:', error);
		}
	}
	
	// 상태와 메서드를 return 해야 컴포넌트에서 사용할 수 있습니다.
	return {
		phoneNumber,
		authNumber,
		
		authBtnReady,
		authBtnText,
		
		isAuthSend,
		
		fetchAuthNumber,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'phoneNumber',
		]
	}
});