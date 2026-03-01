import http from "http";
import { model } from "./model.js";

// Server Instance

const server = http.createServer((req, res) => {
  if (req.url === "/api/inventory" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });

    const data = model.getAll();
    res.end(JSON.stringify(data));
  } else if (req.url === "/api/inventory" && req.method === "POST") {
    const data = model.writeToDatabase();
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "blyat" }));
  }
});

model.init();

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
