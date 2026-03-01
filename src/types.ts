export interface Model {
  records: InventoryItem[];
  init: () => void;
  getAll: () => void;
  writeToDatabase: () => void;
  currentPage: string;
  searchResult: InventoryItem[];
}

export interface InventoryItem {
  id: number;
  name: string;
  keywords: string[];
  sectionId: string;
  imageUrl: string;
}

export type Dispatch = (action: "click") => void;
