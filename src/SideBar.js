import React, {useState, useEffect} from "react";
import TimerProgressBar from "./TimerProgressBar"
import { defaultWorkout } from "./DefaultWorkout"
import Chat from './Chat/Chat';
import pause from "./media/pause.png";
import play from "./media/play.png";

const SideBar = ({
    currUser,
    users
}) => {
    const [workoutTime, setWorkoutTime] = useState(defaultWorkout[0].time);
    const [counter, setCounter] = useState(defaultWorkout[0].time);
    const [exercise, setExercise] = useState(defaultWorkout[0].exercise);
    const [workoutNumber, setWorkoutNumber] = useState(0);
    const [completed, setCompleted] = useState(100);
    const [startWorkout, setStartWorkout] = useState(false);
    const [nextUpExercise, setNextUpExercise] = useState(defaultWorkout.map((workout, index) => { if(index != 0)  return workout.exercise}));
    
    useEffect(() => {
        if(startWorkout){
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
            setCompleted(counter/workoutTime * 100)
            if(counter == 0 && workoutNumber < defaultWorkout.length-1) setWorkoutNumber(workoutNumber + 1)
        }
    }, [counter, startWorkout]);


    useEffect(() => {
        setExercise(defaultWorkout[workoutNumber].exercise);
        setWorkoutTime(defaultWorkout[workoutNumber].time);
        setCounter(defaultWorkout[workoutNumber].time);
        
        if(workoutNumber == 0) {
            nextUpExercise.shift()
            setNextUpExercise(nextUpExercise)
        }
        if(workoutNumber != 0 && nextUpExercise.length >= 1){ 
            nextUpExercise.shift()
            setNextUpExercise(nextUpExercise)
            console.log(nextUpExercise)
        }
    }, [workoutNumber]);

    const image = startWorkout ? pause : play;

    return (
        <div className="sideBar">
                <div className="resumeWorkout"><label>{counter + "s"}</label></div>
                <TimerProgressBar completed = {completed} time = {counter}/>
                <button id="playPauseButtom" className="resumeWorkout" onClick={() => setStartWorkout(!startWorkout)}><img src={image} alt="pause"/></button>
            <div className="exerciseList">
                <h6>Now</h6>
                <strong><h3>{exercise}</h3></strong>
                <br />
                <h6>Next Up</h6>
                <div>{
                    nextUpExercise && nextUpExercise.length > 1 && typeof nextUpExercise != 'string'? nextUpExercise.map((exercise) => {
                        return (<h6 key={exercise}>{exercise}</h6>)
                    }) : <h6>{nextUpExercise}</h6>
                }</div>
            </div>
            <div className="commentSection">
                <Chat
                    currUser={currUser}
                    users={users}
                />
            </div>
        </div>
    );
};

export default SideBar;
