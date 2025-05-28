const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const groupRoutes = require('./routes/groupRoutes');

const socket = require('./socket');

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

const server = http.createServer(app);
socket.init(server); // Initialize socket.io

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => console.error(err));
