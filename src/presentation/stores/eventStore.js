import { defineStore } from 'pinia';
import { ref } from 'vue';
import { EventDetailRepository } from '@/infrastructure/repositories/eventDetailRepository.js';

const eventDetailRepository = new EventDetailRepository();

export const eventStore = defineStore('event', () => {
	const event_detail = ref({});
	
	const encodedId = ref('')
	const endsAt = ref('')
	const eventId = ref(null)
	const eventName = ref('')
	const location = ref('')
	const startsAt = ref('')
	const status = ref(null)
	
	const fetchEventDetail = async ( store ) => {
		try {
			const data = await eventDetailRepository.getEventDetail();
			
			if (data) {
				store.event_detail = data;
				console.log('event_detail:', store.event_detail);
				
				store.encodedId = data.encodedId;
				console.log('encodedId:', store.encodedId);
				
				store.endsAt = data.endsAt;
				console.log('endsAt:', store.endsAt);
				
				store.eventId = data.eventId;
				console.log('eventId:', store.eventId);
				
				store.eventName = data.eventName;
				console.log('eventName:', store.eventName);
				
				store.location = data.location;
				console.log('location:', store.location);
				
				store.startsAt = data.startsAt;
				console.log('startsAt:', store.startsAt);
				
				store.status = data.status;
				console.log('status:', store.status);
			} else {
				status.value = false;
				console.error('No event detail found');
			}
		} catch (error) {
			status.value = false;
			console.error('Event detail fetch failed:', error);
		}
	};
	
	// 상태와 메서드를 return 해야 컴포넌트에서 사용할 수 있습니다.
	return {
		event_detail,
		
		encodedId,
		endsAt,
		eventId,
		eventName,
		location,
		startsAt,
		status,
		
		fetchEventDetail,
	};
}, {
	persist: {
		enabled: true,
		paths: [
			`encodedId`,
			`endsAt`,
			`eventId`,
			`eventName`,
			`location`,
			`startsAt`,
			`status`,
		]
	}
});