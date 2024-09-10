import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MemberSettingRepository } from '@/infrastructure/repositories/MemberSettingRepository.js';
import { MemberAuthRepository } from '@/infrastructure/repositories/MemberAuthRepository.js';
import { MemberAccountRepository } from '@/infrastructure/repositories/MemberAccountRepository.js';
import { useAuthStore } from '@/presentation/stores/authStore.js';
import { useEventStore } from '@/presentation/stores/eventStore.js';

const memberSettingRepository = new MemberSettingRepository();
const memberAuthRepository = new MemberAuthRepository();

export const useSettingStore = defineStore('setting', () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const eventStore = useEventStore();
	
	const notification = ref(true);
	const textContent = ref('');
	
	const getNotiOption = async () => {
		const response = await memberSettingRepository.getNotification();
		console.log('response', response);
		if (response.message === "알림 설정 변경에 성공했습니다.") {
			notification.value = response.data;
			console.log('notification', notification.value);
		}
	}
	
	const fetchNotification = async () => {
		notification.value = !notification.value
		const notificationForm = {
			notification: notification.value,
		};
		console.log('notificationForm', notificationForm);
		try {
			const response = await memberSettingRepository.patchNotification(notificationForm);
			console.log('response', response);
			
			// response.data가 true일 때만 동작을 수행
			if (response.message === "알림 설정 변경에 성공했습니다.") {
				console.log(notification.value ? "알림 설정을 켭니다." : '알림 설정을 끕니다.');
				console.log('response.data', response.data);
			} else {
				console.log("피드백 모달을 표시하지 않습니다.");
			}
			
			return response.data;
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	};
	
	const logout = async () => {
		console.log('logout');
		console.log('notification', eventStore.encodedId);
		const event_id = eventStore.encodedId
		try {
			const response = await memberAuthRepository.deletLogout();
			console.log('response', response);
			if (response.message === "로그아웃에 성공했습니다.") {
				authStore.token = '';
				localStorage.removeItem('pinia'); // Pinia persist 데이터 제거
				localStorage.clear();
				router.push(`/login/${event_id}`);
			}
			return response.data;
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	};
	
	const deleteTo = async () => {
		console.log('deleteAccount');
		console.log('textContent', textContent.value);
		
		console.log('notification', eventStore.encodedId);
		const event_id = eventStore.encodedId
		
		const content = {
			content: textContent.value,
		};
		console.log('content', content);
		try {
			const response = await MemberAccountRepository.deleteAccount(content);
			console.log('response', response);
			if (response.message === "회원탈퇴에 성공했습니다.") {
				authStore.token = '';
				localStorage.removeItem('pinia'); // Pinia persist 데이터 제거
				localStorage.clear();
				router.push(`/login/${event_id}`);
			}
			return response.data;
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	}
	
	return {
		notification,
		textContent,
		
		getNotiOption,
		fetchNotification,
		logout,
		deleteTo,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'notification',
		]
	}
});