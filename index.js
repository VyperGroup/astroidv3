const minify = true

import { createBareServer } from '@tomphttp/bare-server-node';
import express from "express";
import { createServer } from "node:http";
import { SocksProxyAgent } from 'socks-proxy-agent';
const socksProxyAgent = new SocksProxyAgent('socks://localhost:40000');
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
const publicPath = fileURLToPath(new URL("./static/", import.meta.url));
const bare = createBareServer('/bare/', {
});
const app = express();
dotenv.config();
app.use(express.static(publicPath));
app.use("/worksheets/uv/", express.static(uvPath));
app.use("/uv/", express.static(uvPath));
const server = createServer();
server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});
server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});
const port = process.env.PORT || 3300;
server.on("listening", () => {
  console.log('UP')
});

import fs from "fs";
import path from "node:path";

if (minify) {
  fs.readdir("static/worksheets/api", (err, dirFiles) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    dirFiles.forEach((dirFile) => {
      if (dirFile.endsWith(".json") && !dirFile.endsWith(".min.json")) {
        const filePath = path.join(path.resolve(), "static/worksheets/api", dirFile);
        const minFilePath = filePath.replace(".json", ".min.json");
        fs.unlink(minFilePath, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error("Error deleting file:", err);
          }
        });
        const jsonData = fs.readFileSync(filePath, "utf8");
        fs.writeFileSync(minFilePath, JSON.stringify(JSON.parse(jsonData)));
      }
    });
  });
}

server.listen({
  port,
});
