const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const exphbs = require('express-handlebars');
const path = require('path');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('connected');
    //socket.emit('request'); // emit an event to the socket
    //io.emit('broadcast'); // emit an event to all connected sockets
    //socket.username="Anonymous";

    /*socket.on('change_username', (data) => {
        socket.username = data.username;
    });*/
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});