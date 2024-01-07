import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { setCardio } from '../utils/API';
import Header from "./Header";
import cardioIcon from "../assets/images/cardio-w.png"
import { useLocation } from 'react-router-dom';

export default function Cardio() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('data');

    const [cardioForm, setCardioData] = useState({
        name: "",
        sets: "",
        setDuration: "",
        schedule: ""
    })

    const [message, setMessage] = useState("")
    const isLoggedIn = Auth.isLoggedIn();

    const onCardioChange = (event) => {
        const { name, value } = event.target;
        setCardioData({ ...cardioForm, [name]: value })
    }

    const onCardioSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = Auth.getJwtToken();
            if (!token) throw new Error('Unauthorized!');

            const workoutData = {
                "uid": uid,
                "workouts": {
                    "name": cardioForm.name,
                    "sets": cardioForm.sets,
                    "setDuration": cardioForm.setDuration,
                    "schedule": cardioForm.schedule
                }
            }

            const response = await setCardio(workoutData, token);

            if (!response.ok) {
                throw new Error('Failed to add data!');
            }

            setMessage("Cardio Workout Created Successfully!");

            setCardioData({
                name: "",
                sets: "",
                setDuration: "",
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
        <div className='cardio'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Cardio Exercise</h2>
                <form className='cardio-form d-flex flex-column' onSubmit={onCardioSubmit}>
                    <div className='d-flex justify-content-center'><img alt="cardio" src={cardioIcon} className="exercise-form-icon" /></div>
                    <label >Name:</label>
                    <input type="text" name="name" id="name" placeholder="Running"
                        value={cardioForm.name} onChange={onCardioChange} />
                    <label >Sets:</label>
                    <input type="number" name="sets" id="sets" placeholder="0"
                        value={cardioForm.sets} onChange={onCardioChange} />
                    <label >Set Duration (minutes):</label>
                    <input type="number" name="setDuration" id="setDuration" placeholder="0"
                        value={cardioForm.setDuration} onChange={onCardioChange} />
                    <label>Schedule:</label>
                    <input type="text" name="schedule" id="schedule" placeholder="Monday"
                        value={cardioForm.schedule} onChange={onCardioChange} />
                    <button className='submit-btn cardio-submit-btn' type="submit">Add</button>
                </form>
                <p className='message' style={{ color: 'white' }}>{message}</p>
            </div>
        </div>
    )
}
