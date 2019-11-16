const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../../model/User");
const {registerValidation, refreshValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get("/", verify, async (req, res) => {
  const us = await User.findOne({ _id: req.user._id });
  console.log(us);
  res.json({
    posts: {
      title: "my first post",
      description: "random data you shouldent access",
      user: req.user,
      us : us
    }
  });
});

//register
router.post("/register", verify, async (req, res) => {
    //Lets validate the data before we a user
    console.log('Body is: ', req.body);
    console.log('Name is: ', req.body.name);
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    //check the user exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists){
      return res.status(401).send('Email already exits');
    }
  
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
  
    //create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
  
    try{
      //save the new User
        const savedUser = await user.save();
        res.status(200).send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
  });

  //refresh
router.post("/refresh", async (req, res) => {
    //Lets validate the data before we a user
    console.log('Body is: ', req.body);
    console.log('Name is: ', req.body.name);
    const {error} = refreshValidation(req.body);
    if(error) return res.status(400).send({error: error.details[0].message});
 
    //check the email exists
   const user = await User.findOne({email: req.body.email});
   if(!user){
     return res.status(401).send({message: 'Email is not faound'});
   }
   
   //Create and assing a token
   //const token = jwt.sign({_id: user._id}, process.TOKEN_SECRET);
   const token =jwt.sign({_id: user._id}, process.env.TOKEN_SECRET,  { expiresIn: '3m' }, function(err, token) {
     if(err) console.log("400:-", err);
     res.header('auth-token', token).send(token);
   });
});


module.exports = router;
