const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoutes = require('./routes/auth')


const DB_URL = 'mongodb://localhost:27017/tinster';
const API_PORT = 3001;

const app = express();
app.use(cors());

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }); // das gleiche wie mit MongoClient


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev')); // nur zum debugggen



app.use('/api/auth', authRoutes);
app.listen(API_PORT, () => console.log(`Server läuft auf http://localhost:${API_PORT}`));

// die Login-Logik ist jetzt in routes/auth.js :)