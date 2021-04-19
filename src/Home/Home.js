import React, {useContext, useState, useEffect}from "react";
import {useHistory} from 'react-router-dom'
// import "../media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../AppContext"
import { RoutesEnum } from '../App'
import { Link, InputAdornment, Paper, IconButton, Button, TextField, Box, Typography, Grid } from '@material-ui/core';
import { ArrowForward, PeopleAltOutlined, AccessTime, Edit } from '@material-ui/icons';
import mockDesign from "../media/mock_design.png";
import mockDesignTwo from "../media/mock_design_2.png";
import AOS from "aos";
import "aos/dist/aos.css";


// this component renders form to be passed to VideoChat.js
const Home = () => {
  const {joinRoom, roomName, handleRoomNameChange, makeCustomRoom} = useContext(AppContext)
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  const history = useHistory()
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    AOS.init({once: true});
  }, []);

  const handleCreateRoom = () =>{
    makeCustomRoom()
    history.push(RoutesEnum.CreateRoom)
  }
  
  const handleJoinRoom = (event) =>{
    fetch(`/api/rooms?sid_or_name=${roomName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.text().then((res) => {
          joinRoom()
          history.push(RoutesEnum.JoinRoom)
        });
      } else {
        res.text().then((res) => {
          setErrMessage(res)
        });
      }
      
    }).catch((err) => {
      console.error(err);
    });
    event.preventDefault();
  }

  return (
    
    <div>
      <Box my={15} mx={6}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6} >
            <Box mb={4}>
              <Typography variant="h3" gutterBottom>
                SynchroCise makes exercise fun
              </Typography>
            </Box>
            <Box mb={10}>
              <Typography variant="body1" gutterBottom>
                Create and join workout rooms with friends, coworkers, classes, teams, and other fun groups of people. SynchroCise makes it easy to follow workouts while connecting you to those that matter.
              </Typography>
            </Box>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" justifyContent="center"><Typography variant="body1"><b>In a Hurry?</b> Join as a Guest.</Typography></Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" justifyContent="center"><Typography variant="body1"><b>Want to</b> make a room?</Typography></Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="flex-start" justifyContent="center">
                  <form onSubmit={handleJoinRoom}>
                    <TextField required variant="outlined" placeholder="Room Code:" size='small' value={roomName} onChange={handleRoomNameChange} helperText={errMessage} error={errMessage != ''}
                    InputProps={{endAdornment:
                      (<InputAdornment position="end">
                        <IconButton color="primary" edge="end" variant="contained" type="submit"><ArrowForward/></IconButton>
                      </InputAdornment>)}}
                    ></TextField>
                  </form>
                </Box> 
            </Grid>
              <Grid item xs={6}>
                <Box mx={3} display="flex" alignItems="top" justifyContent="center">
                  <Button color="primary" size="large" fullWidth={true} variant="contained" onClick={handleCreateRoom}>Create Room</Button>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="body2" color="textSecondary">or paste the room url in your browser</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="body2" color="textSecondary">Already a member? <Link color="primary">Sign in</Link></Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={2}>
              <img src={mockDesign} style={{objectFit: "contain", maxWidth: "100%", maxHeight: "100%",}}></img>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box bgcolor="#F3F3F3" py={10}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Box>
              <img src={mockDesignTwo} style={{objectFit: "contain", maxWidth: "100%", maxHeight: "100%",}}></img>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box mr={12} py={4} style={{maxHeight: "100%"}}>
              <Grid container spacing={10} justify="center">
                <Grid container item data-aos="zoom-in-left" xs={12}>
                  <Grid item xs={4}>
                    <Box display="flex" justifyContent="center">
                      <IconButton disabled style={{backgroundColor: "#F1CC6E", color: "#FFFFFF"}}><PeopleAltOutlined style={{ fontSize: '200%' }}/></IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1"><b>Connect With Friends</b></Typography>
                    <Typography variant="body2">Stay fit while connecting with the people that matter</Typography>
                  </Grid>
                </Grid>
                <Grid container item data-aos="zoom-in-left" xs={12}>
                  <Grid item xs={4}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <IconButton disabled style={{backgroundColor: "#48A0F1", color: "#FFFFFF"}}><AccessTime style={{ fontSize: '200%' }}/></IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1"><b>Timer and Queue</b></Typography>
                    <Typography variant="body2">You’ll always know when the next workout is coming</Typography>
                  </Grid>
                </Grid>
                <Grid container item data-aos="zoom-in-left" xs={12}>
                  <Grid item xs={4}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <IconButton disabled style={{backgroundColor: "#D38BF5", color: "#FFFFFF"}}><Edit style={{ fontSize: '200%' }}/></IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1"><b>Customized Workouts</b></Typography>
                    <Typography variant="body2">Create your own workouts for you and your friends</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box my={10} display="flex">
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h5">Get Started!</Typography>
            </Box>
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button color="primary" size="large" variant="contained" fullWidth={true}>Sign up</Button>
            </Box>
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="body2" color="textSecondary">Already a member? <Link color="primary">Sign in</Link></Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;