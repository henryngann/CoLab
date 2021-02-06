import React from "react";
import "./media/CoLab.css";
// this component renders form to be passed to VideoChat.js
const Lobby = ({
  roomName,
  roomState,
  handleSubmit,
  roomTitle,
  handleRoomTitle,
  connecting,
  youtubeURL,
  handleYoutubeURLChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <br />
      {roomState === "make_youtube" ? (
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bradius"
            id="field"
            placeholder="Youtube URL"
            value={youtubeURL}
            onChange={handleYoutubeURLChange}
            required
          />
          <label htmlFor="name">Youtube URL</label>
          <p>Placeholder for Youtube Preview</p>
        </div>
      ) : (
        ""
      )}
      
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control bradius"
          id="field"
          placeholder="Name"
          value={roomTitle}
          onChange={handleRoomTitle}
          readOnly={connecting}
          required
        />
        <label htmlFor="name">Enter your Room Title</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control bradius"
          id="field"
          placeholder="Password"
          readOnly={connecting}
        />
        <label htmlFor="name">Room Password (optional)</label>
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
        {connecting ? "Connecting" : "Create"}
      </button>

      {roomState === "make_custom" ? (
        <div>
          <br />
          <h2>Your Workouts</h2>
          <p>List of Workouts PlaceHolder</p>
        </div>
      ) : (
        ""
      )}

    </form>

  );
};

export default Lobby;
