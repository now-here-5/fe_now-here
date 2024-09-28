export class RecommendedMemberEntity {
  /**
   * @param {Object} member - Member information object
   * @param {number} member.memberId
   * @param {string} member.nickname
   * @param {string} member.mbti
   * @param {Date} member.birthdate
   * @param {string} member.gender
   * @param {string} member.description
   * @param {string} [member.phoneNumber] - Optional phone number
   * @param {boolean} [member.notificationOn=false] - Optional notification flag
   */
  constructor({
    memberId,
    nickname,
    mbti,
    birthdate,
    gender,
    description,
    phoneNumber = '',
    notificationOn = false
  }) {
    this.memberId = memberId
    this.nickname = nickname
    this.mbti = mbti
    this.birthdate = birthdate
    this.gender = gender
    this.description = description
    this.phoneNumber = phoneNumber
    this.notificationOn = notificationOn
  }
}
