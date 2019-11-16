const jwt = require('jsonwebtoken');
const User = require("../model/User");

module.exports = {
    validateTokenUser = (req,res,next)=>{
        const token = req.header('auth-token');
        if(!token) return res.status(400).send({message: 'access Denied'});
    
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            //Verifying User
            const user = User.findById({_id: verified._id});
            if(!user) return res.status(400).send({message: 'Ivalid User'});
            
            req.user = verified;
            next();
        }catch(err){
            res.status(400).send({message: 'Invalid Token'});
        }
    }
};

