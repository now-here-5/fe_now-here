import { defineStore } from 'pinia'
import { TodoRepository } from '../../infrastructure/repositories/exampleRepository'
import { AddTodoUseCase } from '../../core/usecases/AddExample'

// store 레이어: Pinia를 사용해 상태 관리와 유스케이스 호출을 담당

const todoRepository = new TodoRepository()
const addTodoUseCase = AddTodoUseCase(todoRepository)

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    async loadTodos() {
      this.todos = await todoRepository.fetchTodos()
    },
    async addTodo(title, description) {
      const newTodo = await addTodoUseCase(title, description)
      this.todos.push(newTodo)
    }
    // 추가적인 액션들...
  }
})
