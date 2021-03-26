import React, {useContext, useCallback} from "react";
import {useHistory} from 'react-router-dom'
import "../../media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../AppContext"
import Video from "twilio-video";
import { RoutesEnum } from '../../App'

// this component renders form to be passed to VideoChat.js
const JoinRoom = () => {
  const {connecting,username, roomName, handleUsernameChange, handleSetRoom, handleRoomTitle, handleSetConnecting} = useContext(AppContext)
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  const history = useHistory()

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
      Video.connect(data.token, {
        name: roomName,
      })
        .then((room) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-align-center word" style={{ width: "25rem" }}>
        Whats your name?{" "}
      </h1>
      <br />

      <div className="form-floating mb-5 mt-5">
        <input
          type="text"
          className="form-control bradius"
          id="field"
          placeholder="Username"
          onChange={handleUsernameChange}
          readOnly={connecting}
        />

        <label htmlFor="name">Enter your name here!</label>
      </div>
      <button className="text-align-center arrowIcon2" type="submit">
        {rightElement}
      </button>
      <div className="form-floating mt-5">
        <input
          type="text"
          className="form-control bradius"
          id="room"
          placeholder="Room Code"
          value={roomName}
          readOnly={true}
          required
        />
        <label htmlFor="room">Room Code</label>
      </div>
    </form>
  );
};

export default JoinRoom;
