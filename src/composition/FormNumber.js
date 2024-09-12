export const formPhoneNumber = (phoneNumber) => {
  let number = phoneNumber.replace(/[^0-9]/g, '');
  if (number.length > 3 && number.length <= 7) {
    number = number.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (number.length > 7) {
    number = number.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  }
  return number;
};
export const formID = (id) => {
  return id.replace(/[^a-z0-9]/g, '');
};
export const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[^0-9]/g, '');
}
export const formPassword = (password) => {
  return password.replace(/[^0-9]/g, '').slice(0, 4);
};