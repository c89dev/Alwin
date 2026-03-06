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

// Server Instance

const server = http.createServer((req, res) => {
    if (req.url === "/api/loadinventory" && req.method === "GET") {
        const fileContent = fs.readFileSync(DATA_PATH, "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = JSON.parse(fileContent);
        res.end(JSON.stringify(data));
    } else if (req.url === "/api/loadidcount" && req.method === "GET") {
        const idCounter = fs.readFileSync(ID_PATH, "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = JSON.parse(idCounter);
        res.end(JSON.stringify(data));
    } else if (req.url === "/api/saveinventory" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);

            fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
        });
    } else if (req.url === "/api/saveidcount" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);

            fs.writeFileSync(ID_PATH, JSON.stringify(data, null, 2));

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "blyat" }));
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
