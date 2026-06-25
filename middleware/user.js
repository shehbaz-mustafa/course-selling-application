const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if (decoded) {
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

<<<<<<< HEAD
<<<<<<< HEAD
 module.exports ={
=======
module.exports = {
>>>>>>> 8c98ffa9152af826e812d72c7a8b192fe67471f0
=======
module.exports = {
>>>>>>> 8c98ffa9152af826e812d72c7a8b192fe67471f0
    userMiddleware: userMiddleware
}