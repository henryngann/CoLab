import React from "react";
import "./media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// this component renders form to be passed to VideoChat.js
const ParticipantLobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleSubmit,
  connecting,
}) => {
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="name">Name</label>
      </div>

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

      <button
        className="text-align-center mt-3 mx-auto"
        type="submit"
        disabled={connecting}
      >
        {connecting ? "Connecting" : "Join"}
      </button>

      <button className="text-align-center arrowIcon" type="submit">
        {rightElement}
      </button>
    </form>
  );
};

export default ParticipantLobby;
