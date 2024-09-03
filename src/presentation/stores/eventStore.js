import { EventRepository } from '@/infrastructure/repositories/eventRepository'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const eventRepository = new EventRepository()

export const useEventStore = defineStore('event', () => {
  const eventEndsAt = ref('')

  const fetchEventEndsAt = async () => {
    const { data } = await eventRepository.getEventEndsAt()
    eventEndsAt.value = data.eventTime
  }

  return {
    eventEndsAt,
    fetchEventEndsAt
  }
})
