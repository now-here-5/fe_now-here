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
const memberAccountRepository = new MemberAccountRepository();

export const useSettingStore = defineStore('setting', () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const eventStore = useEventStore();
	
	const notification = ref(true);
	const textContent = ref('');
	
	const getNotification = async () => {
		const response = await memberSettingRepository.getNotification();
		if (response.message === "알림 설정 변경에 성공했습니다.") {
			notification.value = response.data;
		}
	}
	const fetchNotification = async () => {
		notification.value = !notification.value
		const notificationForm = {
			notification: notification.value,
		};
		try {
			const response = await memberSettingRepository.patchNotification(notificationForm);
			return response.data;
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	};
	const logout = async () => {
		const event_id = eventStore.encodedId
		try {
			const response = await memberAuthRepository.deletLogout();
			if (response.message === "로그아웃에 성공했습니다.") {
				authStore.token = '';
				localStorage.clear();
				router.push(`/login/${event_id}`);
			}
			return response.data;
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	};
	const deleteAccount = async () => {
		const event_id = eventStore.encodedId
		const content = {
			content: textContent.value,
		};
		try {
			const response = await memberAccountRepository.deleteAccount(content);
			if (response.message === "회원탈퇴에 성공했습니다.") {
				authStore.token = '';
				localStorage.clear();
				router.push(`/login/${event_id}`);
			}
		} catch (error) {
			console.error('Error fetching feedback modal status:', error);
		}
	}
	
	return {
		notification,
		textContent,
		
		getNotification,
		fetchNotification,
		logout,
		deleteAccount,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			'notification',
		]
	}
});