export interface ICategory {
  title: string;
  limit: number;
  id: string | null;
}

export interface ICategoryPayload {
  title: string;
  limit: number;
}

export interface ICategoryEditPayload {
  title: string;
  limit: number;
  id: string;
}

export interface ICategoryDeletePayload {
  id: string;
}

export interface ICategoryEditPayloadMutation {
  title: string;
  limit: number;
  id: string;
}

export interface CategoryStateInterface {
  categories: ICategory[]
}