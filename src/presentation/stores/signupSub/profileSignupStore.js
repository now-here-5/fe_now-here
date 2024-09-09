import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

import { NameDuplicateRepository } from "@/infrastructure/repositories/NameDuplicateRepository.js";
import { useSignupStore } from "@/presentation/stores/signupStore.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';


const nameDuplicateRepository = new NameDuplicateRepository();

export const useProfileSignupStore = defineStore('profileSignup', () => {
	const name = ref("");
	const isDuplicate = ref(null);
	
	const alertMessageVisible = ref(false);
	const alertMessage = ref('');
	const alertMessageInventory = [
		"중복 여부를 확인해주세요.",
		"사용 가능한 닉네임입니다.",
		"이미 사용 중인 닉네임입니다.",
	];
	
	const birth = ref("");
	const selectedSex = ref("");
	const selectedMBTI = ref([]);
	const selfIntro = ref("");
	
	const modalImag = ref('');
	
	const isNameFilled = computed(() => name.value.length >= 2 && name.value.length <= 8);
	const isNameValid = computed(() => isDuplicate.value === false);
	const isBirthValid = computed(() => birth.value.length === 10); // 모든 생년월일 값이 채워졌는지 확인
	const isSexValid = computed(() => selectedSex.value !== '');
	const isMBTIValid = computed(() => selectedMBTI.value.length === 4); // 모든 MBTI 값이 채워졌는지 확인
	const isSelfIntroductionValid = computed(() => selfIntro.value.length >= 10 && selfIntro.value.length <= 30);
	
	const signupReady = computed(() => {
		console.log('isNameFilled.value :', isNameFilled.value);
		console.log('isNameValid.value :', isNameValid.value);
		console.log('isBirthValid.value :', isBirthValid.value);
		console.log('isSexValid.value :', isSexValid.value);
		console.log('isMBTIValid.value :', isMBTIValid.value);
		console.log('isSelfIntroductionValid.value :', isSelfIntroductionValid.value);
		
		
		return isNameFilled.value && isNameValid.value && isBirthValid.value && isSexValid.value && isMBTIValid.value && isSelfIntroductionValid.value;
	});

	// watch를 사용해 isBtnReady의 변화를 감지하고, profile을 업데이트
	watch(signupReady, (newValue) => {
		const signupStore = useSignupStore();
		if (newValue) {
			signupStore.signupCompleted.profile = true;
		} else {
			signupStore.signupCompleted.profile = false;
		}
	});
	
	const checkDuplicate = async () => {
		const eventStore = useEventStore();
		
		const eventId = eventStore.encodedId;
		const nameTo = name.value
		
		try {
			const data = await nameDuplicateRepository.getNameDuplicate(eventId, nameTo);
			if ( data.message === "사용 가능한 닉네임입니다." ) {
				console.log('사용 가능한 닉네임입니다.');
				alertMessage.value = alertMessageInventory[1];
				isDuplicate.value = false; // 중복 확인 완료
			} else {
				alertMessage.value = alertMessageInventory[2];
				isDuplicate.value = true; // 중복 확인 완료
			}
		} catch (error) {
			console.error('name Duplicate :', error);
		}
	}
	// 상태와 메서드를 return 해야 컴포넌트에서 사용할 수 있습니다.
	return {
		name,
		isDuplicate,
		
		alertMessageVisible,
		alertMessage,
		alertMessageInventory,
		
		birth,
		selectedSex,
		selectedMBTI,
		selfIntro,
		
		modalImag,
		
		signupReady,
		
		checkDuplicate,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'name',
			'isDuplicate',
			
			'birth',
			'selectedSex',
			'selectedMBTI',
			'selfIntro',
		]
	}
});