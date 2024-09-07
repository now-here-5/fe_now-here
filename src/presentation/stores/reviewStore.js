import { defineStore } from 'pinia'
// import { TodoRepository } from '../../infrastructure/repositories/ExampleRepository'
// import { AddTodoUseCase } from '../../core/usecases/AddExample'

// store 레이어: Pinia를 사용해 상태 관리와 유스케이스 호출을 담당

// const todoRepository = new TodoRepository()
// const addTodoUseCase = AddTodoUseCase(todoRepository)

export const useReviewStore = defineStore('review', {
  state: () => ({})
  //   actions: {
  //     async sendDirectReview(review) {
  //         return await
  //     //   this.todos = await todoRepository.fetchTodos()
  //     },

  //   }
})

//review_inquirySotre에 통합 하면 좋을 듯 이미 거기에 보내는 게 있음