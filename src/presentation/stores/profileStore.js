import { defineStore } from 'pinia';
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { MemberSettingRepository } from '@/infrastructure/repositories/MemberSettingRepository.js';

const memberSettingRepository = new MemberSettingRepository();

export const useProfileStore = defineStore('profile', () => {
	const router = useRouter();
	
	const mbti = ref("");
	const nickname = ref("");
	const birthdate = ref("");
	const gender = ref("");
	const description = ref("");
	const phone = ref("");
	
	const originalData = reactive({
		mbti: "",
		nickname: "",
		description: "",
	});
	
	const hasChanges = computed(() => {
		return (
			mbti.value !== originalData.mbti ||
			nickname.value !== originalData.nickname ||
			description.value !== originalData.description
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
		console.log('mbti', mbti.value);
		console.log('nickname', nickname.value);
		console.log('birthdate', birthdate.value);
		console.log('gender', gender.value);
		console.log('description', description.value);
		console.log('phone', phone.value);
		try {
			const response = await memberSettingRepository.getProfileInfo();
			console.log('response', response);
			if (response.message === "개인정보 조회에 성공했습니다.") {
				originalData.mbti = response.data.mbti;
				originalData.nickname = response.data.nickname;
				originalData.description = response.data.description;
				
				mbti.value = response.data.mbti;
				nickname.value = response.data.nickname;
				birthdate.value = calculateAge(response.data.birthdate);
				gender.value = getGenderInKorean(response.data.gender);
				description.value = response.data.description;
				phone.value = response.data.phone;
				
				return true;
			} else {
				console.log("피드백 모달을 표시하지 않습니다.");
			}
		} catch (error) {
			console.error('Error fetching profile info:', error);
			return null;
		}
	};
	
	const restoreOriginalData = () => {
		mbti.value = originalData.mbti;
		nickname.value = originalData.nickname;
		description.value = originalData.description;
	};
	const submit = async (currentRoute) => {
		try {
			if (currentRoute === '/editSelf') {
				const submitData = { description: description.value };
				const response = await memberSettingRepository.patchSelfIntro(submitData);
				if (response.message === "자기소개 수정에 성공했습니다.") {
					originalData.description = description.value;
					router.back();
				}
			} else if (currentRoute === '/editName') {
				const submitData = { nickname: nickname.value };
				const response = await memberSettingRepository.patchNickname(submitData);
				if (response.message === "닉네임 수정에 성공했습니다.") {
					originalData.nickname = nickname.value;
					router.back();
				}
			} else if (currentRoute === '/editMBTI') {
				const submitData = { mbti: mbti.value };
				const response = await memberSettingRepository.patchMBTI(submitData);
				if (response.message === "MBTI 수정에 성공했습니다.") {
					originalData.mbti = mbti.value;
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
		mbti,
		nickname,
		birthdate,
		gender,
		description,
		phone,
		hasChanges,
		fetchProfile,
		submit,
		restoreOriginalData,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			`mbti`,
			`nickname`,
			`birthdate`,
			`gender`,
			`description`,
			`phone`,
		]
	}
});