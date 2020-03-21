const express = require("express");
const router = express.Router();
const User = require('../models/user');


router.post('/like', (req, res) => {
    const { userName, swipeID } = req.body;

    User.findOne({username: userName}, (err, result) => {
        if(err || result === null) {
            return res.json({ success: false, error: err });
        }
        else {
            let doc = result;
            doc.likes.push(swipeID);
            doc.save();

            return res.json({ success: true });
        }
    });
});

router.post('/dislike', (req, res) => {
    const { userName, swipeID } = req.body;

    User.findOne({username: userName}, (err, result) => {
        if(err || result === null) {
            return res.json({ success: false, error: err });
        } else {
            let doc = result;
            doc.dislikes.push(swipeID);
            doc.save()

            return res.json({ success: true});
        }
    });
});

module.exports = router;
