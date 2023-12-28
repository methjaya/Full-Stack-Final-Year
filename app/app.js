require('dotenv').config()
let port = 8080;
let express = require('express');
const session = require("express-session");
const DBConnect = require('./config/database')
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcrypt');


let app = express();

const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

DBConnect();

app.listen(port, () => {
    console.log('Running on port: ' + port);
});


const isAuthenticated = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`AUTHORIZED! Dashboard - User Name: ${req.session.name}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }

        const hashedLoginPass = await bcrypt.compare(password, user.password)
        if (hashedLoginPass) {
            req.session.isAuth = true;
            req.session.name = user.name;
            console.log(user);
            console.log(user.name);
            return res
                .status(200)
                .json({ msg: 'You have logged in successfully' });
        } else {
            return res.status(400).json({ msg: 'Invalid credential' })
        }

    } else {
        res.send("empty credentials");
    }
});


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
})

app.post('/register', async (req, res) => {
    try {
        if (req.body.email && req.body.password && req.body.name) {

            const { email, password, name, gender, phoneNumber, city, address, emergencyNo, dob } = req.body;

            const hashedPass = await bcrypt.hash(password, 10);

            let user = await User.findOne({
                email: email
            });

            if (user) {
                res.send('user exists');
            }
            else {
                const newUser = {
                    email: email,
                    password: hashedPass,
                    name: name,
                    gender : gender,
                    phoneNumber : phoneNumber,
                    address: address,
                    city : city,
                    emergencyContact : emergencyNo,
                    dob : dob
                }

                user = await User.create(newUser)
                res.send(user);
            }
        } else {
            res.send("empty credentials");
        }

    } catch (err) {
        res.send(err)
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});
