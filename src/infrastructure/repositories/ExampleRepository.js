import { getTodos, addTodo } from '../http/api/exampleApi'

// 레포지토리 레이어: API 호출을 추상화하여 비즈니스 로직과 데이터 소스를 분리

export class TodoRepository {
  async fetchTodos() {
    return await getTodos()
  }

  async add(todo) {
    return await addTodo(todo)
  }

  // 필요에 따라 다른 데이터 조작 메서드 추가...
}
