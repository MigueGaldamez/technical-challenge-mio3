const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // <- add this
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const groupRoutes = require('./routes/groupRoutes');

const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/group', groupRoutes);


// Create HTTP server and bind to express app
const server = http.createServer(app);

// Setup Socket.IO server
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Example: send a notification after 5 seconds
  setTimeout(() => {
    socket.emit('notification', { message: 'Hello from backend!' });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  // Listen on the HTTP server (with socket.io attached)
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => console.error(err));

// Export io if you want to use it elsewhere to emit events outside connection handler
module.exports = { io };