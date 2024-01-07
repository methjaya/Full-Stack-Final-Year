import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { workoutDetails } from '../utils/API';
import Auth from "../utils/auth"
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"

export default function History() {
  const [workoutData, setWorkoutData] = useState([])

  const isLoggedIn = Auth.isLoggedIn();

  useEffect(() => {
    const getWorkout = async () => {
      try {

        const token = isLoggedIn ? Auth.getJwtToken() : null;
        if (!token) return false;

        const response = await workoutDetails(token);

        if (!response.ok) {
          throw new Error("something went wrong!")
        }

        const user = await response.json()


        const cardio = user.cardio;
        const abs = user.abs;
        const track = user.track;
        const strength = user.strength;
        const exercise = cardio.concat(strength).concat(abs).concat(track);

        console.log(exercise);
        setWorkoutData(exercise)

      } catch (err) { console.error(err) }
    };
    getWorkout();
  }, [isLoggedIn])


  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center" style={{paddingRight : "5%"}}>
        <h2 className='title' style={{paddingLeft : "5%"}}>Workouts</h2>
        {workoutData.length ?
          (<div className='history-data'>

            {workoutData.map((exercise) => {

              let exerciseCard;
              if (exercise.type === "c") {
                exerciseCard = (
                  <div className="history-card cardio-title d-flex" style={{width : "200%",marginLeft: "8%"}}>
                    <div className='d-flex align-items-center'><img alt="cardio" src={cardioIcon} className="history-icon" /></div>
                    <div style={{ paddingLeft: "10px" }}>
                      <p className='history-name'>{exercise.name}</p>
                      <p className='history-index'>{exercise.sets} Sets</p>
                      <p className='history-index'>{exercise.setDuration} min</p>
                      <p className='history-index'>{exercise.schedule}</p>
                    </div>
                  </div>);
              } else if (exercise.type === "a") {
                exerciseCard = (<div className="history-card resistance-title d-flex" style={{backgroundColor:"#ffd7b5",width : "200%",marginLeft: "8%"}}>
                  <div className='d-flex align-items-center'><img alt="resistance" src={resistanceIcon} className="history-icon" /></div>
                  <div style={{ paddingLeft: "10px" }}>
                    <p className='history-name'>{exercise.name}</p>
                    <p className='history-index'>{exercise.reps} Reps </p>
                    <p className='history-index'>{exercise.sets} Sets</p>
                    <p className='history-index'>{exercise.schedule}</p>
                  </div>
                </div>)
              } else if (exercise.type === "s") {
                exerciseCard = (
                  <div className="history-card resistance-title d-flex" style={{width : "200%",marginLeft: "8%"}} >
                    <div className='d-flex align-items-center'><img alt="resistance" src={resistanceIcon} className="history-icon" /></div>
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
                  <div className="history-card resistance-title d-flex" style={{backgroundColor:"#d3ffd8",width : "160%",marginLeft: "8%" }}>
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
                <div className='history-div d-flex' style={{width : "160%"}}>                 
                    {
                      exerciseCard
                    }              
                </div>
              )
            })}
          </div>)
          :
          (<div style={{ marginLeft: "8%" }}>
            <h3 className='history-text'>No exercise data yet...</h3>
          </div>
          )}
      </div >
    </div >
  )
}
