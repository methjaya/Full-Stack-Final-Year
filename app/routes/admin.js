let express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/user');


const { isAuthenticated, checkAdminAuth } = require('../middleware/user_auth.js');

router.delete('/users/:userId', isAuthenticated, checkAdminAuth, async (req, res) => {
    try {
        var isValidUid = mongoose.Types.ObjectId.isValid(req.user.uid);
        console.log(isValidUid);

        if (isValidUid) {

            const delId = req.params.userId;
            const deletedUser = await User.findByIdAndDelete(delId);

            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ message: 'User deleted successfully' });
            }
        } else {
            res.status(400).json({ message: 'Invalid delete id' });
        }

    } catch (err) {
        console.log(err);
        res.send({ mesage: 'Failed to execute the operation' })
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