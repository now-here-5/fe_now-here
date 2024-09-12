 import { defineStore } from 'pinia';
import { ref } from 'vue';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';
 import { useSignupStore } from '@/presentation/stores/signupStore.js';

const memberAccountRepository = new MemberAccountRepository();

export const useSignupIDStore = defineStore('ID', () => {
	const eventStore = useEventStore();
	const popupStore = usePopupStore();
	const signupStore = useSignupStore();
	
	const ID = ref("");
	const DuplicateBtn = ref(false);
	const alertMessageVisible = ref(false);
	const alertMessage = ref("");
	
	const getIDDuplicate = async () => {
		try {
			const data = await memberAccountRepository.getIDDuplicate(eventStore.encodedId, ID.value);
			if ( data.message !== '사용 가능한 아이디입니다.' ) {
				alertMessageVisible.value = false;
				ID.value = "";
				signupStore.signupCompleted.ID = false;
				popupStore.modalSVisible.duplicateID = true;
			} else {
				alertMessageVisible.value = true;
				alertMessage.value = "사용 가능한 아이디입니다.";
				signupStore.signupCompleted.ID = true;
			}
		} catch (error) {
			console.error('Auth number fetch failed:', error);
		}
	}
	
	return {
		ID,
		DuplicateBtn,
		alertMessageVisible,
		alertMessage,
		
		getIDDuplicate,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'ID',
		]
	}}
);