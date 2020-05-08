const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const {registerValidation, refreshValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get("/", verify, async (req, res) => {
  console.log('_id: ', req.user._id);
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
router.post("/register", async (req, res) => {
    //Lets validate the data before we a user
    console.log('Email: ', req.body.email);
    const {error} = registerValidation(req.body);
    console.log('error is: ', error);
    if(error) return res.status(400).send(error.details[0].message);
    //check the user exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists){
      console.log('emailExists: ', 'Email already exits');
      return res.status(401).json({error: 'Email already exits'});
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
    console.log('PRE USER is: ', user);
    try{
      //save the new User
        const savedUser = await user.save();
        console.log('savedUser: ', savedUser);
        res.status(200).json({user: savedUser._id});
    }catch(err){
        res.status(400).json(err);
    }
  });

  //refresh
router.post("/refresh", verify, async (req, res) => {
    //Lets validate the data before we a user
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

router.delete("/delete", verify, async (req, resp)=>{

  let {error} =  refreshValidation(req.body);
  if(error) return resp.status(402).send({message: error});

  const user = await User.findOne({_id: req.user._id});
  if(!user){
    return await resp.status(401).send({message: 'Email is not found'});
  }
  
  if(req.body.email !==user.email){
    return await resp.status(404).send({message: 'Error in User'});
  }

   res = await User.findByIdAndDelete({_id: req.user._id});
  return resp.status(200).send({message: 'User deleted, thanks!', res});
});


module.exports = router;
