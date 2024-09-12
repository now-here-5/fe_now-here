import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { useSignupStore } from "@/presentation/stores/signupStore.js";
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const memberAccountRepository = new MemberAccountRepository();

export const useSignupProfile = defineStore('signupProfile', () => {
	const eventStore = useEventStore();
	const signupStore = useSignupStore();
	const popupStore = usePopupStore();
	
	const name = ref("");
	const isDuplicate = ref(null);
	const alertMessageVisible = ref(false);
	const alertMessage = ref('');
	const alertMessageInventory = [
		"중복 여부를 확인해주세요.",
		"사용 가능한 닉네임입니다.",
		"이미 사용 중인 닉네임입니다.",
	];
	
	const snsID = ref("");
	
	const birth = ref("");
	const selectedSex = ref("");
	const selectedMBTI = ref([]);
	const selfIntro = ref("");
	
	const modalImag = ref('');
	
	const isNameFilled = computed(() => name.value.length >= 2 && name.value.length <= 8);
	const isNameValid = computed(() => isDuplicate.value === false);
	const isSNSIDValid = computed(() => snsID.value.length > 0);
	const isBirthValid = computed(() => birth.value.length === 10); // 모든 생년월일 값이 채워졌는지 확인
	const isSexValid = computed(() => selectedSex.value !== '');
	const isMBTIValid = computed(() => selectedMBTI.value.length === 4); // 모든 MBTI 값이 채워졌는지 확인
	const isSelfIntroductionValid = computed(() => selfIntro.value.length >= 10 && selfIntro.value.length <= 30);
	
	const signupReady = computed(() => {
		return isNameFilled.value && isNameValid.value && isSNSIDValid.value && isBirthValid.value && isSexValid.value && isMBTIValid.value && isSelfIntroductionValid.value;
	});
	watch(signupReady, (newValue) => {
		if (newValue) {
			signupStore.signupCompleted.profile = true;
		} else {
			signupStore.signupCompleted.profile = false;
		}
	});
	
	const checkDuplicate = async () => {
		const eventId = eventStore.encodedId;
		const nameTo = name.value
		try {
			const data = await memberAccountRepository.getNameDuplicate(eventId, nameTo);
			if ( data.message === "사용 가능한 닉네임입니다." ) {
				alertMessageVisible.value = true;
				alertMessage.value = alertMessageInventory[1];
				isDuplicate.value = false;
			} else {
				alertMessageVisible.value = true
				alertMessage.value = alertMessageInventory[2];
				isDuplicate.value = true;
				popupStore.modalSVisible.duplicateName = true;
			}
		} catch (error) {
			console.error('name Duplicate :', error);
		}
	}
	
	const $reset = () => {
		name.value = "";
		isDuplicate.value = null;
		snsID.value = "";
		birth.value = "";
		selectedSex.value = "";
		selectedMBTI.value = [];
		selfIntro.value = "";
	};
	return {
		name,
		isDuplicate,
		alertMessageVisible,
		alertMessage,
		alertMessageInventory,
		
		snsID,
		
		birth,
		selectedSex,
		selectedMBTI,
		selfIntro,
		
		modalImag,
		
		signupReady,
		
		checkDuplicate,
		$reset
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'name',
			'isDuplicate',
			`snsID`,
			'birth',
			'selectedSex',
			'selectedMBTI',
			'selfIntro',
		]
	}
});