import httpClient from '@/infrastructure/http//httpClient'

export const postAuthNumber = async (phone, authNum) => {
  const response = await httpClient.post(`/member/verify/code?phoneNumber=${phone}&code=${authNum}`);
  return response.data;
}
export const postRegister = async (encodedId, userData) => {
  const response = await httpClient.post(`/member/register/${encodedId}`, userData);
  return response.data;
}
export const getAuthNumber = async (eventId, phone) => {
  const response = await httpClient.get(`/member/verify/phone/${eventId}?phoneNumber=${phone}`);
  return response.data;
}
export const getIDDuplicate = async (eventId, ID) => {
  const response = await httpClient.get(  `/member/verify/account-id/${eventId}?accountId=${ID}`);
  return response.data;
}
export const getNameDuplicate = async (eventId, name) => {
  const response = await httpClient.get(`/member/verify/nickname/${eventId}?nickname=${name}`);
  return response.data;
}
export const deleteAccount = async (content) => {
  const response = await httpClient.delete(`/member/deactivate`, {
    data: content,
  });
  return response.data;
}