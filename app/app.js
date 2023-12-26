let port = 8080;
let express = require('express');
const DBConnect = require('./config/database')
const mongoose = require('mongoose')
const User = require('./models/user')

let app = express();

const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

DBConnect();

app.listen(port, () => {
    console.log('Running on port: ' + port);
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
    //  res.send('Hello there!!');
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {

        const { email, password } = req.body;

        let user = await User.findOne({
            email: email,
            password: password
        });

        if (user) {
            res.send('LOGGED IN');
        }
        else {
            res.send('NO USER WITH CREDENTIALS');
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

            const { email, password, name } = req.body;

            let user = await User.findOne({
                email: email
            });

            if (user) {
                res.send('user exists');
            }
            else {
                const newUser = {
                    email: email,
                    password: password,
                    name: name,
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

