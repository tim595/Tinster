const jwt = require("jsonwebtoken");

const secretKey = "sehrGeheimerToken";

exports.loginRequired = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log("header", JSON.stringify(token))
        jwt.verify(token, secretKey, function (err, payload) {
            if (payload) { // Wenn hier true zurückkommt, ist der User eingeloggt
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please sign in first!"
                });
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: "Please sign in first!"
        })
    }
};
