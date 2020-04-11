const express = require("express");
const router = express.Router();
const User = require('../models/user');

router.post('/getNewUser', (req, res) => {
    let { username, likesDislikes, preference } = req.body;
    // console.log(req.body);
    let queryObj = {
        gender:preference[0],
        username: { "$nin": [username, ...likesDislikes]  }
    }
    if (preference.length === 1) {
        User.findOne( queryObj, (err, result) => {
            if(err || result === null) {
                return res.json({ success: false, error: err });
            }
            else {
                return res.json({ success: true, newUser: result });
            }
        })
    } else if (preference.length === 2) {
        
    } else {
        //error
    }
})

module.exports = router;