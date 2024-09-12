import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { usePasswordSignupStore } from '@/presentation/stores/signupSub/passwordSignupStore.js';
import { useSignupIDStore } from '@/presentation/stores/signupSub/signupIDStore.js';
import { useProfileSignupStore } from '@/presentation/stores/signupSub/profileSignupStore.js';
import { useAuthStore } from '@/presentation/stores/authStore.js';
import { useEventStore } from '@/presentation/stores/eventStore.js';
import { usePopupStore } from '@/presentation/stores/popupStore.js';
import { cleanPhoneNumber } from '@/composition/FormNumber.js';
import { getAvatarSrc } from '@/composition/GetAvatar.js'

const memberAccountRepository = new MemberAccountRepository();

export const useSignupStore = defineStore('signup', () => {
	const router = useRouter();
	const passwordSignupStore = usePasswordSignupStore();
	const signupIDStore = useSignupIDStore();
	const profileSignupStore = useProfileSignupStore();
	const authStore = useAuthStore();
	const eventStore = useEventStore();
	const popupStore = usePopupStore();
	
	const signupStep = ref(0);
	// 회원가입 완료 여부
	const signupCompleted = ref({
		ID: false,
		password: false,
		profile: false
	});
	const isActive = computed(() => signupCompleted.value[Object.keys(signupCompleted.value)[signupStep.value]]);
	
	const textTitle = ref([
		"아이디 중복 확인",
		"비밀번호",
		"프로필 정보"
	]);
	const textMention = ref([
		"3~ 15자의 영문 소문자, 숫자만 사용 가능합니다.",
		"비밀번호로 사용할 PIN 4자리를 입력해주세요."
	]);
	const btnText = ref([
		"입력 완료",
		"입력 완료",
		"가입 완료",
	]);
	
	const submit = async  () => {
		switch (signupStep.value) {
			case 0:
					router.push('/signup/signup-password');
				break;
			
			case 1: // 비밀번호 설정 단계
				if ( passwordSignupStore.password === passwordSignupStore.passwordConfirm ) {
					passwordSignupStore.alertMessage = false;
					router.push('/signup/signup_profile');
				} else {
					passwordSignupStore.alertMessage = true;
				}
				break;
			
			case 2: // 프로필 정보 입력 단계
				if (profileSignupStore.signupReady) {
					try {
						const encodedId = eventStore.encodedId;
						const userData = {
						"phone": signupIDStore.phoneNumber.replace(/[^0-9]/g, ''),
						"password": passwordSignupStore.password,
						"nickname": profileSignupStore.name,
						"birth": profileSignupStore.birth,
						"mbti": profileSignupStore.selectedMBTI,
						"gender": profileSignupStore.selectedSex,
						"description": profileSignupStore.selfIntro,
						};
						const response = await memberAccountRepository.postRegister(encodedId, userData);
						if (response.message === "회원가입에 성공했습니다.") {
							authStore.token = response.data
							if (authStore.token) {
								await eventStore.fetchEventDetail(eventStore);
								const baseImgSrc = getAvatarSrc(profileSignupStore.selectedSex, profileSignupStore.selectedMBTI);
								profileSignupStore.modalImag = baseImgSrc;
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