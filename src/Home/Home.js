import React, {useContext}from "react";
import "../media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../AppContext"

// this component renders form to be passed to VideoChat.js
const Home = () => {
  const {joinRoom, roomName, handleRoomNameChange, makeCustomRoom} = useContext(AppContext)
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;

  return (
    <div>
      <form onSubmit={joinRoom}>
        <h1 className="mt-5" style={{}}>
          Join a Room
        </h1>
        <input
          type="text"
          className="form-control bradius"
          id="field"
          placeholder="Room Code: "
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
        <button className="text-align-center arrowIcon" type="submit">
          {rightElement}
        </button>
        <input type="hidden" value="workout" />
      </form>
      <h1 className="mt-5 " style={{}}>
        Make a Room
      </h1>
      <form onSubmit={makeCustomRoom} />
      <h2 className="mt-5">Or create your own workout.</h2>
      <button
        onClick={makeCustomRoom}
        className="text-align-center customIcon"
        type="submit"
      >
        Custom Workout
      </button>
    </div>
  );
};

export default Home;