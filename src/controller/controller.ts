import { InventoryItem } from "../model/model";
import { idCount } from "../model/model";

function AddInventoryItem(item: InventoryItem): InventoryItem {
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
    AddInventoryItem(newItem)
}