import { defineStore } from 'pinia';
import { computed,  ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { MemberSettingRepository } from '@/infrastructure/repositories/MemberSettingRepository.js';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';
import { formPhoneNumber } from '@/composition/FormNumber.js'

const memberSettingRepository = new MemberSettingRepository();
const memberAccountRepository = new MemberAccountRepository();

export const useProfileStore = defineStore('profile', () => {
	const router = useRouter();
	const eventStore = useEventStore();
	const popupStore = usePopupStore();
	
	const accountId = ref("");
	const birthdate = ref("");
	const birth = ref("");
	const age = ref("");
	const selfIntro = ref("");
	const gender = ref("");
	const selectedMBTI = ref("");
	const name = ref("");
	const phoneNumber = ref("");
	
	const originalData = reactive({
		selfIntro: "",
		name: "",
		birth: "",
		selectedMBTI: "",
	});
	
	const hasChanges = computed(() => {
		return (
			selfIntro.value.length > 9 && selfIntro.value !== originalData.selfIntro ||
			name.value.length > 1 && name.value.length < 9 && name.value !== originalData.name && isDuplicate.value === false ||
			selectedMBTI.value !== originalData.selectedMBTI ||
			birth.value !== originalData.birth && birth.value.length > 5
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
				originalData.selfIntro = response.data.description;
				originalData.name = response.data.nickname;
				originalData.birth = response.data.birthdate;
				originalData.selectedMBTI = response.data.mbti;
				
				accountId.value = response.data.accountId;
				phoneNumber.value = formPhoneNumber(response.data.phoneNumber);
				selectedMBTI.value = response.data.mbti;
				name.value = response.data.nickname;
				birth.value = response.data.birthdate;
				age.value = calculateAge(response.data.birthdate);
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
		birth.value = originalData.birth;
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
			} else if (currentRoute === '/editBirth') {
				const submitData = { birthday: birth.value };
				const response = await memberSettingRepository.patchBirth(submitData);
				if (response.message === "생일 수정에 성공했습니다.") {
					originalData.birth = birth.value;
					age.value = calculateAge(birth.value);
					router.back();
				}
			}
		} catch (error) {
			console.error('Error during profile submission:', error);
		}
	};
	
	const isDuplicate = ref(null);
	const alertMessageVisible = ref(false);
	const alertMessage = ref('');
	const alertMessageInventory = [
		"중복 여부를 확인해주세요.",
		"사용 가능한 닉네임입니다.",
		"이미 사용 중인 닉네임입니다.",
	];
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
				alertMessageVisible.value = true;
				alertMessage.value = alertMessageInventory[2];
				isDuplicate.value = true;
				popupStore.modalSVisible.duplicateName = true;
			}
		} catch (error) {
			console.error('name Duplicate :', error);
		}
	}
	
	return {
		selectedMBTI,
		name,
		birthdate,
		birth,
		gender,
		selfIntro,
		accountId,
		phoneNumber,
		age,
		hasChanges,
		
		originalData,
		
		fetchProfile,
		restoreOriginalData,
		submit,
		
		isDuplicate,
		alertMessageVisible,
		alertMessage,
		alertMessageInventory,
		checkDuplicate,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			`phoneNumber`,
			`selectedMBTI`,
			`accountId`,
			`name`,
			`birthdate`,
			`age`,
			`gender`,
			`selfIntro`,
			`phone`,
			`originalData`,
		]
	}
});