const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {
  userRoutes,
  bucketRoutes,
  teamRoutes,
  authRoutes
} = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to MongoDB
const uri = process.env.DB_CONNECTION;
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log('MongoDB database connection established successfully')
);

// routes
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/bucket', bucketRoutes);
app.use('/team', teamRoutes);

app.listen(port, () => console.log('Server started...'));
