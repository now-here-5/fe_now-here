import { defineStore } from 'pinia';
import { ref } from 'vue';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';

const memberAccountRepository = new MemberAccountRepository();

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
			const data = await memberAccountRepository.getAuthNumber(eventId, phone);
			if ( data.message === '현재 이벤트로 이미 가입된 번호입니다.' ) {
				popupStore.duplicateModal = true;
			} else {
				popupStore.duplicateModal = false;
				authBtnText.value = '재전송';
				isAuthSend.value = true;
			}
		} catch (error) {
			console.error('Auth number fetch failed:', error);
		}
	}
	
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
	}}
);