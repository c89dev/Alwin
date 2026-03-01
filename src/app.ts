import { InventoryItem, Dispatch } from "./types";
import { model } from "./model";
// import { RegisterInventoryItem, FilterInventory } from "./controller";
import { HeaderComponent } from "./headerCmp";
import { UpdateMainView } from "./mainCmp";
import { RequestInventory } from "./controller";

const currentRecords = await RequestInventory();
const currentPage = "home";

HeaderComponent();
UpdateMainView(currentRecords, currentPage);

const dispatch: Dispatch = (action) => {};
export { currentRecords };
