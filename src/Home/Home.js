import React, {useContext}from "react";
import {useHistory} from 'react-router-dom'
import "../media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../AppContext"
import { RoutesEnum } from '../App'

// this component renders form to be passed to VideoChat.js
const Home = () => {
  const {joinRoom, roomName, handleRoomNameChange, makeCustomRoom} = useContext(AppContext)
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  const history = useHistory()

  const handleCreateRoom = () =>{
    makeCustomRoom()
    history.push(RoutesEnum.CreateRoom)
  }
  
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
      {/* <form onSubmit={handleCreateRoom()} /> */}
      <h2 className="mt-5">Or create your own workout.</h2>
      <button
        onClick={handleCreateRoom}
        className="text-align-center customIcon"
        type="submit"
      >
        Custom Workout
      </button>
    </div>
  );
};

export default Home;