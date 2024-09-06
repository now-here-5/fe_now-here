import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { EventIdValidRepository } from '@/infrastructure/repositories/EventIdValidRepository.js';
import { LoginRepository } from "@/infrastructure/repositories/LoginRepository.js";
import { eventStore } from '@/presentation/stores/eventStore.js';
import { authStore } from '@/presentation/stores/authStore.js';

const eventIdValidRepository = new EventIdValidRepository();
const loginRepository = new LoginRepository();
const store_Event = eventStore();
const store_Auth = authStore();

export const loginStore = defineStore('login', () => {
	const router = useRouter();
	
	const phone = ref('');
	const password = ref('');
	const encodedId = ref('');
	
	const alertMessage = ref('');
	
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
	
	const eventList = ref([]);
	const fetchEventList = async () => {
		try {
			const data = await eventIdValidRepository.getEventList();
			eventList.value = data.eventList;
			console.log('eventList:', eventList.value);
		} catch (error) {
			console.error('Event detail fetch failed:', error);
		}
	};
	const checkEventExistence = async ( store ) => {
		if (eventList.value.length === 0) {
			// 이벤트 리스트가 없는 경우 먼저 리스트를 가져옴
			await fetchEventList();
		}
		
		const event = eventList.value.find(event => event.encodedId === encodedId.value);
		if (event) {
			store.event_detail = event;
			console.log('store event_detail:', store.event_detail);
			
			store.encodedId = event.encodedId;
			console.log('store encodedId:', store.encodedId);
			store.endsAt = event.endsAt;
			console.log('store endsAt:', store.endsAt);
			store.eventId = event.eventId;
			console.log('store eventId:', store.eventId);
			store.eventName = event.eventName;
			console.log('store eventName:', store.eventName);
			store.location = event.location;
			console.log('store location:', store.location);
			store.startsAt = event.startsAt;
			console.log('store startsAt:', store.startsAt);
			store.status = event.status;
			console.log('store status:', store.status);
			
			return true;
		}
		
		return false;
	};
	
	const login = async () => {
		// 전화번호에서 하이픈(-)을 제거하여 숫자만 남김
		const cleanPhoneNumber = phone.value.replace(/-/g, '');
		console.log('cleanPhoneNumber:', cleanPhoneNumber);
		console.log('password:', password.value);
		
		const loginData = {
			phone: cleanPhoneNumber,
			password: password.value,
		};
		
		console.log('loginData:', loginData);
		console.log('encodedId:', encodedId.value);
		
		try {
			const response = await loginRepository.postLogin(encodedId.value, loginData);
      if (response.message !== "로그인에 실패했습니다.") {
        console.log('Login success:', response);
	      store_Auth.token = response.data.token.token
	      console.log('store_Auth.token:', store_Auth.token);
				
				router.push({ name: 'home' });
      } else {
				console.error('Login failed:', response.message);
        alertMessage.value =  `휴대폰 번호 또는 비밀번호가 잘못되었습니다.<br>확인 후 다시 입력해 주세요.`;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
	}
	
	return {
		phone,
		password,
		encodedId,
		
		alertMessage,
		
		bottomSheetVisible,
		agreeState,
		termType,
		
		eventList,
		fetchEventList,
		checkEventExistence,
		
		login,
	};
}, {
	persist: {
		enabled: true,
		paths: [
		]
	}
});