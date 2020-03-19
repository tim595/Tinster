const express = require("express");
// Mit der Klasse express.Router lassen sich modular einbindbare Routenhandler erstellen.
const router = express.Router();
const User = require('../models/user');

router.post('/signIn', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username.toLowerCase() }, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else if (result == null) {
            return res.json({ success: false, userExists: false });
        } else if (result.password != password) {
            return res.json({ success: false,  passwordWrong: true, userExists: true});
        }
        return res.json({ success: true, user: result });
    });
});

router.post('/signUp', (req, res) => {
    let newUser = new User();
    const { username, password, email, gender, preference } = req.body;

    newUser.username = username.toLowerCase();
    newUser.password = password;
    newUser.email = email;
    newUser.gender = gender;
    newUser.preference = preference;
    
    newUser.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
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

module.exports = router; // ? wieso hab ich noch nicht verstanden...