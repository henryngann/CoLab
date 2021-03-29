const workouts = require('./defaultWorkouts.json')

const getWorkouts = () => {
    return workouts
};

const addWorkout = (workoutName, exercises) => {
    if (workoutName == undefined || exercises == undefined || exercises.length == 0) {
        return [400, 'Invalid Workout']
    }
    if (workouts.some(e => e.workoutName == workoutName)) {
        return [400, 'Workout Already Exists']
    }
    workouts.push({workoutName, exercises})
    return [200, 'Success']
};

module.exports = { 
    getWorkouts,
    addWorkout
};