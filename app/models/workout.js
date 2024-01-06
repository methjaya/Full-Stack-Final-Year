const mongoose = require('mongoose')


const Strength = new mongoose.Schema({
    _id: false,
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    startingWeight: {
        type: String,
        required: true,
    },
    sets: {
        type: String,
        required: true,
    },
    reps: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
});

const Cardio = new mongoose.Schema({
    _id: false,
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sets: {
        type: String,
        required: true,
    },
    setDuration: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
});

const Abs = new mongoose.Schema({
    _id: false,
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    reps: {
        type: String,
        required: true,
    },
    sets: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
});

const Track = new mongoose.Schema({
    _id: false,
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
});




const Workout = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    strength: [Strength],
    cardio: [Cardio],
    abs: [Abs],
    track: [Track]
});

module.exports = mongoose.model('Workout', Workout)