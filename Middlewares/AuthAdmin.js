const User = require('../Models/UserModel');

const AuthAdmin = async (req, res, next) => {
    try {
        /*console.log('AuthAdmin ne');*/
       console.log(res.user.id);
        const user = await User.findOne({_id: res.user.id});
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }
        if (user.role === 0) {
            return res.status(400).json({msg: "Admin resource access denied"});
        }
        next();
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = AuthAdmin; 