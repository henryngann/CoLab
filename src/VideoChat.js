import React, { useState, useCallback, useEffect, useContext} from "react";
import Video from "twilio-video";
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
  } = useContext(AppContext)

  // ejects user from room and return them to lobby
  const handleLogout = useCallback(() => {
    handleSetRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

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
        <Room roomName={roomName} room={room} handleLogout={handleLogout} />
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
