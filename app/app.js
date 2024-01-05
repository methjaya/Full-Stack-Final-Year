require('dotenv').config()
let port = 8080;
let express = require('express');
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const DBConnect = require('./config/database');
const { isAuthenticated } = require('./middleware/user_auth.js');



let app = express();


const path = require("path");
const bodyParser = require('body-parser');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

app.use(
    session({
        secret: process.env.SECRET,
        name: 'session',
        resave: false,
        saveUninitialized: false,
    })
);

DBConnect();

app.listen(port, () => {
    console.log('Running on port: ' + port);
});

app.use('/auth', require('./routes/auth.js'));

app.use('/workout', require('./routes/workout_route.js'));


app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`AUTHORIZED! Dashboard - User ID: ${req.session.uid}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});





