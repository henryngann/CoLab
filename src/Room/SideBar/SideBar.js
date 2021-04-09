import React, {useState, useEffect, useContext} from "react";
import TimerProgressBar from "./TimerProgressBar/TimerProgressBar"
import { defaultWorkout } from "../CustomWorkout/DefaultWorkout"
import { AppContext } from "../../AppContext";
import Chat from './Chat/Chat';
import pause from "../../media/pause.png";
import play from "../../media/play.png";

const SideBar = ({
    currUser,
    users,
    isYoutube
}) => {
    const {workout} = useContext(AppContext)
    const [workoutTime, setWorkoutTime] = useState(workout.exercises[0].time);
    const [counter, setCounter] = useState(workout.exercises[0].time);
    const [exercise, setExercise] = useState(workout.exercises[0].exercise);
    const [workoutNumber, setWorkoutNumber] = useState(0);
    const [completed, setCompleted] = useState(100);
    const [startWorkout, setStartWorkout] = useState(false);
    const [nextUpExercise, setNextUpExercise] = useState(workout.exercises.map((workout, index) => { if(index !== 0)  return workout.exercise}));
    
    useEffect(() => {
        setWorkoutTime(workout.exercises[0].time);
        setCounter(workout.exercises[0].time);
        setExercise(workout.exercises[0].exercise);
        setWorkoutNumber(0);
        setCompleted(100);
        setStartWorkout(false);
        setNextUpExercise(workout.exercises.map((workout, index) => { if(index !== 0)  return workout.exercise}));
    }, [workout]);

    useEffect(() => {
        if(startWorkout){
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
            setCompleted(counter/workoutTime * 100)
            if(counter === 0 && workoutNumber < workout.exercises.length-1) setWorkoutNumber(workoutNumber + 1)
        }
    }, [counter, startWorkout, workoutNumber, workoutTime]);


    useEffect(() => {
        setExercise(workout.exercises[workoutNumber].exercise);
        setWorkoutTime(workout.exercises[workoutNumber].time);
        setCounter(workout.exercises[workoutNumber].time);
        
        if(workoutNumber === 0) {
            nextUpExercise.shift()
            setNextUpExercise(nextUpExercise)
        }
        if(workoutNumber !== 0 && nextUpExercise.length >= 1){ 
            nextUpExercise.shift()
            setNextUpExercise(nextUpExercise)
        }
    }, [workoutNumber]);

    const image = startWorkout ? pause : play;

    const exerciseListMarkup = isYoutube ? <></> : (
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
    )

    const TimerProgressBarMarkup = isYoutube ? <></> : (
        <>
            <div className="resumeWorkout"><label>{counter + "s"}</label></div>
            <TimerProgressBar completed = {completed} />
            <button id="playPauseButtom" className="resumeWorkout" onClick={() => setStartWorkout(!startWorkout)}><img src={image} alt="pause"/></button>
        </>
    )

    return (
        <div className="sideBar">
            {TimerProgressBarMarkup}
            {exerciseListMarkup}
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
