import { Todo } from '../entities/ExampleEntity'

// 예시용 usecase
// usecase는 비즈니스 로직을 담당
export function AddTodoUseCase(todoRepository) {
  return function (title, description) {
    const newTodo = new Todo(
      Date.now().toString(), // 간단한 고유 ID 생성
      title,
      description,
      false, // 새로운 Todo는 완료되지 않은 상태
      new Date()
    )
    return todoRepository.add(newTodo)
  }
}
