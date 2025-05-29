const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const groupRoutes = require('./routes/groupRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


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
app.use('/api/notification', notificationRoutes);


const server = http.createServer(app);
socket.init(server); 

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Corriendo en puerto ${process.env.PORT}`);
  });
})
.catch(err => console.error(err));
