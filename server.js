const http = require("http");
const app = require("./app");
const socketIo = require("socket.io");
const server = http.createServer(app);
require('dotenv').config()

const { API_PORT ,SECRET_TOKEN} = process.env;
const port = API_PORT;

const io = socketIo(server)

io.on("connection", (socket) => {
    console.log("New client connected"+socket.id);
    // if (interval) {
    //     clearInterval(interval);
    // }
    // interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("join_room", (data) => {
        console.log("just joined th room"+data);
        // clearInterval(interval);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        // clearInterval(interval);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});