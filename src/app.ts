import { InventoryItem, Dispatch } from "./types";
import { model } from "./model";
// import { RegisterInventoryItem, FilterInventory } from "./controller";
import { UpdateHeaderView } from "./headerCmp";
import { UpdateMainView } from "./mainCmp";
import { RequestInventory, GetPage } from "./controller";

const currentRecords = await RequestInventory();

UpdateHeaderView();
UpdateMainView(currentRecords, GetPage());

const dispatch: Dispatch = (action) => {};

export { currentRecords };
