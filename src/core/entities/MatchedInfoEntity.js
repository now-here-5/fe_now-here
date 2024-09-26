export class MatchedInfoEntity {
  /**
   * @param {string} senderNickname
   * @param {string} senderMbti
   * @param {string} senderGender
   * @param {string} receiverNickname
   * @param {string} receiverMbti
   * @param {string} receiverGender
   */
  constructor(matchedInfo) {
    this.senderNickname = matchedInfo.senderNickname
    this.senderMbti = matchedInfo.senderMbti
    this.senderGender = matchedInfo.senderGender
    this.receiverNickname = matchedInfo.receiverNickname
    this.receiverMbti = matchedInfo.receiverMbti
    this.receiverGender = matchedInfo.receiverGender
  }
}
