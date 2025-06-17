const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const ejs = require('ejs')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const employeeRoutes = require('./routes/employeeRoutes')
const userRoutes = require('./routes/userRoutes')

//In server we follow MVC folder structure that is Model, View and Controller
//By using Model we create schema, By Controller we build logic, By Views we will display output.

// Running server using express js.
dotEnv.config();
const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT;

//Creating a session
app.use(session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

//We need a middleware called connect-mongoDB-seesion for storing the express-session

//ejs configuration
app.set('view engine', 'ejs')
//body-parser
app.use(bodyParser.json());

//Client side rendering
app.get('/mango', (req, res) => {
    res.json({fruit: 'Mango'})
})

//Server side rendering
app.get('/grapes', (req, res) => {
    res.send("<h1> This is grapes fruit")
})

//render method
app.get('/courses', (req, res) => {
    res.render('samplePage')
})

// For HTML and CSS we need Template Enginees for that we need to install ejs

//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected successfully.')
})
.catch((error) => {
    console.log('Error', error)
});

// Configure MongoDB session store
// Creates a MongoDB-backed session store
// A session store constructor provided by connect-mongodb-session

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "mySession"
})

// Catch connection errors
store.on('error', (error) => {
    console.error('Session store error:', error);
  });

app.use('/employees', employeeRoutes)
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Server is started and running successfully at ${port}`);
});
