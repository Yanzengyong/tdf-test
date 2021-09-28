// 检测界面元素权限
export function hasPermissionforviews(data) {
  if (data !== "" && data !== null && data !== undefined) {
    // 获取元素的权限
    const elements = this.$q.localStorage.getItem("elements");
    // 获取具体类型元素的权限数组
    if (elements) {
      return elements.includes(data);
    } else {
      return false;
    }
  } else {
    return false;
  }
}
