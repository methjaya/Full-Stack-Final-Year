const mongoose = require('mongoose')


const Exercises = new mongoose.Schema({
     _id : false ,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const Schedule = new mongoose.Schema({
    _id : false ,
    mon: {
        type: String,
        required: true,
    },
    tue: {
        type: String,
        required: true,
    },
    wed: {
        type: String,
        required: true,
    },
    thu: {
        type: String,
        required: true,
    },
    fri: {
        type: String,
        required: true,
    },
    sat: {
        type: String,
        required: true,
    },
    sun: {
        type: String,
        required: true,
    },
})

const WorkoutType = new mongoose.Schema({
    _id : false ,
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    exercises: [Exercises],
})

const Workout = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    schedule: {
        type: Schedule,
        required: true,
    },
    workouts: [WorkoutType]
})

module.exports = mongoose.model('Workout', Workout)