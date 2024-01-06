import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { setAbs } from '../utils/API';
import Header from "./Header";
import cardioIcon from "../assets/images/cardio-w.png"

export default function Abs() {
    const [cardioForm, setAbsData] = useState({
        name: "",
        reps: "",
        sets: "",
        schedule: ""
    })

    const [message, setMessage] = useState("");
    const loggedIn = Auth.isLoggedIn();

    const onAbsChange = (event) => {
        const { name, value } = event.target;
        setAbsData({ ...cardioForm, [name]: value })
    }

    const onAbsSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = Auth.getJwtToken();
            if (!token) throw new Error('Unauthorized!');

            const user = Auth.getUserId();

            const workoutData = {
                "uid": user.uid,
                "workouts": {
                    "name": cardioForm.name,
                    "sets": cardioForm.sets,
                    "reps": cardioForm.reps,
                    "schedule": cardioForm.schedule
                }
            }

            const response = await setAbs(workoutData, token);

            if (!response.ok) {
                throw new Error('Failed to add data!');
            }

            setMessage("Abs Workout Created Successfully!");

            setAbsData({
                name: "",
                reps: "",
                sets: "",
                schedule: ""
            });

        } catch (err) {
            setMessage("An error occured!");
            console.log(err)
        }

    }

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='cardio'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Abs Exercise</h2>
                <form className='cardio-form d-flex flex-column' onSubmit={onAbsSubmit}>
                    <div className='d-flex justify-content-center'><img alt="cardio" src={cardioIcon} className="exercise-form-icon" /></div>
                    <label >Name:</label>
                    <input type="text" name="name" id="name" placeholder="Running"
                        value={cardioForm.name} onChange={onAbsChange} />
                    <label >Reps:</label>
                    <input type="number" name="reps" id="reps" placeholder="0"
                        value={cardioForm.reps} onChange={onAbsChange} />
                    <label >Sets:</label>
                    <input type="number" name="sets" id="sets" placeholder="0"
                        value={cardioForm.sets} onChange={onAbsChange} />
                    <label>Schedule:</label>
                    <input type="text" name="schedule" id="schedule" placeholder="Monday"
                        value={cardioForm.schedule} onChange={onAbsChange} />
                    <button className='submit-btn cardio-submit-btn' type="submit">Add</button>
                </form>
                <p className='message' style={{ color: 'white' }}>{message}</p>
            </div>
        </div>
    )
}
