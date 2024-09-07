import { defineStore } from 'pinia'
import { ref } from 'vue'
import { EventIdValidRepository } from '@/infrastructure/repositories/EventIdValidRepository.js'
import { EventDetailRepository } from '@/infrastructure/repositories/EventDetailRepository.js'
import { EventRepository } from '@/infrastructure/repositories/eventRepository'

const eventIdValidRepository = new EventIdValidRepository()
const eventDetailRepository = new EventDetailRepository()

const eventRepository = new EventRepository()

export const eventStore = defineStore(
  'event',
  () => {
    const event_detail = ref({})
    const eventList = ref([])

    const encodedId = ref('')
    const endsAt = ref('')
    const eventId = ref(null)
    const eventName = ref('')
    const location = ref('')
    const startsAt = ref('')
    const status = ref(null)

    const eventEndsAt = ref('')

    const setEventData = (data) => {
      event_detail.value = data
      encodedId.value = data.encodedId
      endsAt.value = data.endsAt
      eventId.value = data.eventId
      eventName.value = data.eventName
      location.value = data.location
      startsAt.value = data.startsAt
      status.value = data.status
    }

    const fetchEventList = async () => {
      try {
        const data = await eventIdValidRepository.getEventList()
        eventList.value = data.eventList
      } catch (error) {
        console.error('Event detail fetch failed:', error)
      }
    }
    const checkEventExistence = async () => {
      if (eventList.value.length === 0) {
        await fetchEventList()
      }

      const data = eventList.value.find((event) => event.encodedId === encodedId.value)
      if (data) {
        setEventData(data) // 공통 로직 사용
        return true
      }

      return false
    }

    const fetchEventDetail = async () => {
      try {
        const data = await eventDetailRepository.getEventDetail()

        if (data) {
          setEventData(data) // 공통 로직 사용
        } else {
          status.value = false
          console.error('No event detail found')
        }
      } catch (error) {
        status.value = false
        console.error('Event detail fetch failed:', error)
      }
    }

    const fetchEventEndsAt = async () => {
      const { data } = await eventRepository.getEventEndsAt()
      eventEndsAt.value = data.eventTime
    }

    // 상태와 메서드를 return 해야 컴포넌트에서 사용할 수 있습니다.
    return {
      event_detail,
      eventList,
      encodedId,
      endsAt,
      eventId,
      eventName,
      location,
      startsAt,
      status,

      checkEventExistence,
      fetchEventDetail,
      fetchEventEndsAt
    }
  },
  {
    persist: {
      enabled: true,
      paths: [`encodedId`, `endsAt`, `eventId`, `eventName`, `location`, `startsAt`, `status`]
    }
  }
)
