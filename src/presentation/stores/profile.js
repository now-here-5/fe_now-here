import { defineStore } from 'pinia';
import { computed, ref, reactive, toRaw } from 'vue';
import { ProfileRepository } from '@/infrastructure/repositories/ProfileRepository.js';
import { EditProfileRepository } from '@/infrastructure/repositories/EditProfileRepository.js';
import router from "@/presentation/router/index.js";
import {editMBTI} from "@/infrastructure/http/api/editProfile.js";

const profileRepository = new ProfileRepository();
const editProfileRepository = new EditProfileRepository();

export const profileStore = defineStore('profile', () => {
	const mbti = ref("");
	const nickname = ref("");
	const birthdate = ref("");
	const gender = ref("");
	const description = ref("");
	const phone = ref("");
	
	// 원본 데이터를 저장해 변경 여부를 추적
	const originalData = reactive({
		mbti: "",
		nickname: "",
		description: "",
	});
	
	// 필드 값 변경 여부를 체크하는 computed 속성
	const hasChanges = computed(() => {
		// 원본 데이터를 toRaw로 가져와서 비교
		return mbti.value !== toRaw(originalData.mbti) ||
			nickname.value !== toRaw(originalData.nickname) ||
			description.value !== toRaw(originalData.description);
	});
	
	const calculateAge = (birthdate) => {
		const birth = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();
		
		// 생일이 지나지 않았다면 나이를 1살 줄임
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
			const response = await profileRepository.profileInfo();
			console.log('response', response);
			// response.data가 true일 때만 동작을 수행
			if (response.message === "개인정보 조회에 성공했습니다.") {
				console.log('response.data', response.data);
				originalData.mbti = response.data.mbti;
				originalData.nickname = response.data.nickname;
				originalData.description = response.data.description;
				console.log('originalData', originalData)
				
				mbti.value = response.data.mbti;
				nickname.value = response.data.nickname;
				birthdate.value = calculateAge(response.data.birthdate); // 생년월일 원본 저장 후 나이 계산
				gender.value = getGenderInKorean(response.data.gender);  // 성별을 한국어로 변환
				description.value = response.data.description;
				phone.value = response.data.phone;
				console.log('mbti', mbti.value);
				console.log('nickname', nickname.value);
				console.log('birthdate', birthdate.value);
				console.log('gender', gender.value);
				console.log('description', description.value);
				console.log('phone', phone.value);
				
				return true;
			} else {
				console.log("피드백 모달을 표시하지 않습니다.");
			}
		} catch (error) {
			console.error('Error fetching profile info:', error);
			return null; // 혹은 다른 기본 값
		}
	};
	
	const submit = async (currentRoute) => {
		console.log('Current route:', currentRoute); // 라우트 확인용 로그
		
		try {
			// 라우트에 따라 다른 처리
			if (currentRoute === '/editSelf') {
				const submitData = {
					description: description.value,
				}
				console.log('Submitting 자기소개: ', submitData);
				const response = await editProfileRepository.editSelfIntro(submitData);
				if (response.message === "닉네임 수정에 성공했습니다.") {
					originalData.description = description.value;
					
					console.log('자기소개 수정 성공');
					router.back();
				} else {
					console.log(response.data);
					console.error('자기소개 수정 실패');
				}
			} else if (currentRoute === '/editName') {
				const submitData = {
					nickname: nickname.value,
				}
				console.log('Submitting 자기소개: ', submitData);
				const response = await editProfileRepository.editNickname(submitData);
				if (response.message === "자기소개 수정에 성공했습니다.") {
					originalData.nickname = nickname.value;
					
					console.log('이름 수정에 성공했습니다.');
					router.back();
				} else {
					console.log(response.data);
					console.error('자기소개 수정 실패');
				}
				
				// 닉네임 수정 로직
				console.log('Submitting 닉네임: ', nickname.value);
			} else if (currentRoute === '/editMBTI') {
				const submitData = {
					mbti: mbti.value,
				}
				console.log('Submitting 자기소개: ', submitData);
				const response = await editProfileRepository.editMBTI(submitData);
				if (response.message === "MBTI 수정에 성공했습니다.") {
					originalData.nickname = mbti.value;
					
					console.log('MBTI 수정에 성공했습니다.');
					router.back();
				} else {
					console.log(response.data);
					console.error('자기소개 수정 실패');
				}
				
				// MBTI 수정 로직
				console.log('Submitting MBTI: ', mbti.value);
				console.log('MBTI 수정에 성공했습니다.');
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