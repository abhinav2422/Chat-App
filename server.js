const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/*io.on('connection', (socket) => {
    console.log('connected');
    socket.emit('request'); // emit an event to the socket
    io.emit('broadcast'); // emit an event to all connected sockets
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});*/

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});