const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require('dotenv').config({
    path: './config/index.env'
});

//const connectDB = require('./config/db');
//connectDB()
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))
app.use(cors())

app.use('/api/user/', require('./routes/auth.route'));
app.get('/', (req, res) => {
    res.send('START!');
});

app.use((req, res) => {
    res.status(404).json({
        msg: 'PAGE NOT FOUND!'
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('RUNNING ${PORT}!');
});