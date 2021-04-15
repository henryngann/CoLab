import React, {useState, useEffect, useContext} from "react";
import TimerProgressBar from "./TimerProgressBar/TimerProgressBar"
import { defaultWorkout } from "../CustomWorkout/DefaultWorkout"
import { AppContext } from "../../AppContext";
import Chat from './Chat/Chat';
import pause from "../../media/pause.png";
import play from "../../media/play.png";
import { Drawer, Typography, LinearProgress, IconButton, Box, Grid , Divider} from '@material-ui/core';
import {PlayArrow, Pause} from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";



const SideBar = ({
    currUser,
    users,
    isYoutube,
    drawerWidth
}) => {
    const {workout, openSideBar} = useContext(AppContext)
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
            if(counter <= 0 && workoutNumber < workout.exercises.length-1) setWorkoutNumber(workoutNumber + 1)
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

    const exerciseListMarkup = isYoutube ? <></> : (
        <React.Fragment>
            <Typography variant="body1">Now</Typography>
            <Typography variant="h5">{exercise}</Typography>
            <Typography variant="body1">Next Up</Typography>
            {
                nextUpExercise && nextUpExercise.length > 1 && typeof nextUpExercise != 'string' ? (
                    nextUpExercise.map((exercise, index) => {
                        return (<Typography key={index} variant="body2">{exercise}</Typography>)
                    })
                ) : (
                    <Typography variant="body2">{nextUpExercise}</Typography>
                )
            }
        </React.Fragment>
    )

    const TimerProgressBarMarkup = isYoutube ? <></> : (
        <React.Fragment>
            <Box display="flex" justifyContent="flex-end"><Typography variant="body1">{counter}s</Typography></Box>
            <div><LinearProgress variant="determinate" value={completed} /></div>
            <Box display="flex" justifyContent="flex-end">
                <IconButton
                    onClick={() => setStartWorkout(!startWorkout)}>
                    {(startWorkout) ? <Pause/> : <PlayArrow/>}
                </IconButton>
            </Box>
        </React.Fragment>
    )
    const useStyles = makeStyles(theme => ({
        drawerPaper: {
            width: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        fullWidth: {
            width: "100%"
        },
        fullHeight: {
            height: "100%"
        },
        containedButton: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover, &.Mui-focusVisible": { backgroundColor: theme.palette.primary.dark }
        },
        blackContainedButton: {
            backgroundColor: "black",
            color: "white",
            "&:hover, &.Mui-focusVisible": { backgroundColor: theme.palette.primary.dark }
        },
        blackButton: {
            color: "black",
        },
        }));
    const classes = useStyles();

    return (
        <Drawer
        variant="persistent"
        anchor="right"
        open={openSideBar}
        className={classes.drawer}
        classes={{
            paper: classes.drawerPaper,
          }}>
            <Box mx={2} my={2} height="100%">
                <Grid container className={classes.fullHeight}  wrap="wrap">
                    <Grid container item style={{height:"40%", width: "100%"}} justify="space-between" direction="column">
                        <Grid item>
                            {TimerProgressBarMarkup}
                            {exerciseListMarkup}
                        </Grid>
                        <Grid item><Divider /></Grid>
                    </Grid>
                    <Grid item style={{height:"60%", width:"100%"}}>
                        <Chat
                            currUser={currUser}
                            users={users}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    );
};

export default SideBar;
