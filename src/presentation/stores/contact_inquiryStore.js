import { defineStore } from 'pinia';
import { ref } from 'vue';
import { InquiryReviewRepository }  from "@/infrastructure/repositories/Inquiry_ReviewRepository.js";
import { useRouter } from 'vue-router';

const inquiryReviewRepository = new InquiryReviewRepository();

export const contact_inquiryStore = defineStore('contact_inquiry', () => {
	const textContent = ref(''); // 초기 매치 동의 값을 false로 설정합니다.
	const number = ref('');
	const rate = ref(0);
	const tostM_inquiry = ref(false);
	const tostM_review = ref(false);
	
	const fetchInquiry = async () => {
		const content = textContent.value;
		const phoneNumber = number.value;
		console.log('content', content);
		console.log('phoneNumber', phoneNumber);
		
		try {
			const response = await inquiryReviewRepository.postInquiry(content, phoneNumber);
			console.log('response', response);
			
			// response.data가 true일 때만 동작을 수행
			if (response.message === `INQUIRY 생성에 성공했습니다.`) {
				tostM_inquiry.value = true;
				return true;
			} else {
				console.log("피드백 모달을 표시하지 않습니다.");
			}
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	};
	const fetchReview = async () => {
		const content = textContent.value;
		const field = rate.value;
		console.log('content', content);
		console.log('field', field);
		
		try {
			const response = await inquiryReviewRepository.postReview(content, field);
			console.log('response', response);
			
			// response.data가 true일 때만 동작을 수행
			if (response.message === `FEEDBACK 생성에 성공했습니다.`) {
				tostM_review.value = true;
				return true;
			} else {
				console.log("피드백 모달을 표시하지 않습니다.");
			}
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	};
	
	
	return {
		textContent,
		number,
		rate,
		
		tostM_inquiry,
		tostM_review,
		
		fetchInquiry,
		fetchReview,
	};
}, {
	persist: {
		enabled: true,
		paths: [
		]
	}
});