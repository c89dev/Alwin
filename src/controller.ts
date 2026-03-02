import { InventoryItem } from "./types";
import { currentRecords } from "./app";
import { UpdateMainView } from "./mainCmp";

var currentPage = "home";
export var searchResult: InventoryItem[] = [];

export function SetPage(page: string) {
  currentPage = page;
}
export function GetPage(): string {
  return currentPage;
}

export async function RequestInventory(): Promise<InventoryItem[]> {
  console.log("1. Sending request to server...");

  const response = await fetch("http://localhost:3000/api/inventory");
  const data = await response.json();

  console.log("2. Data recieved successfully!");
  console.log("3. Inventory content:", data);

  return data;
}

async function SaveToDatabase(item: InventoryItem) {
  console.log("Save to DB: ", item);
  return item;
}
//
export function RegisterInventoryItem(
  name: string,
  keywords: string[],
  sectionId: string,
  imageUrl: string,
): void {
  const newItem: InventoryItem = {
    name: name,
    keywords: keywords,
    sectionId: sectionId,
    imageUrl: imageUrl,
  };
  currentRecords.push(newItem);
  SaveToDatabase(newItem);
  console.log(newItem);
  console.log("Item added to inventory");
  SetPage("home");
  UpdateMainView(currentRecords, "home");
}
//
export function FilterInventory(searchValue: string) {
  console.log("Filtering started...");
  const database = currentRecords;
  const filteredItems: InventoryItem[] = [];
  database.forEach((item: InventoryItem) => {
    if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
      console.log("Found match in", item);
      filteredItems.push(item);
    }
  });
  filteredItems.forEach((item: InventoryItem) => {
    searchResult.push(item);
  });

  SetPage("searchResult");
  console.log(GetPage());
  UpdateMainView(searchResult, GetPage());
}
