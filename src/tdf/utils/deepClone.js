export function deepClone(obj) {
  if (obj === null) {
    return;
  }
  const newObj = obj.push ? [] : {}; // 如果obj有push方法则 定义newObj为数组，否则为对象。
  for (const attr in obj) {
    if (typeof obj[attr] === "object") {
      newObj[attr] = deepClone(obj[attr]);
    } else {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
}
