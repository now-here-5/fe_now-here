import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MemberAccountRepository } from "@/infrastructure/repositories/MemberAccountRepository.js";
import { MemberAuthRepository } from '@/infrastructure/repositories/MemberAuthRepository.js'
import { usePopupStore } from '@/presentation/stores/popupStore.js';
import { useEventStore } from '@/presentation/stores/eventStore.js'

const memberAccountRepository = new MemberAccountRepository();
const memberAuthRepository = new MemberAuthRepository();

export const usePWUpdateStore = defineStore('PWUpdate', () => {
  const router = useRouter();
  const eventStore = useEventStore();
  const popupStore = usePopupStore();
  
  const step = ref(0);
  const stepCompleted = ref({
    auth: false,
    password: false,
  });
  const isActive = computed(() => stepCompleted.value[Object.keys(stepCompleted.value)[step.value]]);
  const textTitle = ref([
    "휴대폰 인증",
    "비밀번호 재설정",
  ]);
  const textMention = ref([
    "아이디로 사용 중인 휴대폰 번호를 입력해주세요.",
    "비밀번호를 변경해주세요."
  ]);
  const btnText = ref([
    "인증 완료",
    "입력 완료",
  ]);
  const submit = async  () => {
    switch (step.value) {
      case 0:
        try {
          const phone = phoneNumber.value.replace(/[^0-9]/g, '');
          const data = await memberAccountRepository.postAuthNumber(phone, authNumber.value);
          if ( data.message === '휴대폰 인증에 실패했습니다.' ) {
            popupStore.modalSVisible.authError = true;
            console.error('Auth failed:', data.message);
          } else {
            popupStore.modalSVisible.authError = false;
            router.push('/PWUpdate/PWUpdate-password');
          }
        } catch (error) {
          console.error('Auth number fetch failed:', error);
        }
        break;
      
      case 1:
        if ( password.value === passwordConfirm.value ) {
          try {
            const pwData = {
              phoneNumber: phoneNumber.value.replace(/[^0-9]/g, ''),
              password: password.value
            }
            const data = await memberAuthRepository.patchPW(eventStore.encodedId, pwData)
            if ( data.message === '비밀번호 수정에 성공했습니다.' ) {
              alertMessage.value = false;
              popupStore.modalSVisible.completePW = true;
            } else {
              alertMessage.value = true;
            }
          } catch (error) {
            console.error('Password update failed:', error);
          }
        }
        break;
      
      default:
    }
  }
  
  const phoneNumber = ref("");
  const authNumber = ref("");
  const authBtnReady = ref(false);
  const authBtnText = ref("인증번호 요청");
  const isAuthSend = ref(false);
  const authCount = ref(0);
  const fetchAuthNumber = async () => {
    if (authCount.value >= 3) {
      console.warn("최대 재전송 횟수에 도달했습니다.");
      authBtnReady.value = false;
      return;
    }
    const phone = phoneNumber.value.replace(/[^0-9]/g, '');
    const eventId = eventStore.encodedId;
    const forReset = "true";
    try {
      const data = await memberAccountRepository.getAuthNumber(eventId, phone, forReset);
      if ( data.message === '이벤트에 가입되지 않은 전화번호입니다.' ) {
        popupStore.modalSVisible.updatePWError = true;
      } else {
        popupStore.modalSVisible.updatePWError = false;
        authBtnText.value = '재전송';
        isAuthSend.value = true;
        authCount.value += 1;
      }
    } catch (error) {
      console.error('Auth number fetch failed:', error);
    }
  }
  
  const password = ref("");
  const passwordConfirm = ref("");
  const alertMessage = ref(false);
  
  const $reset = () => {
    step.value = 0;
    stepCompleted.value = {
      auth: false,
      password: false,
    };
    
    phoneNumber.value = "";
    authBtnReady.value = false;
    isAuthSend.value = false;
    authBtnText.value = "인증번호 요청";
    
    password.value = "";
    passwordConfirm.value = "";
  };
  
  return {
    step,
    stepCompleted,
    textTitle,
    textMention,
    btnText,
    isActive,
    submit,
    
    phoneNumber,
    authNumber,
    authBtnReady,
    authBtnText,
    isAuthSend,
    authCount,
    fetchAuthNumber,
    
    password,
    passwordConfirm,
    alertMessage,
    
    $reset
  };
}, {
  persist: {
    enabled: true,
    paths: [
      'phoneNumber',
      `password`,
    ]
  }}
);