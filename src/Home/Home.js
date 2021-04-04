import React, {useContext, useState}from "react";
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
  const [errMessage, setErrMessage] = useState('')

  const handleCreateRoom = () =>{
    makeCustomRoom()
    history.push(RoutesEnum.CreateRoom)
  }
  
  const handleJoinRoom = (event) =>{
    fetch(`/api/rooms?sid_or_name=${roomName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.text().then((res) => {
          joinRoom()
          history.push(RoutesEnum.JoinRoom)
        });
      } else {
        res.text().then((res) => {
          setErrMessage(res)
        });
      }
      
    }).catch((err) => {
      console.error(err);
    });
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleJoinRoom}>
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
        {errMessage}
      </form>
      <h1 className="mt-5 " style={{}}>
        Create a Room
      </h1>
      {/* <form onSubmit={handleCreateRoom()} /> */}
      {/* <h2 className="mt-5">Or create your own workout.</h2> */}
      <button
        onClick={handleCreateRoom}
        className="text-align-center customIcon"
        type="submit"
      >
        Create Room
      </button>
    </div>
  );
};

export default Home;