const express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config');
const router = express.Router();

const { getWorkouts, addWorkout, getWorkoutByName } = require('./workouts.js');
const { addRoom, getRoom } = require('./rooms.js');
;
const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

router.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// TWILIO
router.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});
router.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

// WORKOUTS
router.get('/api/workouts', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const workoutName = req.query.name;
  if (workoutName == undefined) {
    res.send(JSON.stringify(getWorkouts()));
  } else {
    res.send(getWorkoutByName(workoutName));
  }
});

router.post('/api/workouts', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const workout = req.body;
  const [code, msg] = addWorkout(workout.workoutName, workout.exercises);
  res.status(code).send(msg);
});

// ROOMS
router.get('/api/rooms', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const sid_or_name = req.body.sid_or_name;
  room = getRoom(sid_or_name);
  if (room != undefined){
    res.send(JSON.stringify(room));
  } else {
    res.status(400).send('Unable to find room')
  }
});

router.post('/api/rooms', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const room = req.body;
  const [code, msg] = addRoom(room.name, room.sid, room.workoutID, room.workoutType);
  res.status(code).send(msg);
});

module.exports = router;