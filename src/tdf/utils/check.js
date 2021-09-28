export const checkPhone = function(phone) {
  return !/^1(3|4|5|7|8)\d{9}$/.test(phone) || phone.length !== 11
    ? false
    : true;
};
export const checkEmail = function(email) {
  return !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
    email
  )
    ? false
    : true;
};
