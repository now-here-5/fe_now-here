import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { useSignupPWStore } from '@/presentation/stores/signupSub/signupPWStore.js';
import { useSignupPhoneStore } from '@/presentation/stores/signupSub/signupPhoneStore.js';
import { useSignupProfile } from '@/presentation/stores/signupSub/signupProfileStore.js';
import { useAuthStore } from '@/presentation/stores/authStore.js';
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';
import { getAvatarSrc } from '@/composition/GetAvatar.js'

const memberAccountRepository = new MemberAccountRepository();

export const useSignupStore = defineStore('signup', () => {
	const router = useRouter();
	const signupPWStore = useSignupPWStore();
	const signupPhoneStore = useSignupPhoneStore();
	const signupProfileStore = useSignupProfile();
	const authStore = useAuthStore();
	const eventStore = useEventStore();
	const popupStore = usePopupStore();
	
	const signupStep = ref(0);
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
			case 0:
				try {
					const phone = signupPhoneStore.phoneNumber.replace(/[^0-9]/g, '');
					console.log('fetchAuthNumber:', phone);
					const data = await memberAccountRepository.postAuthNumber(phone, signupPhoneStore.authNumber);
					if ( data.message === '휴대폰 인증에 실패했습니다.' ) {
						popupStore.modalSVisible.authError = true;
						console.error('Auth failed:', data.message);
					} else {
						popupStore.modalSVisible.authError = false;
						router.push('/signup/signup-password');
					}
				} catch (error) {
					console.error('Auth number fetch failed:', error);
				}
				break;
			
			case 1:
				if ( signupPWStore.password === signupPWStore.passwordConfirm ) {
					signupPWStore.alertMessage = false;
					router.push('/signup/signup-profile');
				} else {
					signupPWStore.alertMessage = true;
				}
				break;
			
			case 2: // 프로필 정보 입력 단계
				if (signupProfileStore.signupReady) {
					try {
						const userData = {
							"phoneNumber": signupPhoneStore.phoneNumber.replace(/[^0-9]/g, ''),
							"password": signupPWStore.password,
							"nickname": signupProfileStore.name,
							"birth": signupProfileStore.birth,
							"mbti": signupProfileStore.selectedMBTI,
							"gender": signupProfileStore.selectedSex,
							"description": signupProfileStore.selfIntro,
						};
						console.log(userData);
						const response = await memberAccountRepository.postRegister(eventStore.encodedId, userData);
						if (response.message === "회원가입에 성공했습니다.") {
							authStore.token = response.data
							if (authStore.token) {
								await eventStore.fetchEventDetail(eventStore);
								const baseImgSrc = getAvatarSrc(signupProfileStore.selectedSex, signupProfileStore.selectedMBTI);
								signupProfileStore.modalImag = baseImgSrc;
								popupStore.modalSVisible.complete = true;
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