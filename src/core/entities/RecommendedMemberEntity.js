// example: Todo 엔티티를 표현하는 클래스
export class RecommendedMemberEntity {
  /**
   * @param {number} memberId
   * @param {string} nickname
   * @param {string} mbti
   * @param {Date} birthdate
   * @param {string} gender
   * @param {string} description
   * @param {string} phoneNumber
   */
  constructor(member) {
    this.memberId = member.memberId
    this.nickname = member.nickname
    this.mbti = member.mbti
    this.birthdate = member.birthdate
    this.gender = member.gender
    this.description = member.description
    if (member.phoneNumber) this.phoneNumber = member.phoneNumber
  }
}
