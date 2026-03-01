import path from "path";
import fs from "fs";
import { fileurltopath } from "url";
import type { model, inventoryitem } from "./types";

const __filename = fileurltopath(import.meta.url);
const __dirname = path.dirname(__filename);

const data_path = path.join(
  __dirname,
  "..",
  "database",
  "inventoryrecord.json",
);

const model: model = {
  records: [] as inventoryitem[],
  searchresult: [] as inventoryitem[],
  currentpage: "home",

  init: () => {
    const filecontent = fs.readfilesync(data_path, "utf-8");
    const loadrecords = json.parse(filecontent) as inventoryitem[];
    model.records = structuredclone(loadrecords);
  },

  getall: () => {
    return model.records;
  },

  writeToDatabase: () => {
    return model.records;
  },
};

export { model };
