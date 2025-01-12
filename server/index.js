import express from 'express';
    import ServerRouter from "./Routes/server.routes.js";
    import cors from 'cors';
    import http from 'http';
    import { Server } from "socket.io";
    import path from 'path';

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    // Create the express app
    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on("join-message", (roomId) => {
        socket.join(roomId);
        console.log("User joined in a room : " + roomId);
      })

      socket.on("screen-data", function (data) {
        data = JSON.parse(data);
        var room = data.room;
        var imgStr = data.image;
        socket.broadcast.to(room).emit('screen-data', imgStr);
      })

      socket.on("mouse-move", function (data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-move", data);
      })
      socket.on("start-conn", function (data) {
        var room = data;
        socket.broadcast.to(room).emit("start-conn", true);
      })

      socket.on("mouse-click", function (data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-click", data);
      });
      socket.on("touch", function (data) {
        var room = JSON.parse(data).room;

        socket.broadcast.to(room).emit("touch", data);
      })
      socket.on("touch-move", function (data) {
        var room = JSON.parse(data).room;

        socket.broadcast.to(room).emit("touch-move", data);
      });
     

      socket.on("type", function (data) {
        var room = JSON.parse(data).room;
     
        socket.broadcast.to(room).emit("type", data);
      })
      
      socket.on("lang-type", function (data) {
        var room = JSON.parse(data).room;
       
        socket.broadcast.to(room).emit("lang-type", data);
      })
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    app.use(cors())
    // Routes and middleware

    app.use("/server", ServerRouter);
    app.get("/server", (req, res) => {
      const room = req.query.room;
      if (room) {
        res.status(200).send("Room found");
      } else {
        res.status(404).send("Room not found");
      }
    });
    // Error handlers

    // Start server
    app.listen(1234, function (err) {
      if (err) {
        return console.error(err)
      }

      console.log('Started at http://localhost:1234')
    })
    io.listen(9000);
