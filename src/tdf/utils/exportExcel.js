// 导出excel方法
// import FileSaver from 'file-saver'
import XLSX from "xlsx";

export function exportExcelAllField(excelFileName, jsonData) {
  const ws = XLSX.utils.json_to_sheet(jsonData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, excelFileName);
}
