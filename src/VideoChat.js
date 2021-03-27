import React, { useCallback, useEffect, useContext} from "react";
import CreateRoom from "./Home/CreateRoom/CreateRoom";
import Room from "./Room/Room";
import JoinRoom from "./Home/JoinRoom/JoinRoom"
import Home from "./Home/Home";
import {AppContext} from "./AppContext"

// This component handles the data for video chat
const VideoChat = () => {

  // hooks to store data about the user, room, and connections
  const {
    room,
    handleSetRoom,
    roomName,
    roomState,
    handleLogout
  } = useContext(AppContext)

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (!(roomState === "make_custom" || roomState === "make_youtube" || roomState === "join")) {
    render = (
      <Home />);
  } else {
    if (room) {
      // renders the Room.js if we have a token
      render = (
        <Room />
      );
    } else {
      // only render the Lobby.js if we have don't have a token
      if (roomState === "make_custom" || roomState === "make_youtube") {
        render = (
          <CreateRoom />
        );
      } else {
        render = (
          <JoinRoom />
        );
      }
    }
  }
  return render;
};

export default VideoChat;
