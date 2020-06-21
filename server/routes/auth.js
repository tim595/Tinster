const express = require("express");
const jwt = require("jsonwebtoken");
// Mit der Klasse express.Router lassen sich modular einbindbare Routenhandler erstellen.
const router = express.Router();
const User = require('../models/user');
const { loginRequired } = require("../middleware/auth");

const secretKey = "sehrGeheimerToken";

router.post('/signIn', (req, res) => {
    let { username, password } = req.body;
    username = username.toLowerCase();
    User.findOne({ username: username.toLowerCase() }, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else if (result == null) {
            return res.json({ success: false, userExists: false });
        } else if (result.password != password) {
            return res.json({ success: false,  passwordWrong: true, userExists: true});
        }
        let token = jwt.sign({
            username
        }, secretKey);
        return res.status(200).json({ success: true, user: result, token });
    });
});

router.post('/signUp', (req, res) => {
    let newUser = new User();
    let { username, password, birthday, email, gender, preference } = req.body;
    username = username.toLowerCase();
    
    newUser.username = username;
    newUser.password = password;
    newUser.birthday = birthday;
    newUser.email = email;
    newUser.gender = gender;
    newUser.preference = preference;
    
    newUser.save((err) => {
        if (err) return res.json({ success: false, error: err });
        let token = jwt.sign({
            username
        }, secretKey);
        return res.status(200).json({ success: true, token });
    });
});

router.post('/checkUsername', (req, res) => {
    const { username } = req.body;
    User.findOne( { username: username.toLowerCase() }, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else if (result != null) {
            return res.json({ success: true, userExists: true});
        } else {
            return res.json({success: true, userExists: false});
        }    
    })
}) 

router.get('/checkToken', loginRequired, function(req, res) {
    res.sendStatus(200);
});

module.exports = router; // ? wieso hab ich noch nicht verstanden...