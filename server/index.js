const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoutes = require('./routes/auth')
const btnFunctions = require('./routes/button');
const { loginRequired } = require("./middleware/auth");


const DB_URL = 'mongodb+srv://tinster_admin:PcNXWk3yd1DGdcCm@cluster-wrz7u.mongodb.net/tinster?retryWrites=true&w=majority';
const API_PORT = 3001;

const app = express();
app.use(cors());

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/button', loginRequired, btnFunctions);
app.listen(API_PORT, () => console.log(`Server läuft auf http://localhost:${API_PORT}`));
