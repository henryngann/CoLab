import React, {useState, useEffect} from "react";
import TimerProgressBar from "./TimerProgressBar"
import { defaultWorkout } from "./DefaultWorkout"

// this component renders form to be passed to VideoChat.js
const ChatBar = () => {
    const [workoutTime, setWorkoutTime] = useState(defaultWorkout[0].time);
    const [counter, setCounter] = useState(defaultWorkout[0].time);
    const [exercise, setExercise] = useState(defaultWorkout[0].exercise);
    const [workoutNumber, setWorkoutNumber] = useState(0);
    const [completed, setCompleted] = useState(100);
    const [startWorkout, setStartWorkout] = useState(false);
    const nextUpExerciseList = defaultWorkout.map((workout) => { <li key={workout.exercise}> {workout.exercise} </li>})
    const [nextUpExercise, setNextUpExercise] = useState(nextUpExerciseList);

    console.log(nextUpExerciseList)
    
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
        setNextUpExercise(nextUpExerciseList.shift());
    }, [workoutNumber]);



    return (
        <div className="chatBar">
                <div className="resumeWorkout"><label>{counter + "s"}</label></div>
                <TimerProgressBar completed = {completed} time = {counter}/>
                <button className="resumeWorkout" onClick={() => setStartWorkout(!startWorkout)}>Begin</button>
            {/* <br></br>
            <label>{exercise}</label> */}
            <div className="exerciseList">
                <h6>Now</h6>
                <strong><h3>{exercise}</h3></strong>
                <br />
                <h6>Next Up</h6>
                {nextUpExercise}
            </div>
        </div>
    );
};

export default ChatBar;
