import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { userWorkoutDetails } from '../utils/API';
import Auth from "../utils/auth"
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"
import absIcon from "../assets/images/abs.png"
import strengthIcon from "../assets/images/strength.png"
import { getUsers, deleteWorkout } from '../utils/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default function EditWorkouts() {
    const [workoutData, setWorkoutData] = useState([{ name: "Select a user", type: "df" }])

    let [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(users[0]);

    const isLoggedIn = Auth.isLoggedIn();
    const token = isLoggedIn ? Auth.getJwtToken() : null;


    useEffect(() => {
        const getWorkout = async () => {
            try {
                if (!token) return false;

                const res = await getUsers(token);
                if (!res.ok) {
                    throw new Error('Failed to load data!');
                }
                const allUsers = await res.json();
                users = allUsers
                setUsers(allUsers);

            } catch (err) {
                console.error(err)
            }
        };
        getWorkout();
    }, [])

    useEffect(() => {
        try {
            if (selectedUser) {
                userWorkoutDetails(token, { "uid": selectedUser }).then((response) => {
                    if (!response.ok) {
                        setWorkoutData([]);
                        throw new Error("something went wrong!")
                    }
                    response.json().then((user) => {
                        const cardio = user.cardio;
                        const abs = user.abs;
                        const track = user.track;
                        const strength = user.strength;
                        const exercise = cardio.concat(strength).concat(abs).concat(track);

                        setWorkoutData(exercise);
                    });
                });
            }
        } catch (e) {

        }

    }, [selectedUser]);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const handleClick = (wType, id, wId) => {
        try {
            const userConfirmed = window.confirm('Are you sure you want to delete this exercise?');

            if (userConfirmed) {
                const data = {
                    type: wType,
                    workoutId: wId,
                    uid: id,
                }

                deleteWorkout(data, token).then((res) => {
                    if (!res.ok) {
                        throw new Error("something went wrong!")
                    }

                    alert("Exercise Deleted Successfully!");
                });
            }
        } catch (e) {
            alert("Failed to Delete Exercise!")
        }

    }
    console.log(workoutData)
    return (
        <div className='history'>
            <Header />
            <div className="d-flex flex-column align-items-center" style={{ paddingRight: "5%" }}>
                <h2 className='title' style={{ paddingLeft: "5%" }}>Workouts</h2>
                {/* Dropdown menu for selecting user */}
                <div style={{ paddingLeft: "6%" }}>
                    <label htmlFor="userSelect">Select User:</label>
                    <select
                        id="userSelect"
                        value={selectedUser}
                        onChange={(e) => { setSelectedUser(e.target.value); }}
                    >
                        {users.map((user, index) => (
                            <option key={index} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                {workoutData.length ?
                    (<div className='history-data'>
                        {workoutData.map((exercise) => {
                            let exerciseCard;
                            if (exercise.type === "df") {
                                return;
                            }
                            if (exercise.type === "c") {
                                exerciseCard = (
                                    <div className="history-card cardio-title d-flex" style={{ width: "200%", marginLeft: "8%" }}>
                                        <i className="fa fa-times" style={{ color: "#DC8686" }} onClick={() => { handleClick(exercise.type, selectedUser, exercise._id) }}></i>
                                        <div className='d-flex align-items-center'><img alt="cardio" src={cardioIcon} className="history-icon" /></div>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <p className='history-name'>{exercise.name}</p>
                                            <p className='history-index'>{exercise.sets} Sets</p>
                                            <p className='history-index'>{exercise.setDuration} min</p>
                                            <p className='history-index'>{exercise.schedule}</p>
                                        </div>

                                    </div>);
                            } else if (exercise.type === "a") {
                                exerciseCard = (<div className="history-card resistance-title d-flex" style={{ backgroundColor: "#ffd7b5", width: "200%", marginLeft: "9%" }}>
                                    <i className="fa fa-times" style={{ color: "#DC8686" }} onClick={() => { handleClick(exercise.type, selectedUser, exercise._id) }}></i>
                                    <div className='d-flex align-items-center'><img alt="resistance" src={absIcon} className="history-icon" /></div>
                                    <div style={{ paddingLeft: "10px" }}>
                                        <p className='history-name'>{exercise.name}</p>
                                        <p className='history-index'>{exercise.reps} Reps </p>
                                        <p className='history-index'>{exercise.sets} Sets</p>
                                        <p className='history-index'>{exercise.schedule}</p>
                                    </div>
                                </div>)
                            } else if (exercise.type === "s") {
                                exerciseCard = (
                                    <div className="history-card resistance-title d-flex" style={{ width: "200%", marginLeft: "8%" }} >
                                        <i className="fa fa-times" style={{ color: "#DC8686" }} onClick={() => { handleClick(exercise.type, selectedUser, exercise._id) }}></i>
                                        <div className='d-flex align-items-center'><img alt="resistance" src={strengthIcon} className="history-icon" /></div>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <p className='history-name'>{exercise.name}</p>
                                            <p className='history-index'>{exercise.startingWeight} pounds</p>
                                            <p className='history-index'>{exercise.reps} Reps</p>
                                            <p className='history-index'>{exercise.sets} Sets</p>
                                            <p className='history-index'>{exercise.schedule}</p>
                                        </div>
                                    </div>
                                )
                            } else {
                                exerciseCard = (
                                    <div className="history-card resistance-title d-flex" style={{ backgroundColor: "#d3ffd8", width: "200%", marginLeft: "8%" }}>
                                        <i className="fa fa-times" style={{ color: "#DC8686" }} onClick={() => { handleClick(exercise.type, selectedUser, exercise._id) }}></i>
                                        <div className='d-flex align-items-center'><img alt="resistance" src={resistanceIcon} className="history-icon" /></div>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <p className='history-name'>{exercise.name}</p>
                                            <p className='history-index'>{exercise.distance} miles</p>
                                            <p className='history-index'>{exercise.timne} min</p>
                                            <p className='history-index'>{exercise.schedule}</p>
                                        </div>
                                    </div>)
                            }
                            return (
                                <div className='history-div d-flex' style={{ width: "160%" }}>
                                    {
                                        exerciseCard
                                    }
                                </div>
                            )
                        })}
                    </div>)
                    :
                    (<div style={{ marginLeft: "8%" }}>
                        <h3 className='history-text' >No exercise data yet...</h3>
                        <Link to="/exercise"><button className='home-btn'>Add Exercise</button></Link>
                    </div>
                    )}
            </div >
        </div >
    )
}