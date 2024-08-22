// example: Todo 엔티티를 표현하는 클래스
export class Todo {
  /**
   * @param {string} id - 고유 식별자
   * @param {string} title - 할 일의 제목
   * @param {string} description - 할 일의 세부 설명 (선택 사항)
   * @param {boolean} completed - 완료 여부
   * @param {Date} createdAt - 생성 일시
   * @param {Date} updatedAt - 마지막 수정 일시 (선택 사항)
   */
  constructor(id, title, description, completed, createdAt, updatedAt = null) {
    this.id = id
    this.title = title
    this.description = description || '' // description은 선택 사항
    this.completed = completed
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  // 할 일의 상태를 완료로 변경하는 메서드
  markAsCompleted() {
    this.completed = true
    this.updatedAt = new Date()
  }
}
