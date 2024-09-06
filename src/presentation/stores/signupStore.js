import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { AuthPhoneRepository } from "@/infrastructure/repositories/AuthPhoneRepository.js";
import { RegisterRepository } from "@/infrastructure/repositories/RegisterRepository.js";
import { authStore } from '@/presentation/stores/authStore.js';
import { eventStore } from '@/presentation/stores/eventStore.js';
import { phoneAuthStore } from '@/presentation/stores/signupSub/phoneAuthStore.js';
import { passwordStore } from '@/presentation/stores/signupSub/passwordStore.js';
import { profileSignupStore } from '@/presentation/stores/signupSub/profileSignupStore.js';

const authPhoneRepository = new AuthPhoneRepository();
const registerRepository = new RegisterRepository();

const store_Password = passwordStore();
const store_ProfileSignup = profileSignupStore();


export const signupStore = defineStore('signup', () => {
	const router = useRouter();
	
	const textTitle = ref([
		"휴대폰 인증",
		"비밀번호",
		"프로필 정보"
	]);
	const textMention = ref([
		"휴대폰 번호는 아이디로 사용되며,<br>동의 없이는 상대방에게 절대 공개되지 않습니다.",
		"비밀번호로 사용할 PIN 4자리를 입력해주세요."
	]);
	const textTitleSelect = computed(() => textTitle.value[signupStep.value] || "");
	const textMentionSelect = computed(() => textMention.value[signupStep.value] || "");
	
	// ModalS
	const ModalS_duplicated = ref(false);
	const ModalS_authError = ref(false);
	const ModalS_completed = ref(false);
	
	const modalSTitle = computed(() => {
		if (ModalS_completed.value) {
			return `${store_ProfileSignup.selectedMBTI} ${store_ProfileSignup.name}님 <br> 회원가입 완료`;
		} else if (ModalS_duplicated.value) {
			return "알림";
		} else if (ModalS_authError.value) {
			return "알림";
		}
		return "알림";
	});
	
	const modalSMessage = computed(() => {
		if (ModalS_completed.value) {
			return "어떤 인연이 기다리고 있을까요?<br>지금 바로 만나보세요.";
		} else if (ModalS_duplicated.value) {
			return "이미 가입된 휴대폰 번호입니다.<br>다시 한 번 확인해주세요.";
		} else if (ModalS_authError.value) {
			return "인증 번호가 일치하지 않습니다.<br>다시 입력해주세요.";
		}
		return "";
	});
	const modalSBtnText = ref([
		"확인",
		"매칭하러 가기",
	]);
	
	// 회원가입 단계
	const signupStep = ref(0);

	
	// 회원가입 완료 여부
	const signupCompleted = ref({
		auth: false,
		password: false,
		profile: false
	});
	
	// 버튼 텍스트 출력
	const btnText = ref([
		"인증 완료",
		"입력 완료",
		"가입 완료",
	]);
	
	// ModalS
	const closeModalS_duplicated = () => {
		ModalS_duplicated.value = false;
	};
	const closeModalS_authError = () => {
		ModalS_authError.value = false;
	};
	const closeModalS_completed = () => {
		ModalS_completed.value = false;
		router.push('/match');
	};
	
	// 회원가입 단계 증가
	const signupStepUp = () => {
		if (signupStep.value === 0) {
			signupStep.value = 1;
			router.push('/signup/signup_password');
		} else if (signupStep.value === 1) {
			signupStep.value = 2;
			router.push('/signup/signup_profile');
		}
	};
	// 회원가입 단계에 따른 버튼 활성화 여부
	const isActive = computed(() => {
		switch (signupStep.value) {
			case 0:
				return signupCompleted.value.auth;
			case 1:
				return signupCompleted.value.password;
			case 2:
				return signupCompleted.value.profile;
			default:
				return false;
		}
	});
	// 회원가입 단계에 따른 버튼 텍스트 출력
	const BtnTextSelect = computed(() => {
		return btnText.value[signupStep.value];
	});
	// 회원가입 각 단계에 따른 버튼 완료 함수
	const submit = async  (router) => {
		switch (signupStep.value) {
			case 0: // 휴대폰 인증 단계
				try {
					const store_PhoneAuth = phoneAuthStore();
					
					const phone = store_PhoneAuth.phoneNumber.replace(/[^0-9]/g, '');
					const authNum = store_PhoneAuth.authNumber;
					
					console.log("phone", phone);
					console.log("authNum", authNum);
					
					const data = await authPhoneRepository.postAuthNumber(phone, authNum);
					if ( data.message === '휴대폰 인증에 실패했습니다.' ) {
						ModalS_authError.value = true;
						console.error('Auth failed:', data.message);
					} else {
						ModalS_authError.value = false;
						signupStepUp();
						router.push('/signup/signup_password');
						
						console.log(data.message)
					}
				} catch (error) {
					console.error('Auth number fetch failed:', error);
				}
				break;
			
			case 1: // 비밀번호 설정 단계
				if ( store_Password.password === store_Password.passwordConfirm ) {
					console.log("비밀번호가 일치합니다.");
					console.log("1", store_Password.password);
					console.log("1", store_Password.passwordConfirm);
					
					store_Password.alertMessage = false;
					signupStepUp();
					router.push('/signup/signup_profile');
				} else {
					console.log("2", store_Password.password);
					console.log("2", store_Password.passwordConfirm);
					console.log("비밀번호가 일치하지 않습니다.");
					store_Password.alertMessage = true;
				}
				break;
			
			case 2: // 프로필 정보 입력 단계
				if (store_ProfileSignup.signupReady) {
					const store_Event = eventStore();
					const store_PhoneAuth = phoneAuthStore();
					const store_Password = passwordStore();
					const store_ProfileSignup = profileSignupStore();
					
					console.log("프로필 정보가 입력되었습니다.");
					
					console.log("phone", store_PhoneAuth.phoneNumber);
					console.log("password", store_Password.password);
					console.log("nickname", store_ProfileSignup.name);
					console.log("birth", store_ProfileSignup.birth);
					console.log("mbti", store_ProfileSignup.selectedMBTI);
					console.log("gender", store_ProfileSignup.selectedSex);
					console.log("selfIntro", store_ProfileSignup.selfIntro);
					
					try {
						const encodedId = store_Event.encodedId;
						const userData = {
						"phone": store_PhoneAuth.phoneNumber.replace(/[^0-9]/g, ''),
						"password": store_Password.password,
						"nickname": store_ProfileSignup.name,
						"birth": store_ProfileSignup.birth,
						"mbti": store_ProfileSignup.selectedMBTI,
						"gender": store_ProfileSignup.selectedSex,
						"description": store_ProfileSignup.selfIntro,
						};
						
						console.log("encodedId", encodedId);
						console.log("userData", userData);
						
						const response = await registerRepository.postRegister(encodedId, userData);
						console.log("response.data", response.data);
						if (response.message === "회원가입에 성공했습니다.") {
							const store_Auth = authStore();
							console.log('Login success:', response.data);
							store_Auth.token = response.data
							console.log('store_Auth.token:', store_Auth.token);
							
							if (store_Auth.token) {
								await store_Event.fetchEventDetail(store_Event);
								
								const baseImgSrc = new URL(`../../assets/images/MBTI_Avatar/avatar_MBTI_${store_ProfileSignup.selectedSex}/avatar_${store_ProfileSignup.selectedMBTI}_${store_ProfileSignup.selectedSex}.png`, import.meta.url).href;
								store_ProfileSignup.modalImag = baseImgSrc;
								
								console.log("modalImag", store_ProfileSignup.modalImag);
								
								ModalS_completed.value = true;
							}
						} else {
							console.error('Login failed:', response.message);
						}
					} catch (error) {
						console.error('Login failed:', error);
					}
				}
				break;
			
			default:
				console.log("모든 단계가 완료되었습니다.");
		}
	}
	
	// 상태와 메서드를 return 해야 컴포넌트에서 사용할 수 있습니다.
	return {
		textTitle,
		textMention,
		textTitleSelect,
		textMentionSelect,
		
		ModalS_duplicated,
		ModalS_authError,
		ModalS_completed,
		modalSTitle,
		modalSMessage,
		modalSBtnText,
		
		signupStep,
		signupCompleted,
		
		btnText,
		
		closeModalS_duplicated,
		closeModalS_authError,
		closeModalS_completed,
		
		signupStepUp,
		isActive,
		BtnTextSelect,
		submit,
		
	};
}, {
	persist: {
		enabled: true,
		paths: [
		]
	}
});