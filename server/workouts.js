const workouts = require('./defaultWorkouts.json')

const getWorkouts = () => {
    return workouts
};

module.exports = { 
    getWorkouts
};