import {InventoryItem, pageState} from "../model/model";
import { idCount } from "../model/model";
import { inventory } from "../model/model";
import { UpdateView } from "../app";
import { searchResult } from "../model/model";

function AddInventoryItem(item: InventoryItem): InventoryItem {
    inventory.push(item);
    return item;
}

export function RegisterInventoryItem(name: string, keywords: string[], sectionId: string, imageUrl: string): void {
   const newItem:  InventoryItem = {
       id: idCount.idNumber++,
       name: name,
       keywords: keywords,
       sectionId: sectionId,
       imageUrl: imageUrl
    } 
    AddInventoryItem(newItem);
   console.log(newItem);
   console.log("Item added to inventory");
   pageState.currentPage = "home";
   UpdateView();
}
export function FilterInventory(searchValue: string){
    const filteredItems: InventoryItem[] = [];
    inventory.forEach((item: InventoryItem) => {
        if(item.name.toLowerCase().includes(searchValue.toLowerCase())){
            console.log("Found match in", item);
            filteredItems.push(item);
        }
    })
    
    pageState.currentPage = "searchResult"
    filteredItems.forEach( (item: InventoryItem) => {
        searchResult.push(item);
    })
    UpdateView();
    return filteredItems;
}