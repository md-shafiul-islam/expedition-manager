const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const routers = require("./router");

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
    this.io = socketIo(this.http);
    this.port = process.env.PORT || 3101;
  }

  initMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  initRoutes() {
    this.app.use("/api", routers);
  }

  initSocket() {
    this.io.on("connection", (socket) => {
      console.log("User connected");
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  run() {
    this.initMiddleware();
    this.initRoutes();
    this.initSocket();

    this.http.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

const server = new Server();
module.exports = server;
