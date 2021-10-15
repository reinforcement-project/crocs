const app = require('./app');
const server = require('http').createServer(app);
const initSocket = require('./socketControllers/initSocket');
const connectToRoom = require('./socketControllers/connectToRoom');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(initSocket);
io.on('connection', connectToRoom);

module.exports = server;
