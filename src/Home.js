import React from "react";
import "./media/CoLab.css";
// this component renders form to be passed to VideoChat.js
const Lobby = ({
  joinRoom,
  roomName,
  handleRoomNameChange,
  youtubeURL,
  handleYoutubeURLChange,
  makeCustomRoom,
  makeYoutubeRoom
}) => {
  return (
    <div>
      <form onSubmit={joinRoom}>
        <h2 className="mt-5" style={{}}>
          Join a Room
        </h2>
        <input
          type="text"
          className="form-control bradius"
          id="field"
          placeholder="Name"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
        <input
          type="hidden"
          value="workout"
        />
        <button
          className="text-align-center mt-3 mx-auto"
          type="submit"
        >Submit</button>
      </form>
      <h2 className="mt-5" style={{}}>
        Make a Room
      </h2>
      <form onSubmit={makeYoutubeRoom}>
        <input
          type="text"
          className="form-control bradius"
          id="field"
          placeholder="Youtube URL"
          value={youtubeURL}
          onChange={handleYoutubeURLChange}
          required
        />
        <button type="submit">We'll follow this video</button>
      </form>
      <hr/>
      <button onClick={makeCustomRoom}>Custom Workout</button>

    </div>
  );
};

export default Lobby;
