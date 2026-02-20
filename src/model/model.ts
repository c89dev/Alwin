// const inventoryItem : {id: number, name: string, keywords: Array<string>, imageUrl: string} = {
//     id: 1,
//     name: "Duct tape",
//     keywords: ["tape", "adhesive", "sticky"],
//     imageUrl: "./media/image/tape.png",
// }
export const pageState = {currentPage: "home"};

export const idCount = {idNumber: 0}; 

export interface InventoryItem {
    id: number;
    name: string;
    keywords: string[];
    sectionId: string;
    imageUrl: string;
    
}

const inventory = [
    
]