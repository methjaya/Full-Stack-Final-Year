let express = require('express');
const router = express.Router()

const Workout = require('../models/workout.js')

const { isAuthenticated, checkAdminAuth } = require('../middleware/user_auth.js');


router.post('/update', isAuthenticated, checkAdminAuth, async (req, res) => {
    try {
        if (req.body.workouts && req.body.uid) {

            const { workouts, uid } = req.body;

            // userWorkout = await Workout.create(newWorkout);
            userWorkout = await Workout.findOneAndUpdate({ _id: uid },
                { $set: { workouts: workouts, schedule: req.body.schedule ?? {} } },
                { new: true, upsert: true });
            res.send(userWorkout);

        } else {
            res.send("empty credentials");
        }

    } catch (err) {
        res.send({ mesage: 'Failed to execute the operation' })
    }
});



router.get('/details', isAuthenticated, async (req, res) => {
    try {
        if (req.user.uid) {

            const uid = req.user.uid;

            userWorkout = await Workout.findOne({ _id: uid });

            if (userWorkout != null) {
                res.status(200).json(
                    {
                        "strength" : userWorkout.strength,
                        "abs" : userWorkout.abs,
                        "cardio" : userWorkout.cardio,
                        "track" : userWorkout.track,
                    }
                );
            } else {
                res.status(404).send({ message: 'No content found for user' });
            }

        } else {
            res.status(404).send({ message: 'Could not find user' });
        }
    } catch (err) {
        res.status(500).send({ mesage: 'Failed to execute the operation' })
    }
});









router.post('/strength/set', isAuthenticated, checkAdminAuth, async (req, res) => {
    try {
        if (req.body.workouts && req.body.uid) {

            const { workouts, uid } = req.body;

            workouts.type = "s";
            // userWorkout = await Workout.create(newWorkout);
            userWorkout = await Workout.findOneAndUpdate({ _id: uid },
                { $push: { strength: workouts} , upsert : true},
                { new: true, upsert: true});
                console.log(userWorkout);
            res.status(200).send({message : "Strength workout added successfully"});

        } else {
            res.send("empty credentials");
        }

    } catch (err) {
        res.send({ mesage: 'Failed to execute the operation' })
    }
});

router.post('/cardio/set', isAuthenticated, checkAdminAuth, async (req, res) => {
    try {
        if (req.body.workouts && req.body.uid) {

            const { workouts, uid } = req.body;         

            workouts.type = "c";
            // userWorkout = await Workout.create(newWorkout);
            userWorkout = await Workout.findOneAndUpdate({ _id: uid },
                { $push: { cardio: workouts} , upsert : true},
                { new: true, upsert: true});

            res.status(200).send({message : "Cardio added successfully"});

        } else {
            res.send("empty credentials");
        }

    } catch (err) {
        res.send({ mesage: 'Failed to execute the operation' })
    }
});


router.post('/track/set', isAuthenticated, checkAdminAuth, async (req, res) => {
    try {
        if (req.body.workouts && req.body.uid) {

            const { workouts, uid } = req.body;         

            workouts.type = "t";
            userWorkout = await Workout.findOneAndUpdate({ _id: uid },
                { $push: { track: workouts} , upsert : true},
                { new: true, upsert: true});

            res.status(200).send({message : "Track workout added successfully"});

        } else {
            res.send("empty credentials");
        }

    } catch (err) {
        res.send({ mesage: 'Failed to execute the operation' })
    }
});


router.post('/abs/set', isAuthenticated, checkAdminAuth, async (req, res) => {
    try {
        if (req.body.workouts && req.body.uid) {

            const { workouts, uid } = req.body;         

            workouts.type = "a";
            userWorkout = await Workout.findOneAndUpdate({ _id: uid },
                { $push: { abs: workouts} , upsert : true},
                { new: true, upsert: true});

            res.status(200).send({message : "Abs workout added successfully"});

        } else {
            res.send("empty credentials");
        }

    } catch (err) {
        res.send({ mesage: 'Failed to execute the operation' })
    }
});






















module.exports = router;