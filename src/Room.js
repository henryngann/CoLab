import React, { useEffect, useCallback, useState, useRef } from "react";
import Participant from "./Participant";
import ChatBar from "./ChatBar";

// using roomName and token, we will create a room
const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const countRef = useRef(null)

  // once room is rendered do below
  useEffect(() => {
    // if participant connects or disconnects update room properties
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
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
  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  const beginTimer = useCallback(() => {
    setIsActive(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }, []);

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      {/* <button onClick={beginTimer} className="begin">Begin</button> */}

      <ChatBar handleLogout = {handleLogout}/>

      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
        <div className="timer">{formatTime()}</div>
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
