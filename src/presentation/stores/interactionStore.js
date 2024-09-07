import { InteractionRepository } from '@/infrastructure/repositories/InteractionRepository'
import { defineStore } from 'pinia'
// import { ref } from 'vue'

const interactionRepository = new InteractionRepository()

export const useInteractionStore = defineStore('interaction', () => {
  const postFeedback = async (body) => {
    const { data } = await interactionRepository.postFeedback(body)
    return data
  }

  return {
    postFeedback
  }
})
