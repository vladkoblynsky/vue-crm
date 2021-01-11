export interface IRecord {
  id: string;
  amount: number;
  date: string;
  description: string;
  categoryId: string;
  type: boolean;
}

export interface IRecordPayload {
  amount: number;
  date: string;
  description: string;
  categoryId: string;
  type: boolean;
}

export interface RecordStateInterface {
  records: IRecord[]
}