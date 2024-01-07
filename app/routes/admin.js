let express = require('express');

const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


const { isAuthenticated, checkAdminAuth } = require('../middleware/user_auth.js');

router.post('/add-staff', async (req, res) => {
    try {
        if (req.body.email && req.body.password && req.body.name && req.body.gender && req.body.phoneNumber) {

            const { email, password, name, gender, phoneNumber } = req.body;

            let user = await User.findOne({
                email: email
            });

            if (user) {
                res.status(403).send({message:'user exists'});
            }
            else {
                const hashedPass = await bcrypt.hash(password, 10);

                const newUser = {
                    email: email,
                    password: hashedPass,
                    name: name,
                    gender: gender,
                    phoneNumber: phoneNumber,
                    role: 'admin'
                }

                user = await User.create(newUser);

                if (!user) {
                    console.log("failed");
                    return res.status(500).json({ message: "Failed to create user" });
                }

                res.status(200).send({ message: "User created successfully"});
            }
        } else {
            res.status(401).send({ message: "Empty credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ mesage: 'Failed to execute the operation' })
    }
});


router.get('/users/get', isAuthenticated, checkAdminAuth, async (req, res) => {
    try {
        const users = await User.find({}, 'id name');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;