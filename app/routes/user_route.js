let express = require('express');
const router = express.Router()

const bcrypt = require('bcrypt');

const User = require('../models/user')

const { isAuthenticated } = require('../middleware/user_auth.js');



router.post('/update-details', isAuthenticated, async (req, res) => {
    try {
        if (req.body.details) {

            //Taking user details
            const { details } = req.body;
            const uid = req.user.uid;

            //Remove if user sends role and password fields
            if (details.hasOwnProperty('role')) {
                delete details.role;
            }
            if (details.hasOwnProperty('password')) {
                delete details.password;
            }

            //Updating the user details
            changedDetails = await User.findOneAndUpdate({ _id: uid },
                { $set: details },
                { new: true, upsert: true });

            //Sending responses
            if (changedDetails) {
                res.status(200).send({ message: "Details updated" });
            } else {
                res.status(500).send({ message: "Failed to update" });
            }

        } else {
            res.status(400).send({ message: "Missing data" });
        }

    } catch (err) {
        res.status(500).send({ mesage: 'Failed to execute the operation' })
    }
});


router.get('/details', isAuthenticated, async (req, res) => {
    try {
        if (req.user.uid) {

            const uid = req.user.uid;

            userDetails = await User.findOne({ _id: uid });

            if (userDetails != null) {

                userDetails = userDetails.toObject();
                delete userDetails._id;
                delete userDetails.role;
                delete userDetails.password;

                res.status(200).send(userDetails);

            } else {
                res.status(404).send({ message: 'User not found' });
            }

        } else {
            res.status(404).send({ message: 'Could not find user' });
        }
    } catch (err) {
        res.status(500).send({ mesage: 'Failed to execute the operation' })
    }
});


router.post('/update-password', isAuthenticated, async (req, res) => {
    try {
        if (req.body.password && req.body.newPassword) {

            const { password, newPassword } = req.body;
            const uid = req.user.uid;

            let user = await User.findOne({
                _id: uid,
            });

            const hashedLoginPass = await bcrypt.compare(password, user.password)

            if (hashedLoginPass) {
                const hashedPass = await bcrypt.hash(newPassword, 10);

                updatedCredentials = await User.findOneAndUpdate({ _id: uid },
                    { $set: { password: hashedPass } },
                    { new: true });

                if (updatedCredentials) {
                    return res.status(200).json({ message: "Password updated successfully" })
                } else {
                    return res.status(500).json({ message: "Failed to update password" })
                }
            }
            else {
                return res.status(401).json({ message: 'Wrong Credentials' });
            }
        } else {
            return res.status(401).send({ message: 'Empty credentials' });
        }

    } catch (err) {
        res.status(500).json({ mesage: 'Failed to execute the operation' });
    }
});



module.exports = router;