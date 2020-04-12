const express = require("express");
const router = express.Router();
const User = require('../models/user');

router.post('/getNewUser', (req, res) => {
    let { username, likesDislikes, preference } = req.body;

    let queryObj = {
        gender: { "$in": preference },
        username: { "$nin": [username, ...likesDislikes] }
    }
    User.findOne( queryObj, (err, result) => {
        if ( err ) {
            return res.json({ success: false, error: err });
        } else if ( result === null ){
            return res.json({ success: true, newUser: null });
        } else {
            return res.json({ success: true, newUser: result });
        }
    })
})

module.exports = router;