const express = require("express");
const router = express.Router();
const User = require('../models/user');

router.post('/receiveData', (req, res) => {
    const { userName } = req.body;
    
    User.findOne({username: userName}, (err, result) => {
        if(err || result === null) {
            return res.json({ success: false, error: err });
        }
        else {
            return res.json({ success: true, res: result });
            // return res.json({ success: true, res: "asdf" });
        }
    });
})

router.post('/updateData', (req, res) => {
    const { userName, email, number, description, location, preference } = req.body;

    User.findOne({username: userName}, (err, result) => {
        if(err || result === null) {
            return res.json({ success: false, error: err });
        }
        else {
            let doc = result;
            doc.email = email;
            doc.number = number;
            doc.description = description;
            doc.location = location;
            doc.preference = preference;
            doc.save();

            return res.json({ success: true });
        }
    });
})

module.exports = router;
