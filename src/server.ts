import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import type { InventoryItem } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- ROOT + DATA PATHS ---------------- */

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");

const INVENTORY_PATH = path.join(DATA_DIR, "inventory.json");
const ID_PATH = path.join(DATA_DIR, "idcounter.json");

/* ---------------- HELPER FUNCTIONS ---------------- */

function sendJSON(res: http.ServerResponse, data: unknown, status = 200) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

function readJSON(filePath: string) {
    const file = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
}

function writeJSON(filePath: string, data: unknown) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function enableCORS(res: http.ServerResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

/* ---------------- SERVER ---------------- */

const server = http.createServer((req, res) => {
    enableCORS(res);

    /* Preflight request (browser CORS check) */
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = req.url ?? "";

    try {
        /* -------- INVENTORY -------- */

        if (req.method === "GET" && url === "/api/inventory") {
            const data: InventoryItem[] = readJSON(INVENTORY_PATH);
            sendJSON(res, data);
            return;
        }

        if (req.method === "POST" && url === "/api/inventory") {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                try {
                    const data = JSON.parse(body);
                    writeJSON(INVENTORY_PATH, data);
                    sendJSON(res, { success: true });
                } catch {
                    sendJSON(res, { error: "Invalid JSON" }, 400);
                }
            });

            return;
        }

        /* -------- ID COUNTER -------- */

        if (req.method === "GET" && url === "/api/idcounter") {
            const data = readJSON(ID_PATH);
            sendJSON(res, data);
            return;
        }

        if (req.method === "POST" && url === "/api/idcounter") {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                try {
                    const data = JSON.parse(body);
                    writeJSON(ID_PATH, data);
                    sendJSON(res, { success: true });
                } catch {
                    sendJSON(res, { error: "Invalid JSON" }, 400);
                }
            });

            return;
        }

        /* -------- 404 -------- */

        sendJSON(res, { error: "Not Found" }, 404);
    } catch (err) {
        console.error("Server error:", err);
        sendJSON(res, { error: "Server error" }, 500);
    }
});

/* ---------------- START SERVER ---------------- */

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
