const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT, 
{userNewUrlParser:true},
()=> console.log('Connected to db'));

//Import Routes
const authRoute = require('./routes/auth');

//Routes Middlewares
app.use('/api/user', authRoute);

app.listen(3001, ()=> console.log('Server Up and running'));