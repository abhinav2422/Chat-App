const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const exphbs = require('express-handlebars');
const path = require('path');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
    //res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.emit('chat message', 'You connected');
    socket.broadcast.emit('chat message', 'A user connected');

    //socket.emit('request'); // emit an event to the socket
    //io.emit('broadcast'); // emit an event to all connected sockets

    socket.username="Anonymous";
    /*socket.on('change_username', (data) => {
        socket.username = data.username;
    });*/

    socket.on('chat message', (msg) => {
        io.emit('chat message', {message: msg, username: socket.username});
    });
    
    socket.on('disconnect', function() {
        socket.broadcast.emit('chat message', 'A user disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});