import React, {useContext, useCallback, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
// import "../../media/CoLab.css";
import {AppContext} from "../../AppContext"
import { RoutesEnum } from '../../App'
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Box, Typography, TextField, InputAdornment, Grid, Button} from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse } from '@material-ui/core';
import { ArrowForward, Close, CreateOutlined, Add } from '@material-ui/icons';

// this component renders form to be passed to VideoChat.js
const CreateWorkout = () => {
  const history = useHistory()
  const {connecting, username, workout, handleSetConnecting, handleSetWorkout} = useContext(AppContext)
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([{'exercise': '', 'time': ''}])
  const [selectedExercise, setSelectedExercise] = useState(0)
  const [badExerciseIndices, setBadExerciseIndices] = useState([])

  const useStyles = makeStyles(theme => ({
    containedButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover, &.Mui-focusVisible": { backgroundColor: theme.palette.primary.dark }
    },
    errorRow: {
      backgroundColor: theme.palette.error.light
    },
    blackButton: {
      color: "black",
    },
    addWorkout: {
      borderRadius: 10,
    },
  }));
  const classes = useStyles();
  const handleWorkoutName = useCallback((event) => {
    setWorkoutName(event.target.value);
  }, []);

  const handleAddExercise = () => {
    // checks current selected exercise
    const exercise = {'exercise': '', 'time': ''};
    setSelectedExercise(exercises.length);
    setExercises([...exercises, exercise]);
  }

  const handleExcerciseName = (event) => {
    let newArr = [...exercises];
    newArr[selectedExercise].exercise = event.target.value;
    setExercises(newArr)
  }

  const handleTime = (event) => {
    let newArr = [...exercises];
    console.log(parseInt(event.target.value))
    newArr[selectedExercise].time = event.target.value;
    setExercises(newArr)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSetConnecting(true);
    setSelectedExercise(null);
    if (exercises.length > 0 && badExerciseIndices.length == 0) {
      const newWorkout = { workoutName, exercises }
      fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(newWorkout),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.text()).then((res) => {
        handleSetConnecting(false)
        history.push(RoutesEnum.CreateRoom)
      });
    } else {
      handleSetConnecting(false);
    }
  }

  const handleSelected = (index) => {
    const e = exercises[selectedExercise];
    setSelectedExercise(index)
  }

  const handleRemoveRow = (index) => {
    const newArr = [...exercises]
    newArr.splice(index, 1)
    setExercises(newArr)
    if (selectedExercise == index) setSelectedExercise(null)
    else if (selectedExercise > index) setSelectedExercise(selectedExercise - 1)
  }
  // updates bad indices
  useEffect(() => {
    const newBadExerciseIndices = exercises.reduce((arr, e, i) => {
      if (!(e.time && e.exercise && !isNaN(parseInt(e.time)))) arr.push(i)
      return arr
    }, [])
    setBadExerciseIndices(newBadExerciseIndices)
  }, [exercises])

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mx={12} my={6}>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center" spacing={4} wrap="nowrap">
          <Grid item xs={1}>
            <IconButton
              className={classes.blackButton}
              onClick={()=>{history.push(RoutesEnum.CreateRoom)}}>
              <Close/>
            </IconButton>
          </Grid>
          <Grid item container xs spacing={2}>
            <Grid item xs={12}>
              <Box mb={4}><Typography variant="h4">Create New Workout</Typography></Box>
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Workout Name"
                variant="outlined"
                fullWidth
                value={workoutName}
                onChange={handleWorkoutName}
                readOnly={connecting}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreateOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={7}/> 
            <Grid item xs={12}>
              <Table>
                <TableBody>
                  {exercises.map((exerciseRow, index) => (
                    <TableRow key={index} hover selected={selectedExercise == index}
                      className={(badExerciseIndices.includes(index) ? classes.errorRow : '')}>
                      {
                        selectedExercise == index ? (
                          <React.Fragment>
                            <TableCell>
                              <TextField
                                margin='none'
                                label="Excercise Name"
                                value={exerciseRow.exercise}
                                onChange={handleExcerciseName}
                                required>
                              </TextField>
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                margin='none'
                                label="Seconds"
                                value={exerciseRow.time}
                                onChange={handleTime}
                                required>
                              </TextField>
                            </TableCell>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <TableCell onClick={() => handleSelected(index)}>
                              <Typography variant="body1">{exerciseRow.exercise}</Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSelected(index)}>
                              <Typography variant="body1">{exerciseRow.time}</Typography>
                            </TableCell>
                          </React.Fragment>
                        )
                      }
                      <TableCell padding="checkbox">
                        <IconButton onClick={() => handleRemoveRow(index)}><Close/></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.addWorkout}
                variant="outlined"
                size="large"
                onClick={handleAddExercise}
                startIcon={<Add/>}>
                Add New Workout
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Box height="100%" display="flex" alignItems="flex-end">
              <IconButton
                color="primary"
                className={classes.containedButton}
                type="submit">
                <ArrowForward/>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
};

export default CreateWorkout;