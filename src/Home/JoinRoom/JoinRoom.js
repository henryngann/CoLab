import React from "react";
import "../../media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// this component renders form to be passed to VideoChat.js
const JoinRoom = ({
  username,
  handleUsernameChange,
  roomName,
  handleSubmit,
  connecting,
}) => {
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
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
