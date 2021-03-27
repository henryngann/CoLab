import React, { useEffect, useContext, useState, useRef } from "react";
import Participant from "./Participant/Participant";
import SideBar from "./SideBar/SideBar";
import YoutubeIframe from "./YoutubeWorkout/YoutubeIframe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "./../AppContext";
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
  const [leaderParticipantIDs, setLeaderParticipantIDs] = useState([]);
  const [vid, setVid] = useState(false);
  const [mic, setMic] = useState(false);
  const [isYoutube, setIsYoutube] = useState(false);
  const { roomName, room, handleLogout } = useContext(AppContext);
  console.log(room)
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

  useEffect(() => {
    const handler = (leaderList) => {
      setLeaderParticipantIDs([...leaderList]);
    }
    sckt.socket.on('leader', handler);
    return () => sckt.socket.off('leader', handler);
  }, []);

  // show all the particpants in the room
  const remoteParticipants = () => {
    if (participants.length < 1) {
      return `No Other Participants`;
    }
    let all_participants = [...participants, room.localParticipant];
    all_participants = (isYoutube) ? all_participants : all_participants.filter((participant) => participant.sid !== leaderParticipantIDs[0])
    return all_participants
      .map((participant) => (
        <Participant key={participant.sid} participant={participant} />
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

  return (
    <div className="roomPage">
      <SideBar 
        handleLogout={handleLogout}
        currUser={room.localParticipant}
        users={participants}
      />
      <div className="container">
        <h2>
          Room: {roomName}, User: {room.localParticipant.identity}
        </h2>

        <div className="row">
          <div className="col">
            <div className="local-participant">
              {room && !isYoutube? leaderParticipant() : <Video
                log={log}
                room={room}
                videoProps={videoProps}
                updateVideoProps={updateVideoProps}
                playerRef={playerRef}
                sendVideoState={sendVideoState}
                loadVideo={loadVideo}
                playVideoFromSearch={playVideoFromSearch}
              />}
              {/* <div className="timer">{formatTime()}</div> */}
            </div>
            <div className="row">
              <div className="col">
                <div className="remote-participants">
                  {remoteParticipants()}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="icons mt-3">
                  <div className="element">{spawnVid()}</div>
                  <div className="micIcon">{spawnMic()}</div>
                  <button className="leftIcon">{leftElement}</button>
                  <button className="phoneIcon">{rightElement}</button>
                  <button className="element">{fullElement}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
