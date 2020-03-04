const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();

//connect to db
mongoose
  .connect(process.env.DB_CONNECT, { useUnifiedTopology: true , useNewUrlParser: true}, () =>
    console.log("Connected to db" )
  )
  .then(data => {
    console.log("data: ");
  })
  .catch(err => {
    console.log("error: ", err);
  });

//Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//require('./lib/passport');

//Routes Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 3002;
app.set('port', PORT);
app.listen(app.get('port'), () => console.log("Server Up and running", app.get('port')));
