import { defineStore } from 'pinia';
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { MemberSettingRepository } from '@/infrastructure/repositories/MemberSettingRepository.js';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';

const memberSettingRepository = new MemberSettingRepository();
const memberAccountRepository = new MemberAccountRepository();

export const useProfileStore = defineStore('profile', () => {
	const router = useRouter();
	const eventStore = useEventStore();
	
	const accountId = ref("");
	const birthdate = ref("");
	const selfIntro = ref("");
	const gender = ref("");
	const selectedMBTI = ref("");
	const name = ref("");
	const snsId = ref("");
	
	const isDuplicate = ref(null);
	const alertMessageVisible = ref(false);
	const alertMessage = ref('');
	const alertMessageInventory = [
		"중복 여부를 확인해주세요.",
		"사용 가능한 닉네임입니다.",
		"이미 사용 중인 닉네임입니다.",
	];
	
	const originalData = reactive({
		selectedMBTI: "",
		name: "",
		selfIntro: "",
	});
	const checkDuplicate = async () => {
		const eventId = eventStore.encodedId;
		const nameTo = name.value
		try {
			const data = await memberAccountRepository.getNameDuplicate(eventId, nameTo);
			if ( data.message === "사용 가능한 닉네임입니다." ) {
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
	
	const hasChanges = computed(() => {
		return (
			selectedMBTI.value !== originalData.selectedMBTI ||
			name.value !== originalData.name ||
			selfIntro.value !== originalData.selfIntro
		);
	});
	
	const calculateAge = (birthdate) => {
		const birth = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
			age--;
		}
		return age;
	};
	
	const getGenderInKorean = (gender) => {
		return gender === "FEMALE" ? "여성" : "남성";
	};
	
	const fetchProfile = async () => {
		try {
			const response = await memberSettingRepository.getProfileInfo();
			if (response.message === "개인정보 조회에 성공했습니다.") {
				console.log('Profile info:', response.data);
				
				originalData.selectedMBTI = response.data.mbti;
				originalData.name = response.data.nickname;
				originalData.selfIntro = response.data.description;
				
				accountId.value = response.data.accountId;
				snsId.value = response.data.snsId;
				selectedMBTI.value = response.data.mbti;
				name.value = response.data.nickname;
				birthdate.value = calculateAge(response.data.birthdate);
				gender.value = getGenderInKorean(response.data.gender);
				selfIntro.value = response.data.description;

				return true;
			}
		} catch (error) {
			console.error('Error fetching profile info:', error);
			return null;
		}
	};
	
	const restoreOriginalData = () => {
		selectedMBTI.value = originalData.selectedMBTI;
		name.value = originalData.name;
		selfIntro.value = originalData.selfIntro;
	};
	const submit = async (currentRoute) => {
		try {
			if (currentRoute === '/editSelf') {
				const submitData = { description: selfIntro.value };
				const response = await memberSettingRepository.patchSelfIntro(submitData);
				if (response.message === "자기소개 수정에 성공했습니다.") {
					originalData.selfIntro = selfIntro.value;
					router.back();
				}
			} else if (currentRoute === '/editName') {
				const submitData = { nickname: name.value };
				const response = await memberSettingRepository.patchNickname(submitData);
				if (response.message === "닉네임 수정에 성공했습니다.") {
					originalData.name = name.value;
					router.back();
				}
			} else if (currentRoute === '/editMBTI') {
				const submitData = { mbti: selectedMBTI.value };
				const response = await memberSettingRepository.patchMBTI(submitData);
				if (response.message === "MBTI 수정에 성공했습니다.") {
					originalData.selectedMBTI = selectedMBTI.value;
					router.back();
				}
			} else {
				console.error('Unknown route for submission');
			}
		} catch (error) {
			console.error('Error during profile submission:', error);
		}
	};
	
	return {
		selectedMBTI,
		name,
		birthdate,
		gender,
		selfIntro,
		accountId,
		snsId,
		hasChanges,
		
		originalData,
		
		isDuplicate,
		alertMessageVisible,
		alertMessage,
		alertMessageInventory,
		checkDuplicate,
		
		fetchProfile,
		submit,
		restoreOriginalData,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			`mbti`,
			`name`,
			`birthdate`,
			`gender`,
			`selfIntro`,
			`phone`,
		]
	}
});