const bcrypt = require('bcrypt');

const gocrypt = {};

gocrypt.encryptPassword = async (savePassword) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(savePassword, salt);
    return hash;
};

gocrypt.matchPassword = async (password, savePassword) =>{
    try{
        return bcrypt.compare(password, savePassword);
    }catch(e) {
        console.log(e);
    }
}

module.exports = helpers;