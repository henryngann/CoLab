import React, { useEffect, useCallback, useState, useRef } from "react";
import Participant from "./Participant";
import SideBar from "./SideBar";
import YoutubeIframe from "./YoutubeIframe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faPhoneSlash,
  faArrowLeft,
  faArrowRight,
  faExpandAlt,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { sckt } from './Socket';

const VideoElement = <FontAwesomeIcon icon={faVideo} />;
const VideoElementMuted = <FontAwesomeIcon icon={faVideoSlash} />;
const MicElement = <FontAwesomeIcon icon={faMicrophone} />;
const PhoneElement = <FontAwesomeIcon icon={faPhoneSlash} />;
const leftElement = <FontAwesomeIcon icon={faArrowLeft} />;
const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
const fullElement = <FontAwesomeIcon icon={faExpandAlt} />;
const MicElementMuted = <FontAwesomeIcon icon={faMicrophoneSlash} />;

// using roomName and token, we will create a room
const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);
  const [vid, setVid] = useState(false);
  const [mic, setMic] = useState(false);
  const isYoutube = roomName.includes("-YT-") ? true : false;

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
  }, []); // TODO: update this to only join the room once!!!


  // sending room data

  // useEffect(() => {
  //   const handler = ({ users }) => setParticipants(users);
  //   sckt.socket.on("roomData", handler);
  //   return () => sckt.socket.off('roomData', handler);
  // }, []);

  // show all the particpants in the room
  const remoteParticipants = () => {
    // const uniqueParticipants = [...new Set(participants)]
    // setParticipants(uniqueParticipants)
    if (participants.length < 1) {
      return `No Other Participants`;
    }
    if (room.localParticipant.identity === "Leader") {
      return participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ));
    } else {
      const all_participants = [...participants, room.localParticipant];
      return all_participants
        .filter((participant) => participant.identity !== "Leader")
        .map((participant) => (
          <Participant key={participant.sid} participant={participant} />
        ));
    }
  };

  const leaderParticipant = () => {
    if (participants.length >= 1) {
      const participant = participants.filter(
        (participant) => participant.identity === "Leader"
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

  const beginTimer = useCallback(() => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  }, []);

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
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
    /*

        
    
    */
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
              {room && !isYoutube? leaderParticipant() : <YoutubeIframe roomName={roomName}/>}
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
