import StoreDictionaries from "@/tdf/store/modules/dictionaries";

export { parseTime, formatTime } from "@/tdf/utils";

// 菜单分类类型过滤
export function translateMenuCategory(state) {
  const dictionaries = StoreDictionaries.state.menuCategory;
  const index = dictionaries.findIndex(item => {
    return "" + state === item.key + "";
  });
  return index === -1 ? "" : dictionaries[index].value;
}
