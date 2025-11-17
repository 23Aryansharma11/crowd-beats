// server
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Server } from "socket.io";
import { Server as HttpServer } from "http";
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const server = serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running: http://${info.address}:${info.port}`);
  }
);

const ioServer = new Server(server as HttpServer, {
  serveClient: false,
});
ioServer.on("error", (err) => {
  console.log(err);
});

ioServer.on("connection", (socket) => {
  console.log(`${socket.id}: connected`);
  socket.on("join-room", (data) => {
    const { userId, roomId } = data;
    if (!userId || !roomId) {
      socket.emit("error", { message: "Missing userId or roomId" });
      return;
    }
    socket.join(roomId);
    console.log(
      `User ${userId} with socket id ${socket.id} joined room ${roomId}`
    );
    socket.emit("joined-room", { roomId });
  });
});

// all events join-room joined-room error
