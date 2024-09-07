import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { PhoneAuthRepository } from "@/infrastructure/repositories/PhoneAuthRepository.js";
import { RegisterRepository } from "@/infrastructure/repositories/RegisterRepository.js";
import { authStore } from '@/presentation/stores/authStore.js';
import { popupStore } from '@/presentation/stores/popupStore.js';
import { eventStore } from '@/presentation/stores/eventStore.js';
import { phoneAuthStore } from '@/presentation/stores/signupSub/phoneAuthStore.js';
import { passwordStore } from '@/presentation/stores/signupSub/passwordStore.js';
import { profileSignupStore } from '@/presentation/stores/signupSub/profileSignupStore.js';
import { cleanPhoneNumber } from '@/core/usecases/FormNumber.js'
import { getAvatarSrc } from '@/core/usecases/GetAvatar.js'

const phoneAuthRepository = new PhoneAuthRepository();
const registerRepository = new RegisterRepository();

export const signupStore = defineStore('signup', () => {
	const router = useRouter();
	
	const store_Popup = popupStore();
	const store_PhoneAuth = phoneAuthStore();
	
	const store_Password = passwordStore();
	const store_ProfileSignup = profileSignupStore();

	
	const signupStep = ref(0);
	// 회원가입 완료 여부
	const signupCompleted = ref({
		auth: false,
		password: false,
		profile: false
	});
	const isActive = computed(() => signupCompleted.value[Object.keys(signupCompleted.value)[signupStep.value]]);
	
	const textTitle = ref([
		"휴대폰 인증",
		"비밀번호",
		"프로필 정보"
	]);
	const textMention = ref([
		"휴대폰 번호는 아이디로 사용되며,<br>동의 없이는 상대방에게 절대 공개되지 않습니다.",
		"비밀번호로 사용할 PIN 4자리를 입력해주세요."
	]);
	const btnText = ref([
		"인증 완료",
		"입력 완료",
		"가입 완료",
	]);
	
	const submit = async  () => {
		switch (signupStep.value) {
			case 0: // 휴대폰 인증 단계
				try {
					const phone = cleanPhoneNumber(store_PhoneAuth.phoneNumber);
					const authNum = store_PhoneAuth.authNumber;
					const data = await phoneAuthRepository.postAuthNumber(phone, authNum);
					if ( data.message === '휴대폰 인증에 실패했습니다.' ) {
						store_Popup.ModalS_authError = true;
						console.error('Auth failed:', data.message);
					} else {
						store_Popup.ModalS_authError = false;
						router.push('/signup/signup_password');
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
								const baseImgSrc = getAvatarSrc(store_ProfileSignup.selectedSex, store_ProfileSignup.selectedMBTI);
								store_ProfileSignup.modalImag = baseImgSrc;
								
								console.log("modalImag", store_ProfileSignup.modalImag);
								
								store_Popup.ModalS_completed = true;
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
		
		signupStep,
		signupCompleted,
		
		btnText,
		
		isActive,
		submit,
	};
}, {
	persist: {
		enabled: true,
		paths: [
		]
	}
});