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

const fileFilter = (req, file, cb) => {// damit nur Bilder hochgeladen werden
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 15 // 15mb
    },
    fileFilter: fileFilter
});

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

router.post('/updateData', upload.any(), (req, res) => {
    let { username, email, number, description, location, preference } = req.body;
    let preferenceArray = preference.split(',');
    username = username.toLowerCase();
    let valuesToUpdate;
    if(req.files[0]){
        valuesToUpdate = {
            $set:{
                email: email,
                number: number,
                description: description,
                location: location,
                preference: preferenceArray,
                image: req.files[0].path
            }
        }
    } else {
        valuesToUpdate = {
            $set:{
                email: email,
                number: number,
                description: description,
                location: location,
                preference: preferenceArray,
            }
        }
    }    

    User.updateOne({username: username}, valuesToUpdate, (err, result) => {
        if(err || result === null) {
            return res.json({ success: false, error: err });
        }
        else {
            return res.json({ success: true });
        }
    });
})

module.exports = router;
