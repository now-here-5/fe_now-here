// 입력 숫자 제한, 최대 11자리 입력, 3/4자리마다 '-' 추가
export const formPhoneNumber = (phoneNumber) => {
  let number = phoneNumber.replace(/[^0-9]/g, '');
  if (number.length > 3 && number.length <= 7) {
    number = number.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (number.length > 7) {
    number = number.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  }
  return number;  // 변경된 값을 반환
};
// 000-0000-0000 형식 -> 00000000000 형식으로 변경
export const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[^0-9]/g, '');  // 숫자만 남긴 값을 반환
}
// 입력 숫자 제한, 최대 4자리 입력
export const formPassword = (password) => {
  return password.replace(/[^0-9]/g, '').slice(0, 4);  // 처리된 값을 반환
};