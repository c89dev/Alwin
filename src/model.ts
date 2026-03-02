import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import type { Model, InventoryItem } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(
  __dirname,
  "..",
  "database",
  "inventoryrecord.json",
);

const model: Model = {
  records: [] as InventoryItem[],
  searchResult: [] as InventoryItem[],
  currentPage: "home",

  init: () => {
    const fileContent = fs.readFileSync(DATA_PATH, "utf-8");
    const loadRecords = JSON.parse(fileContent) as InventoryItem[];
    model.records = structuredClone(loadRecords);
  },

  getAll: () => {
    return model.records;
  },

  writeToDatabase: () => {
    return model.records;
  },
};

export { model };
