
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectMongodb= require('./init/mongodb.js');
const todoRoute = require('./Routes/todo.js');
const dotenv = require('dotenv');
// initialize application
const app = express();

// initialize environment variables

dotenv.config();
console.log(process.env.PORT)


// mongodb connection
connectMongodb();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", todoRoute);


module.exports = app;