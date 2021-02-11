const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to MongoDB
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('MongoDB database connection established successfully')
);

// routes
app.use('/', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => console.log('Server started...'));
