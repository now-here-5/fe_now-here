import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Review_InquiryRepository }  from "@/infrastructure/repositories/Review_InquiryRepository.js";
import { popupStore } from '@/presentation/stores/popupStore.js';

const review_InquiryRepository = new Review_InquiryRepository();

export const review_inquiryStore = defineStore('Review_inquiry', () => {
	const store_Popup = popupStore();
	
	const textContent = ref(''); // 초기 매치 동의 값을 false로 설정합니다.
	const inquiry_Num = ref('');
	const rate = ref(0);
	
	// 공통된 fetch 함수
	const submitFeedback = async (type) => {
		const content = textContent.value;
		let response;
		
		try {
			if (type === 'review') {
				const field = rate.value;
				response = await review_InquiryRepository.postReview(content, field);
				if (response.message.includes('FEEDBACK 생성에 성공')) {
					store_Popup.tostMessage = { visible: true, type: 'review' }; // type에 따라 상태 저장

					return true;
				}
			} else if (type === 'inquiry') {
				const phoneNumber = inquiry_Num.value;
				response = await review_InquiryRepository.postInquiry(content, phoneNumber);
				if (response.message.includes('INQUIRY 생성에 성공')) {
					store_Popup.tostMessage = { visible: true, type: 'inquiry' }; // type에 따라 상태 저장

					return true;
				}
			}
			
			console.log("피드백 모달을 표시하지 않습니다.");
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	};
	
	return {
		textContent,
		inquiry_Num,
		rate,
		
		submitFeedback,
	};
}, {
	persist: {
		enabled: true,
		paths: [
		]
	}
});