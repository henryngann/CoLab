import React from "react";
import "./media/CoLab.css";
// this component renders form to be passed to VideoChat.js
const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mt-5" style={{}}>
        What's your name?
      </h2>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control bradius"
          id="field"
          placeholder="Name"
          value={username}
          onChange={handleUsernameChange}
          readOnly={connecting}
          required
        />
        <label htmlFor="name">Enter your Name</label>
      </div>

      <h2 className="mt-5" style={{}}>
        Make a room
      </h2>
      <div className="form-floating mt-5">
        <input
          type="text"
          className="form-control bradius"
          id="room"
          placeholder="Room Code"
          value={roomName}
          onChange={handleRoomNameChange}
          readOnly={connecting}
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
    </form>
  );
};

export default Lobby;
