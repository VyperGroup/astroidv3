import { createBareServer } from '@tomphttp/bare-server-node';
import express from "express";
import { createServer } from "node:http";
import { SocksProxyAgent } from 'socks-proxy-agent';
const socksProxyAgent = new SocksProxyAgent('socks://localhost:40000');
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join } from "node:path";
import { hostname } from "node:os";
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

server.listen({
  port,
});
