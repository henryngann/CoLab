import React, { useEffect, useCallback, useState, useRef } from "react";
import Participant from "./Participant";
import ChatBar from "./ChatBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faPhoneSlash,
  faArrowLeft,
  faArrowRight,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";

const VideoElement = <FontAwesomeIcon icon={faVideo} />;
const MicElement = <FontAwesomeIcon icon={faMicrophone} />;
const PhoneElement = <FontAwesomeIcon icon={faPhoneSlash} />;
const leftElement = <FontAwesomeIcon icon={faArrowLeft} />;
const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
const fullElement = <FontAwesomeIcon icon={faExpandAlt} />;

// using roomName and token, we will create a room
const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);

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

  // show all the particpants in the room
  const remoteParticipants = () => {
    // const uniqueParticipants = [...new Set(participants)]
    // setParticipants(uniqueParticipants)
    console.log(participants.length);
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

  return (
    <div className="roomPage">
      <ChatBar handleLogout={handleLogout} />
      <div className="container">
        <h2>
          Room: {roomName}, User: {room.localParticipant.identity}
        </h2>

        <div className="row">
          <div className="col">
            <div className="local-participant">
              {room ? leaderParticipant() : ""}
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
                <div className="icons">
                  <h1 className="element">{VideoElement}</h1>
                  <h1 className="element">{MicElement}</h1>
                  <h1 className="phoneIcon">{PhoneElement}</h1>
                  <h1 className="element">{fullElement}</h1>
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
