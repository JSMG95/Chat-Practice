var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

const mongoose = require('mongoose');
const User = require('./models/user');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/chat");
const db = mongoose.connection;

//mongo error
db.on('error', () => { console.error('connection error:') });

app.use(express.static('client'));

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log("New Connection")
    let history;
    User.find({}, (error, users) => {
        if (error) {
            console.log(error);
        }
        console.log(users);
        history = users;

        socket.emit('history', history);
    });
    socket.on('message', function (msg) {
        console.log("message received");
        const userData = {
            initials: msg.initials,
            message: msg.message
        }
        User.create(userData, (error, user) => {
            if (error) {
                console.log(error);
            }
        });
        io.emit('message', `${msg.initials}: ${msg.message}`);
        history.push(`${msg.initials}: ${msg.message}`);
    });
});

server.listen(8080, function () {
    console.log('Chat server running');
})