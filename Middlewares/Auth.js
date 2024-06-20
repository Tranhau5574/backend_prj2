const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header('Auth-Token');
    if (!token) return res.status(400).json({ msg: "No token, authorization denied" });

    try {
        jwt.verify(token, process.env.TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: "invalid Authorization" })
            res.user = user;
      
            next();
        })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
module.exports = auth;