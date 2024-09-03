export class MatchedInfoEntity {
  /**
   * @param {string} senderNickname
   * @param {string} senderMbti
   * @param {string} receiverNickname
   * @param {string} receiverMbti
   */
  constructor(matchedInfo) {
    this.senderNickname = matchedInfo.senderNickname
    this.senderMbti = matchedInfo.senderMbti
    this.receiverNickname = matchedInfo.receiverNickname
    this.receiverMbti = matchedInfo.receiverMbti
  }
}
