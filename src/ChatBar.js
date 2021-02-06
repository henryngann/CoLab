import React, {useState, useEffect} from "react";
import TimerProgressBar from "./TimerProgressBar"
import { defaultWorkout } from "./DefaultWorkout"

// this component renders form to be passed to VideoChat.js
const ChatBar = (props) => {
    const {handleLogout} = props;
    const [workoutTime, setWorkoutTime] = useState(defaultWorkout[0].time);
    const [counter, setCounter] = useState(0);
    const [exercise, setExercise] = useState(defaultWorkout[0].exercise);
    const [workoutNumber, setWorkoutNumber] = useState(0);
    const [completed, setCompleted] = useState(100);


  // Third Attempts
    useEffect(() => {
        if(counter >= 0){
            const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            setCompleted(counter/workoutTime * 100)
            if(counter == 0 && workoutNumber < defaultWorkout.length-1) setWorkoutNumber(workoutNumber + 1)

            // if(workoutNumber == defaultWorkout.length-1) setExercise("DONE")

            return () => clearInterval(timer);
        }
    }, [counter]);


    useEffect(() => {
        setExercise(defaultWorkout[workoutNumber].exercise);
        setWorkoutTime(defaultWorkout[workoutNumber].time);
        setCounter(defaultWorkout[workoutNumber].time);
    }, [workoutNumber]);

    return (
        <div className="chatBar">
            <label htmlFor="room">Room name:</label>
            {/* <button onClick={setCounter(0)} className="begin">Begin</button> */}
            <button onClick={handleLogout} className="logout">Log out</button>
            <TimerProgressBar completed = {completed} time = {counter}/>
            <label>{exercise}</label>
        </div>
    );
};

export default ChatBar;
