let express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router()

const bcrypt = require('bcrypt');

const User = require('../models/user')


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
})

router.get('/status', (req, res) => {
    if (req.session.isAuth) {
        res.status(200).send({ LoginStatus: true });
    } else {
        res.status(200).send({ LoginStatus: false });
    }
})

router.post('/login', async (req, res) => {
    try {
        if (req.body.email && req.body.password) {

            // if (req.session.isAuth) {
            //     res.send('Already logged in');
            // } else {
                const { email, password } = req.body;

                const user = await User.findOne({ email: email })

                if (!user) {
                    return res.status(400).json({ msg: 'User not found' })
                }

                const hashedLoginPass = await bcrypt.compare(password, user.password)
                if (hashedLoginPass) {

                    const accessToken = jwt.sign({ uid: user._id }, process.env.SECRET, { expiresIn: '24h' });

                    return res
                        .status(200)
                        .json({ status: 'You have logged in successfully', token: accessToken });

                } else {
                    return res.status(400).json({ msg: 'Invalid credentials' })
                }
            }

        // } else {
        //     res.status(401).send({ message: "empty credentials" });
        // }
    } catch (err) {
        console.log(err)
        res.send({ mesage: 'Failed to execute the operation' });
    }

});


router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
})

router.post('/register', async (req, res) => {
    try {
        if (req.body.email && req.body.password && req.body.name) {

            const { email, password, name, gender, phoneNumber } = req.body;


            let user = await User.findOne({
                email: email
            });

            if (user) {
                res.send('user exists');
            }
            else {
                const hashedPass = await bcrypt.hash(password, 10);

                const newUser = {
                    email: email,
                    password: hashedPass,
                    name: name,
                    gender: gender,
                    phoneNumber: phoneNumber,
                    role: 'basic'
                }

                user = await User.create(newUser);

                const accessToken = jwt.sign({ uid: user._id }, process.env.SECRET, { expiresIn: '24h' });

                res.status(200).send({ message: "User created successfully", token: accessToken });
            }
        } else {
            res.send("empty credentials");
        }

    } catch (err) {
        res.send({ mesage: 'Failed to execute the operation' })
    }
});

router.get('/logout', (req, res) => {
    try {
        if (req.session.isAuth) {
            req.session.destroy(err => {
                if (err) {
                    console.error('Error destroying session:', err);
                }
                res.clearCookie('session');
                res.status(200).send({ message: 'Successfully logged out' });
            });
        } else {
            res.status(401).send({ message: 'Not logged in' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Failed to execute the operation' });
    }


});

module.exports = router;