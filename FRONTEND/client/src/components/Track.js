import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { setTrack } from '../utils/API';
import Header from "./Header";
import resistanceIcon from "../assets/images/resistance-w.png"

export default function Track() {
    const [absForm, setTrackForm] = useState({
        name: "",
        distance: "",
        time: "",
        schedule: ""

    })

    const [message, setMessage] = useState("");
    const isLoggedIn = Auth.isLoggedIn();


    const onTrackChange = (event) => {
        const { name, value } = event.target;
        setTrackForm({ ...absForm, [name]: value })

    }


    const onTrackSubmit = async (event) => {
        event.preventDefault();



        try {
            const token = Auth.getJwtToken();
            if (!token) throw new Error('Unauthorized!');

            const user = Auth.getUserId();

            const workoutData = {
                "uid": user.uid,
                "workouts": {
                    "name": absForm.name,
                    "distance": absForm.distance,
                    "time": absForm.time,
                    "schedule": absForm.schedule
                }
            }

            const response = await setTrack(workoutData, token);

            if (!response.ok) {
                throw new Error('Failed to add data!');
            }

            setMessage("Track Workout Created Successfully!");

            setTrackForm({
                name: "",
                distance: "",
                time: "",
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
                <h2 className='title text-center'>Add Track Exercise</h2>
                <form className='resistance-form d-flex flex-column' onSubmit={onTrackSubmit}>
                    <div className='d-flex justify-content-center'><img alt="resistance" src={resistanceIcon} className="exercise-form-icon" /></div>
                    <label>Name:</label>
                    <input type="text" name="name" id="name" placeholder="Bench Press"
                        value={absForm.name} onChange={onTrackChange} />
                    <label>Distance (KM):</label>
                    <input type="number" name="distance" id="distance" placeholder="0"
                        value={absForm.distance} onChange={onTrackChange} />
                    <label>Time</label>
                    <input type="number" name="time" id="time" placeholder="0"
                        value={absForm.time} onChange={onTrackChange} />

                    <label >Schedule:</label>
                    <input type="text" name="schedule" id="schedule" placeholder="Monday"
                        value={absForm.schedule} onChange={onTrackChange} />
                    <button className='submit-btn' type="submit" >Add</button>
                </form>
                <p className='message' style={{ color: 'white' }}>{message}</p>
            </div>
        </div>
    )
}
