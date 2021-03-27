const express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config');
const router = express.Router();

const { getWorkouts, addWorkout } = require('./workouts.js');

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

router.get('/api/workouts', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getWorkouts()));
});

router.post('/api/workouts', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const workout = req.body.workout;
  const [code, addWorkoutMsg] = addWorkout(workout);
  res.status(code).send(addWorkoutMsg);
});

module.exports = router;