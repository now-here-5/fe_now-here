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
  const duplicateModal = ref(false);
  const authErrorModal = ref(false);
  const completeModal = ref(false);
  
  const modalSTitle = computed(() => {
    if (completeModal.value) {
      return `${profileSignupStore.selectedMBTI} ${profileSignupStore.name}님 <br> 회원가입 완료`;
    } else {
      return "알림";
    }
  });
  const closeModal = () => {
    if (duplicateModal.value) {
      duplicateModal.value = false;
    }
    if (authErrorModal.value) {
      authErrorModal.value = false;
    }
    if (completeModal.value) {
      completeModal.value = false;
      router.push('/match');
    }
  };
  //M_L
  const modalLVisible = ref({
    review: false,
    matchLanding: false,
    heart: false,
    cardL: false,
    withdraw: false,
  });
  
  const fetchFeedbackModal = async () => {
    try {
      const response = await interactionRepository.getFeedbackModal();
      if (response.data === true) {
        modalLVisible.value.review = true;
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback modal status:', error);
    }
  };
  //TM
  const toastMessage = ref({ visible: false, type: '' });
  
  return {
    //BS
    bottomSheetVisible,
    agreeState,
    termType,
    
    //M_S
    duplicateModal,
    authErrorModal,
    completeModal,
    modalSTitle,
    
    closeModal,
    
    //M_L
    modalLVisible,
    
    fetchFeedbackModal,
    
    //TM
    toastMessage,
  };
}, {
  persist: {
    enabled: true,
    paths: [
      `matchAgree`,
    ]
  }
});