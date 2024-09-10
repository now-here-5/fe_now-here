import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { usePasswordSignupStore } from '@/presentation/stores/signupSub/passwordSignupStore.js';
import { usePhoneAuthSignupStore } from '@/presentation/stores/signupSub/phoneAuthSignupStore.js';
import { useProfileSignupStore } from '@/presentation/stores/signupSub/profileSignupStore.js';
import { useAuthStore } from '@/presentation/stores/authStore.js';
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';
import { cleanPhoneNumber } from '@/composition/FormNumber.js';
import { getAvatarSrc } from '@/Composition/GetAvatar.js'

const memberAccountRepository = new MemberAccountRepository();

export const useSignupStore = defineStore('signup', () => {
	const router = useRouter();
	const passwordSignupStore = usePasswordSignupStore();
	const phoneAuthSignupStore = usePhoneAuthSignupStore();
	const profileSignupStore = useProfileSignupStore();
	const authStore = useAuthStore();
	const eventStore = useEventStore();
	const popupStore = usePopupStore();
	
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
					const phone = cleanPhoneNumber(phoneAuthSignupStore.phoneNumber);
					const authNum = phoneAuthSignupStore.authNumber;
					const data = await memberAccountRepository.postAuthNumber(phone, authNum);
					if ( data.message === '휴대폰 인증에 실패했습니다.' ) {
						popupStore.authErrorModal = true;
						console.error('Auth failed:', data.message);
					} else {
						popupStore.authErrorModal = false;
						router.push('/signup/signup_password');
					}
				} catch (error) {
					console.error('Auth number fetch failed:', error);
				}
				break;
			
			case 1: // 비밀번호 설정 단계
				if ( passwordSignupStore.password === passwordSignupStore.passwordConfirm ) {
					console.log("비밀번호가 일치합니다.");
					console.log("1", passwordSignupStore.password);
					console.log("1", passwordSignupStore.passwordConfirm);
					
					passwordSignupStore.alertMessage = false;
					router.push('/signup/signup_profile');
				} else {
					console.log("2", passwordSignupStore.password);
					console.log("2", passwordSignupStore.passwordConfirm);
					console.log("비밀번호가 일치하지 않습니다.");
					passwordSignupStore.alertMessage = true;
				}
				break;
			
			case 2: // 프로필 정보 입력 단계
				if (profileSignupStore.signupReady) {
					console.log("프로필 정보가 입력되었습니다.");
					
					try {
						const encodedId = eventStore.encodedId;
						const userData = {
						"phone": phoneAuthSignupStore.phoneNumber.replace(/[^0-9]/g, ''),
						"password": passwordSignupStore.password,
						"nickname": profileSignupStore.name,
						"birth": profileSignupStore.birth,
						"mbti": profileSignupStore.selectedMBTI,
						"gender": profileSignupStore.selectedSex,
						"description": profileSignupStore.selfIntro,
						};
						
						console.log("encodedId", encodedId);
						console.log("userData", userData);
						
						const response = await memberAccountRepository.postRegister(encodedId, userData);
						console.log("response.data", response.data);
						if (response.message === "회원가입에 성공했습니다.") {

							console.log('Login success:', response.data);
							authStore.token = response.data
							console.log('store_Auth.token:', authStore.token);
							
							if (authStore.token) {
								await eventStore.fetchEventDetail(eventStore);
								const baseImgSrc = getAvatarSrc(profileSignupStore.selectedSex, profileSignupStore.selectedMBTI);
								profileSignupStore.modalImag = baseImgSrc;
								
								console.log("modalImag", profileSignupStore.modalImag);
								
								popupStore.completeModal = true;
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