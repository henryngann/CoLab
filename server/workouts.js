const workouts = require('./defaultWorkouts.json')

const getWorkouts = () => {
    return workouts
};

const addWorkout = (workout) => {
    if (workout.workoutName == undefined || workout.exercises == undefined) {
        return [400, 'Invalid Workout']
    }
    if (workouts.some(e => e.workoutName == workout.workoutName)) {
        return [400, 'Workout Already Exists']
    }
    workouts.push(workout)
    return [200, 'Success']
};

module.exports = { 
    getWorkouts,
    addWorkout
};