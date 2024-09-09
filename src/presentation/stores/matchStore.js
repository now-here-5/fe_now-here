import { defineStore } from 'pinia';
import { ref } from 'vue';
import { FeedbackRepository } from '@/infrastructure/repositories/FeedbackRepository.js';

const feedbackRepository = new FeedbackRepository();

export const useMatchStore = defineStore('match', () => {
	const matchAgree = ref(false); // 초기 매치 동의 값을 false로 설정합니다.
	
	const modalL_review = ref(false);
	
	const getFeedbackModalTF = async () => {
		try {
			const response = await feedbackRepository.getFeedbackTF();
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
	
	return {
		matchAgree,
		modalL_review,
		getFeedbackModalTF,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			`matchAgree`,
		]
	}
});