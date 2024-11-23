interface Column {
  columnName: string;
  value: string;
}

interface RowData {
  rowValue: number;
  sheetName: string;
  columns: Column[];
}

export type RawsResponse = RowData[];
export type RawResponse = RowData;
