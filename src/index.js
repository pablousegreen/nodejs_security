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
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
()=> console.log('Connected to db'));

 //Middleware
 app.use(express.json());
 app.use(passport.initialize());
 app.use(passport.session());

 require('./lib/passport');

//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3001, ()=> console.log('Server Up and running'));