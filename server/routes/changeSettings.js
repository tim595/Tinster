const express = require("express");
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/"); // file.mimetype ist zB 'image/png'
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '.' + extension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/updateData', upload.any(), (req, res) => {
    let { username } = req.body;
    username = username.toLowerCase();

    let valuesToUpdate = {
        $set:{
            image: req.files[0].path
        }
    };
    User.updateOne({username: username}, valuesToUpdate, (err, result) => {
        if(err || result === null) {
            return res.json({ success: false, error: err });
        }
        else {
            // let doc = result;
            // console.log(doc);
            // doc.image = updatedUser.image;
            // doc.save();
            return res.json({ success: true });
        }
    });
})

module.exports = router;