const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
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

mongoose.connect(process.env.MONGO_URI, {
//  useNewUrlParser: true,
  //useUnifiedTopology: true
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Corriendo en puerto: ${process.env.PORT}`);
  });
})
.catch(err => console.error(err));