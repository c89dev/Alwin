import { InventoryItem } from "./types";

export async function RequestInventory(): Promise<InventoryItem[]> {
  console.log("1. Sending request to server...");

  const response = await fetch("http://localhost:3000/api/inventory");
  const data = await response.json();

  console.log("2. Data recieved successfully!");
  console.log("3. Inventory content:", data);

  return data;
}

async function PostToInventory(item: InventoryItem) {
  // inventory.push(item);
  return item;
}
//
// export function RegisterInventoryItem(name: string, keywords: string[], sectionId: string, imageUrl: string): void {
//    const newItem:  InventoryItem = {
//        id: idCount.idNumber++,
//        name: name,
//        keywords: keywords,
//        sectionId: sectionId,
//        imageUrl: imageUrl
//     }
//     AddInventoryItem(newItem);
//    console.log(newItem);
//    console.log("Item added to inventory");
//    pageState.currentPage = "home";
//    UpdateView();
// }
// export function FilterInventory(searchValue: string){
//     const inventory = InventoryModel.getAll();
//     const filteredItems: InventoryItem[] = [];
//     inventory.forEach((item: InventoryItem) => {
//         if(item.name.toLowerCase().includes(searchValue.toLowerCase())){
//             console.log("Found match in", item);
//             filteredItems.push(item);
//         }
//     })
//
//     pageState.currentPage = "searchResult"
//     filteredItems.forEach( (item: InventoryItem) => {
//         searchResult.push(item);
//     })
//     UpdateView();
//     return filteredItems;
// }
