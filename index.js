require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const userRouter = require('./src/routers/userRouter');
const ticketRouter = require('./src/routers/ticketRouter');
const tokensRouter = require('./src/routers/tokensRouter');

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

// API  Security
app.use(helmet());

// Handle CORS error
app.use(cors());

// Logger
app.use(morgan("tiny"));

// Set  body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routers
app.get('/', (req, res) => {
    res.send("Hi there! My name is Jayesh");
  });

// User Routers
app.use('/v1/user', userRouter);

// Ticket Router
app.use('/v1/ticket', ticketRouter);

// Tokens Router
app.use('/v1/tokens', tokensRouter);
  
const port = process.env.PORT  || 3001
app.listen(port, () => console.log('Started'))