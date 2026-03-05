import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import type { InventoryItem } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(
    __dirname,
    "..",
    "database",
    "inventoryrecord.json",
);

const ID_PATH = path.join(__dirname, "..", "database", "idcounter.json");

const idCounter = fs.readFileSync(ID_PATH, "utf-8");
const fileContent = fs.readFileSync(DATA_PATH, "utf-8");

// Server Instance

const server = http.createServer((req, res) => {
    if (req.url === "/api/loadinventory" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = JSON.parse(fileContent);
        res.end(JSON.stringify(data));
    } else if (req.url === "/api/idcount" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = JSON.parse(idCounter);
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "blyat" }));
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
