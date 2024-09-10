import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { InteractionRepository } from '@/infrastructure/repositories/InteractionRepository.js';
import { useProfileSignupStore } from '@/presentation/stores/signupSub/profileSignupStore.js';

const interactionRepository = new InteractionRepository();

export const usePopupStore = defineStore('popup', () => {
  const router = useRouter();
  const profileSignupStore = useProfileSignupStore();
  
  //BS
  const bottomSheetVisible = ref({
    agree: false,   // 약관 동의 하단 시트
    terms: false,   // 개별 약관 하단 시트
  });
  const agreeState = ref({
    service: false,
    privacy: false,
    all: false
  });
  const termType = ref('');
  
  //M_S
  const ModalS_duplicated = ref(false);
  const ModalS_authError = ref(false);
  const ModalS_completed = ref(false);
  
  const modalSTitle = computed(() => {
    if (ModalS_completed.value) {
      return `${profileSignupStore.selectedMBTI} ${profileSignupStore.name}님 <br> 회원가입 완료`;
    } else {
      return "알림";
    }
  });
  const closeModal = () => {
    if (ModalS_duplicated.value) {
      ModalS_duplicated.value = false;
    }
    if (ModalS_authError.value) {
      ModalS_authError.value = false;
    }
    if (ModalS_completed.value) {
      ModalS_completed.value = false;
      router.push('/match');
    }
  };
  
  //M_L
  const modalL_review = ref(false);
  const modalL_matchLanding = ref(false);
  const modalL_heart = ref(false);
  const modalL_cardL = ref(false);
  const modalL_withdraw = ref(false);
  
  const matchAgree = ref(false); // 초기 매치 동의 값을 false로 설정합니다.
  
  const getReviewModalTF = async () => {
    try {
      const response = await interactionRepository.getFeedbackModal();
      console.log('response', response);
      
      // response.data가 true일 때만 동작을 수행
      if (response.data === true) {
        modalL_review.value = true;
      } else {
        console.log("피드백 모달을 표시하지 않습니다.");
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback modal status:', error);
    }
  };
  
  //TM
  const tostMessage = ref({ visible: false, type: '' });
  
  return {
    //BS
    bottomSheetVisible,
    agreeState,
    termType,
    
    //M_S
    ModalS_duplicated,
    ModalS_authError,
    ModalS_completed,
    modalSTitle,
    
    closeModal,
    
    //M_L
    modalL_review,
    modalL_matchLanding,
    modalL_heart,
    modalL_cardL,
    modalL_withdraw,
    matchAgree,
    
    getReviewModalTF,
    
    //TM
    tostMessage,
  };
}, {
  persist: {
    enabled: true,
    paths: [
      `matchAgree`,
    ]
  }
});