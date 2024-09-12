import { defineStore } from 'pinia'
import { ref } from 'vue';
import { InteractionRepository } from '@/infrastructure/repositories/InteractionRepository'
import { usePopupStore } from '@/presentation/stores/popupStore.js';

const interactionRepository = new InteractionRepository()

export const useInteractionStore = defineStore('interaction', () => {
  const popupStore = usePopupStore();
  
  const textContent = ref('');
  const email = ref('');
  const rate = ref(0);
  
  const prepareData = (type) => {
    if (type === 'inquiry') {
      return {
        content: textContent.value,
        email: email.value,
      };
    } else {
      return {
        content: textContent.value,
        field: rate.value,
      };
    }
  };
  const sendRequest = async (type, data) => {
    if (type === 'inquiry') {
      return await interactionRepository.postInquiry(data);
    } else {
      return await interactionRepository.postFeedback(data);
    }
  };
  const sendInteraction = async (type) => {
    const data = prepareData(type);
    const response = await sendRequest(type, data);
    if (response.data.message.includes(`${type.toUpperCase()} 생성에 성공했습니다.`)) {
      popupStore.tostMessage = { visible: true, type: `${type}` };
      return true;
    }
  };
  
  const postFeedback = async (body) => {
    const { data } = await interactionRepository.postFeedback(body)
    return data
  }

  return {
    textContent,
    email,
    rate,
    
    sendInteraction,
    
    postFeedback,
  }
});