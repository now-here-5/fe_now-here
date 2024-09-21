 import { defineStore } from 'pinia';
import { ref } from 'vue';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';

const memberAccountRepository = new MemberAccountRepository();

export const useSignupPhoneStore = defineStore('phone', () => {
	const eventStore = useEventStore();
	const popupStore = usePopupStore();
	
	const phoneNumber = ref("");
	const authNumber = ref("");
	
	const authBtnReady = ref(false);
	const authBtnText = ref("인증번호 요청");
	
	const isAuthSend = ref(false);
	const authCount = ref(0);
	
	const fetchAuthNumber = async () => {
		if (authCount.value >= 3) {
			console.warn("최대 재전송 횟수에 도달했습니다.");
			authBtnReady.value = false;
			return;
		}
		const phone = phoneNumber.value.replace(/[^0-9]/g, '');
		const eventId = eventStore.encodedId;
		try {
			const data = await memberAccountRepository.getAuthNumber(eventId, phone);
			if ( data.message === '현재 이벤트로 이미 가입된 번호입니다.' ) {
				popupStore.modalSVisible.duplicatePhone = true;
			} else {
				popupStore.modalSVisible.duplicatePhone = false;
				authBtnText.value = '재전송';
				isAuthSend.value = true;
				authCount.value += 1;
			}
		} catch (error) {
			console.error('Auth number fetch failed:', error);
		}
	}
	
	const $reset = () => {
		phoneNumber.value = "";
		authBtnReady.value = false;
		isAuthSend.value = false;
		authBtnText.value = "인증번호 요청";
	};
	
	return {
		phoneNumber,
		authNumber,
		
		authBtnReady,
		authBtnText,
		
		isAuthSend,
		authCount,
		
		fetchAuthNumber,
		$reset
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'phoneNumber',
		]
	}}
);