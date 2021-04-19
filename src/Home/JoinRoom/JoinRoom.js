import React, {useContext, useCallback, useEffect, useState, useRef} from "react";
import {useHistory} from 'react-router-dom'
// import "../../media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../AppContext"
import Video from "twilio-video";
import { RoutesEnum } from '../../App'
import { Link, InputAdornment, Paper, IconButton, Button, TextField, Box, Typography, Grid } from '@material-ui/core';
import { ArrowBack, ArrowForward, Videocam, VideocamOff, Mic, MicOff } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";



// this component renders form to be passed to VideoChat.js
const JoinRoom = () => {
  const {connecting,username, roomName, handleUsernameChange, handleSetRoom, handleRoomTitle, handleSetConnecting} = useContext(AppContext)
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  const [videoTracks, setVideoTracks] = useState([]);

  const videoRef = useRef(); 
  const videoContainerRef = useRef();
  const history = useHistory()

  // create local video track
  useEffect(() => {
    async function getLocalTrack() {
      const videoTrack = await Video.createLocalVideoTrack();
      setVideoTracks(() => [...videoTracks, videoTrack]);
    }
    getLocalTrack()
    // const tracks = await createLocalTracks({
    //   audio: true,
    //   video: { facingMode: 'user' }
    // });
  }, [])

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      handleSetConnecting(true);
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      // // Join the Room with the pre-acquired LocalTracks.
      // const room = await connect('token', {
      //   name: 'my-cool-room',
      //   tracks
      // });
      Video.connect(data.token, {
        name: roomName,
        tracks: videoTracks
      })
        .then((room) => {
          room.localParticipant.tracks.forEach(localTracks => {
            localTracks.setPriority('low')
          });
          handleSetConnecting(false);
          handleSetRoom(room);
          history.push(RoutesEnum.Room)
        })
        .catch((err) => {
          console.error(err);
          handleSetConnecting(false);
        });
    },
    [roomName, username]
  );
  const useStyles = makeStyles(theme => ({
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
    <Box display="flex" alignItems="center" justifyContent="center" mx={15} my={6}>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center" spacing={4} wrap="nowrap">
          <Grid item xs={1} >
            <IconButton
              className={classes.blackButton}
              onClick={()=>{history.push(RoutesEnum.Home)}}>
              <ArrowBack/>
            </IconButton>
          </Grid>
          <Grid container item xs spacing={2}>
            <Grid item xs={12}>
              <Box mb={4}>
                <Typography variant="h4">
                  Room: {roomName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}><b>Room Owner</b></Grid>
            <Grid item xs={6}><b>Today's Workout</b></Grid>
            <Grid item xs={6}>Test User</Grid>
            <Grid item xs={6}>Test Workout!</Grid>
            <Grid item xs={5}>
              <Box mt={4}>
                <TextField
                  placeholder="Username"
                  variant="outlined"
                  fullWidth
                  required
                  value={username}
                  onChange={handleUsernameChange}
                  readOnly={connecting}
                />
              </Box>
            </Grid>
            <Grid item xs={7}/>
            <Grid item xs={5}>
              <TextField
                placeholder="Room Code:"
                variant="outlined"
                fullWidth
                value={roomName}
                disabled
              />
            </Grid>
            <Grid item xs={7}/>
            <Grid item xs={12}><hr/></Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h4">How you'll appear</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" ref={videoContainerRef}>
                {(videoRef) ? <video ref={videoRef} autoPlay={true}  style={{width: "100%", maxHeight: "100%"}}/> : ''}
              </Box>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                className={classes.blackContainedButton}>
                <Videocam/>
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                className={classes.blackContainedButton}>
                <Mic/>
              </IconButton>
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
  );
};

export default JoinRoom;
