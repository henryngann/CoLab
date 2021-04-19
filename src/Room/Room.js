import React, { useEffect, useContext, useState, useRef } from "react";
import Participant from "./Participant/Participant";
import SideBar from "./SideBar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "./../AppContext";
import {Paper, Tab, Tabs, Grid, Typography, Box, IconButton} from '@material-ui/core';
import { ArrowForward, ArrowBack, Videocam, VideocamOff, Mic, MicOff, CallEnd, Fullscreen, Apps, ChevronLeft, ChevronRight } from '@material-ui/icons';
import {
  faMicrophone,
  faVideo,
  faArrowLeft,
  faArrowRight,
  faExpandAlt,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import Video from '../Video/Video';
import { getVideoType } from '../utils/video';
import { sckt } from '../Socket';
import { makeStyles } from "@material-ui/core/styles";


const VideoElement = <FontAwesomeIcon icon={faVideo} />;
const VideoElementMuted = <FontAwesomeIcon icon={faVideoSlash} />;
const MicElement = <FontAwesomeIcon icon={faMicrophone} />;
const leftElement = <FontAwesomeIcon icon={faArrowLeft} />;
const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
const fullElement = <FontAwesomeIcon icon={faExpandAlt} />;
const MicElementMuted = <FontAwesomeIcon icon={faMicrophoneSlash} />;

// using roomName and token, we will create a room
const Room = () => {
  const [participants, setParticipants] = useState([]);
  const [participantPage, setParticipantPage] = useState(0);
  const ppp = 4; // participants per page
  const [leaderParticipantIDs, setLeaderParticipantIDs] = useState([]);
  const [vid, setVid] = useState(false);
  const [mic, setMic] = useState(false);
  const [workoutType, setWorkoutType] = useState('yt'); // either 'vid' or 'yt'
  const { roomName, room, handleLogout, workout, handleSetWorkout, openSideBar, handleOpenSideBar } = useContext(AppContext);
  const loadingRoomData = useRef(true);
  // Video stuff
  const playerRef = useRef(null);
  const [videoProps, setVideoProps] = useState({
    queue: [],
    history: [],
    playing: true,
    seekTime: 0,
    receiving: false,
    initVideo: false,
    videoType: 'yt' // 'vimeo', 'twitch', 'soundcloud'
  });
  const drawerWidth = 300;

  const updateVideoProps = (paramsToChange) => {
    setVideoProps((prev) => ({ ...prev, ...paramsToChange }));
  }
  const sendVideoState = ({ eventName, eventParams }) => {
    let params = {
      name: room.localParticipant.identity,
      room: room.sid,
      eventName: eventName,
      eventParams: eventParams
    };
    sckt.socket.emit('sendVideoState', params, (error) => { });
  };
  const playVideoFromSearch = (searchItem) => {
    const url = searchItem.video.url;
    const videoType = getVideoType(url);
    if (videoType !== null) {
      updateVideoProps({ videoType });
    }
    // Handle playing video immediately
    const { history } = videoProps;
    loadVideo(searchItem, false);
    sendVideoState({
      eventName: "syncLoad",
      eventParams: { searchItem, history: [searchItem, ...history] }
    });
    updateVideoProps({ history: [searchItem, ...history] });
  }
  const loadVideo = (searchItem, sync) => {
    const { playing, seekTime, initVideo } = videoProps;
    if ((playerRef.current !== null || !initVideo) && searchItem) {
      if (!initVideo) updateVideoProps({ initVideo: true });
      let videoUrl = searchItem.video.url;
      if (sync) {
        updateVideoProps({ url: videoUrl });
        updateVideoProps({ playing });
        updateVideoProps({ receiving: false });
        playerRef.current.seekTo(seekTime, 'seconds');
      } else {
        updateVideoProps({ url: videoUrl });
        updateVideoProps({ playing: true });
        updateVideoProps({ receiving: false });
      }
      // sckt.socket.emit('updateRoomData', { video: searchItem }, (error) => { });
    }
  }
  const log = (msg, type) => {
    let baseStyles = [
      "color: #fff",
      "background-color: #444",
      "padding: 2px 4px",
      "border-radius: 2px"
    ].join(';');
    let serverStyles = [
      "background-color: gray"
    ].join(';');
    let otherStyles = [
      "color: #eee",
      "background-color: red"
    ].join(';');
    let meStyles = [
      "background-color: green"
    ].join(';');
    // Set style based on input type
    let style = baseStyles + ';';
    switch (type) {
      case "server": style += serverStyles; break;
      case "other": style += otherStyles; break;
      case "me": style += meStyles; break;
      case "none": style = ''; break;
      default: break;
    }
    console.log(`%c${msg}`, style);
  }

  // once room is rendered do below
  useEffect(() => {
    // if participant connects or disconnects update room properties
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) =>
        [...prevParticipants, participant].filter(
          (v, i, a) => a.indexOf(v) === i
        )
      );
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);

    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };

  }, [room]);

  // joins the room through sockets
  useEffect(() => {
    // TODO: Check if room exists
    const sid = room.localParticipant.sid;
    const name = room.localParticipant.identity

    sckt.socket.emit('join', { name, room: room.sid, sid }, ({ id }) => {
            // updateCurrUser({ id });
            // setTimeout(() => {
            //   setIsJoined(true);
            // }, 750);
          });
  }, []);
  // handles leader changes from server
  useEffect(() => {
    const handler = (leaderList) => {
      setLeaderParticipantIDs([...leaderList]);
    }
    sckt.socket.on('leader', handler);
    return () => sckt.socket.off('leader', handler);
  }, []);

  // handles roomData changes from server
  useEffect(() => {
    const handler = (roomDataServer) => {
      updateRoomData(roomDataServer.workoutType, roomDataServer.workoutID);
    }
    sckt.socket.on('roomData', handler);
    return () => sckt.socket.off('roomData', handler);
  }, []);

  // sends disconnect to room if they close screen
  useEffect( () => {
    window.addEventListener('beforeunload', leaveRoomIfJoined);
    // Leave Room.
    function leaveRoomIfJoined() {
      if (room) {
          room.disconnect();
      }
    }
  }, []);
  

  // uploads roomData changes to server
  useEffect(() => {
    // loading prevents sending data from server after receiving it
    if (!loadingRoomData.current) {
      const roomData = {
        "name": roomName,
        "sid": room.sid,
        "workoutID": workout.name,
        "workoutType": workoutType
      }
      sckt.socket.emit('updateRoomData', roomData, (err) => {});
    } else {
      loadingRoomData.current = false;
    }
  }, [workoutType, workout]);

  // resets participant page if there are no remote participants
  useEffect(() => {
    let all_participants = [...participants, room.localParticipant];
    all_participants = (workoutType == 'yt') ? all_participants : all_participants.filter((participant) => participant.sid !== leaderParticipantIDs[0])
    const viewer_len = all_participants.slice(participantPage * ppp, participantPage * ppp + ppp).length
    if (viewer_len == 0 && participantPage != 0) {
      setParticipantPage(0)
    }
  }, [participants]);

  const updateRoomData = (newWorkoutType, newWorkoutID) => {
    const newData = {
      "name": roomName,
      "sid": room.sid,
      "workoutID": newWorkoutID,
      "workoutType": newWorkoutType
    }
    loadingRoomData.current = true;
    setWorkoutType(newData.workoutType)

    fetch("/api/workouts?name=" + newData.workoutID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((res) => {
      loadingRoomData.current = true;
      handleSetWorkout(res)
    }).catch((err) => {
      console.log(err)
    });
  }


  // show all the particpants in the room
  const remoteParticipants = () => {
    if (participants.length < 1) {
      return `No Other Participants`;
    }
    let all_participants = [...participants, room.localParticipant];
    all_participants = (workoutType == 'yt') ? all_participants : all_participants.filter((participant) => participant.sid !== leaderParticipantIDs[0])
    return all_participants
      .slice(participantPage * ppp, participantPage * ppp + ppp)
      .map((participant) => (
        <Grid item xs={3} key={participant.sid}> 
          <Participant participant={participant} />
        </Grid>
      ));
  };


  const leaderParticipant = () => {
    if (participants.length >= 1) {
      const participant = participants.filter(
        (participant) => participant.sid === leaderParticipantIDs[0]
      )[0];
      if (participant === undefined) {
        return (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        );
      }
      return <Participant key={participant.sid} participant={participant} />;
    } else {
      return (
        <Participant
          key={room.localParticipant.sid}
          participant={room.localParticipant}
        />
      );
    }
  };

  const spawnVid = () => {
    if (vid === false) {
      return (
        <button className="btn element" onClick={handleVid}>
          {VideoElement}
        </button>
      );
    } else {
      return (
        <button className="btn element" onClick={handleVid}>
          {VideoElementMuted}
        </button>
      );
    }
  };

  const spawnMic = () => {
    if (mic === false) {
      return (
        <button className="element" onClick={handleMic}>
          {MicElement}
        </button>
      );
    } else {
      return (
        <button className="element" onClick={handleMic}>
          {MicElementMuted}
        </button>
      );
    }
  };

  const spawnIcons = () => {
    spawnMic();
    spawnVid();
  };

  const handleMic = () => {
    setMic(!mic);
  };

  const handleVid = () => {
    setVid(!vid);
    console.log(vid);
  };

  const handleChange = (value) => {
    const newWorkoutType = value ? 'yt' : 'vid';
    setWorkoutType(newWorkoutType)
  }
  const handleParticipantPage = (pageDelta) => {
    let all_participants = [...participants, room.localParticipant];
    all_participants = (workoutType == 'yt') ? all_participants : all_participants.filter((participant) => participant.sid !== leaderParticipantIDs[0])
    const newPageNum = participantPage + pageDelta;
    if (all_participants.slice(newPageNum * ppp, newPageNum * ppp + ppp).length > 0) {
      setParticipantPage(newPageNum)
    }
  }

  const useStyles = makeStyles(theme => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" justifyContent="center" my={6} className={`${classes.content} ${openSideBar ? '': (classes.contentShift)}`}>
        <Grid container >
          <Grid item container justify="space-between" xs={12}>
            <Typography variant="h4">Room: {roomName}, User: {room.localParticipant.identity}</Typography>
            <IconButton onClick={handleOpenSideBar}>
              {openSideBar ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Paper square style={{width:"83%"}}>
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={workoutType == 'yt' ? 1 : 0}
                onChange={(event, value) => { handleChange(value) }}
                aria-label="disabled tabs example"
              >
                <Tab value={0} label="Custom Workout"/>
                <Tab value={1} label="Follow a Youtube Video"/>
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box width="100%">
              {room && (workoutType == 'vid') ? leaderParticipant() : 
              <Video
                log={log}
                room={room}
                videoProps={videoProps}
                updateVideoProps={updateVideoProps}
                playerRef={playerRef}
                sendVideoState={sendVideoState}
                loadVideo={loadVideo}
                playVideoFromSearch={playVideoFromSearch}
              />}
            </Box>
          </Grid>
          <Grid item container xs={12}>{remoteParticipants()}</Grid>
          <Grid item container xs={12} >
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-start" alignItems="center">
                <IconButton>
                  <Videocam></Videocam>
                </IconButton>
                <IconButton>
                  <Mic></Mic>
                </IconButton>
                <IconButton>
                  <CallEnd></CallEnd>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton onClick={() => handleParticipantPage(-1)}>
                  <ArrowBack/>
                </IconButton>
                {participants.length + leaderParticipantIDs.length}/{participants.length + leaderParticipantIDs.length} participants {participantPage}
                <IconButton onClick={() => handleParticipantPage(1)}>
                  <ArrowForward/>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <IconButton>
                  <Apps/>
                </IconButton>
                <IconButton>
                  <Fullscreen/>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <SideBar 
        handleLogout={handleLogout}
        currUser={room.localParticipant}
        users={participants}
        isYoutube={workoutType == 'yt' ? 1 : 0}
        drawerWidth={drawerWidth}
      />
    </React.Fragment>
  );
};

export default Room;
