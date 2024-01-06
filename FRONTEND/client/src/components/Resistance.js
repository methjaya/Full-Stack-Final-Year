import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth";
import { setStrength } from '../utils/API';
import Header from "./Header";
import resistanceIcon from "../assets/images/resistance-w.png"
import { useLocation } from 'react-router-dom';

export default function Resistance() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('data');

    const [strengthData, setStrengthData] = useState({
        name: "",
        weight: "",
        sets: "",
        reps: "",
        schedule: ""
    })

    const [message, setMessage] = useState("");
    const isLoggedIn = Auth.isLoggedIn();


    const onStrengthChange = (event) => {

        const { name, value } = event.target;
        setStrengthData({ ...strengthData, [name]: value })

    }


    const onStrengthSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = Auth.getJwtToken();
            if (!token) throw new Error('Unauthorized!');

            const workoutData = {
                "uid": uid,
                "workouts": {
                    "name": strengthData.name,
                    "startingWeight": strengthData.weight,
                    "sets": strengthData.sets,
                    "reps": strengthData.reps,
                    "schedule": strengthData.schedule
                }
            }

            const response = await setStrength(workoutData, token);

            if (!response.ok) {
                throw new Error('Failed to add data!');
            }

            setMessage("Strength Workout Created Successfully!");

            setStrengthData({
                name: "",
                weight: "",
                sets: "",
                reps: "",
                schedule: ""
            });

        } catch (err) {
            setMessage("An error occured!");
            console.log(err)
        }

    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='resistance'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Resistance Exercise</h2>
                <form onSubmit={onStrengthSubmit} className='resistance-form d-flex flex-column'>
                    <div className='d-flex justify-content-center'><img alt="resistance" src={resistanceIcon} className="exercise-form-icon" /></div>
                    <label>Name:</label>
                    <input type="text" name="name" id="name" placeholder="Bench Press"
                        value={strengthData.name} onChange={onStrengthChange} required />
                    <label>Start Weight (lbs):</label>
                    <input type="number" name="weight" id="weight" placeholder="0"
                        value={strengthData.weight} onChange={onStrengthChange} required />
                    <label>Sets:</label>
                    <input type="number" name="sets" id="sets" placeholder="0"
                        value={strengthData.sets} onChange={onStrengthChange} required />
                    <label>Reps:</label>
                    <input type="number" name="reps" id="reps" placeholder="0"
                        value={strengthData.reps} onChange={onStrengthChange} required />
                    <label >Schedule:</label>
                    <input type="text" name="schedule" id="schedule" placeholder="Monday"
                        value={strengthData.schedule} onChange={onStrengthChange} required />
                    <button className='submit-btn' type="submit" >Add</button>
                </form>
                <p className='message' style={{ color: 'white' }}>{message}</p>
            </div>
        </div>
    )
}
