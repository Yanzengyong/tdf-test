/**
 * 手机号格式验证
 * @param value
 * @returns {boolean}
 */
export const isPhone = function(value) {
  const pattern = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
  if (pattern.test(value)) {
    return true;
  }
  return false;
};

/**
 * 邮箱格式验证
 * @param value
 * @returns {boolean}
 */
export const isMail = function(value) {
  const pattern = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
  if (pattern.test(value)) {
    return true;
  }
  return false;
};

/**
 * 密码格式验证（数字，字母，下划线）
 * @param value
 * @returns {boolean}
 */
export const isPassword = function(value) {
  const pattern = "^[\u4E00-\u9FA5a-zA-Z0-9_]*$";
  const regus = new RegExp(pattern);
  if (regus.test(value)) {
    return true;
  }
  return false;
};

/**
 * 只能为数字
 * @param value
 * @returns {boolean}
 */
export const isNum = function(value) {
  const pattern = /^[0-9]*$/;
  if (pattern.test(value)) {
    return true;
  }
  return false;
};
