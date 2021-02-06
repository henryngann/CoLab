import React, {useState, useEffect} from "react";
import TimerProgressBar from "./TimerProgressBar"
import { defaultWorkout } from "./DefaultWorkout"

// this component renders form to be passed to VideoChat.js
const ChatBar = (props) => {
    const {handleLogout} = props;
    const [workoutTime, setWorkoutTime] = useState(defaultWorkout[0].time);
    const [counter, setCounter] = useState(defaultWorkout[0].time);
    const [exercise, setExercise] = useState(defaultWorkout[0].exercise);
    const [workoutNumber, setWorkoutNumber] = useState(0);
    const [completed, setCompleted] = useState(100);
    const [startWorkout, setStartWorkout] = useState(false);

    useEffect(() => {
        if(counter > 0 && startWorkout){
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
            setCompleted(counter/workoutTime * 100)
            if(counter == 0 && workoutNumber < defaultWorkout.length-1) setWorkoutNumber(workoutNumber + 1)
        }
    }, [counter, startWorkout]);


    useEffect(() => {
        setExercise(defaultWorkout[workoutNumber].exercise);
        setWorkoutTime(defaultWorkout[workoutNumber].time);
        setCounter(defaultWorkout[workoutNumber].time);
    }, [workoutNumber]);

    return (
        <div className="chatBar">
            <label htmlFor="room">Room name:</label>
            <button onClick={() => setStartWorkout(true)} className="begin">Begin</button>
            <button onClick={handleLogout} className="logout">Log out</button>
            <TimerProgressBar completed = {completed} time = {counter}/>
            <label>{exercise}</label>
        </div>
    );
};

export default ChatBar;
