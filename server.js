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
    var user = 'Anon';

    socket.emit('chat message', 'You connected');
    socket.broadcast.emit('chat message', user + ' connected');

    socket.on('change_username', (username) => {
        io.emit('chat message', user + ' changed name to ' + username);
        user = username;
        //console.log(user);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', user + ': ' + msg);
    });
    
    socket.on('disconnect', function() {
        socket.broadcast.emit('chat message', user + ' disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});