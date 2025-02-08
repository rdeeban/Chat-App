const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://10.0.0.67:3000"
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send-message', (msg) => {
        io.emit('receive-message', {username: socket.id, message: msg});
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

io.listen(3001);