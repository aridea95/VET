const express = require("express");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");


// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors());

// db config
const mongoURI = process.env.MONGO_URI;
mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};
mongoose.connect(mongoURI, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Connected to mongodb!"));

// routes
const router = require('./routes');
const errorHandler = require("./middlewares/errorHandler");
const refresh = require('./helpers/refresh');

//auto change approved status to finished 
const schedule = require('node-schedule');
let rule = new schedule.RecurrenceRule();
rule.hour = [13, 16, 20];
const j = schedule.scheduleJob(rule, (time) => {
    refresh();
});

app.use(router);
app.use(errorHandler);

//socket config
const webSockets = require('./helpers/websocket')

//socket.io
const socketio = require("socket.io");
const http = require("http");

const server = http.createServer(app)

//create socket server
global.io = socketio.listen(server);
global.io.on('connection', webSockets.connection);


// server
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Listening to ${PORT}`));

server.listen(PORT);
server.on("listening", () => {
    console.log(`Listening on localhost Port ${PORT}.`)
})
