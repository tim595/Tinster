const express = require("express");
const router = express.Router();
const User = require('../models/user');


router.post('/getMatches', (req, res) => {
    let { username, userLiked } = req.body;

    let queryObj = {
        username: { "$in": [...userLiked] },
        likes: { "$in": username }
    }
    User.find( queryObj, (err, result) => {
        if ( err ) {
            return res.json({ success: false, error: err });
        } else if ( result === null ){
            return res.json({ success: true, newUser: null });
        } else {
            return res.json({ success: true, matches: result });
        }
    })
})


module.exports = router;