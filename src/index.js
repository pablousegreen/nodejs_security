const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

//connect to db
//mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
mongoose.connect('mongodb://localhost/security', { useNewUrlParser: true },    
()=> console.log('Connected to db'));

 //Middleware
 app.use(express.json());
 app.use(passport.initialize());
 app.use(passport.session());

 //require('./lib/passport');

//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3001, ()=> console.log('Server Up and running'));


/*
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const initializePassport = require("./passport-config");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

initializePassport(passport, email => users.find(user => user.email === email), id => users.find(user.id === id));
const users = []

//connect to db
mongoose
  .connect(
    //process.env.DB_CONNECT,
    'mongodb://localhost/security',
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to db")
  )
  .then(data => {
    console.log("data: ");
  })
  .catch(err => {
    console.log("error: ", err);
  });

//Middleware
app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash);
app.use(passport.initialize());
app.use(passport.session());

//require('./lib/passport');

//Routes Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 3002;
app.set("port", PORT);
app.listen(app.get("port"), () =>
  console.log("Server Up and running", app.get("port"))
);*/