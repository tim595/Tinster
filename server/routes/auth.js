const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('../models/user');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const DB_URL = 'mongodb://localhost:27017/tinster';
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }); // das gleiche wie mit MongoClient

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.post('/signIn', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username.toLowerCase() }, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else if (result == null) {
            return res.json({ success: false, error: "USER DOESN'T EXISTS!" });
        } else if (result.password != password) {
            return res.json({ success: false, error: 'WRONG PASSWORD BITCH' });
        }
        return res.json({ success: true, user: result });
    });
});

router.post('/signUp', (req, res) => {
    let newUser = new User();
    const { username, password, email } = req.body;

    newUser.username = username.toLowerCase();
    newUser.password = password;
    newUser.email = email;

    newUser.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Server läuft auf http://localhost:${API_PORT}`));
