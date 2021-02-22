import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";
import Home from "./Home"
import ParticipantLobby from "./ParticipantLobby"

// This component handles the data for video chat
const VideoChat = () => {

  // hooks to store data about the user, room, and connections
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [roomState, setRoomState] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [roomTitle, setRoomTitle] = useState("")

  // update username callback function
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  // update roomname callback function
  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleRoomTitle = useCallback((event) => {
    setRoomTitle(event.target.value);
  }, []);

  // update youtube callback function
  const handleYoutubeURLChange = useCallback((event) => {
    setYoutubeURL(event.target.value);
  }, []);

  // submits username and room for an access token from twilio
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      Video.connect(data.token, {
        name: roomName,
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username]
  );

  // ejects user from room and return them to lobby
  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  const joinRoom = (event) => {
    // check if room exists here TODO
    setRoomState('join')
  }

  const makeYoutubeRoom = (event) => {
    // Generate Random CODE
    const room_code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5).toUpperCase();
    const vidIdentifier = youtubeURL.substring(youtubeURL.indexOf("=")+1, youtubeURL.indexOf("=")+12)
    console.log(vidIdentifier)
    setRoomName(room_code+"-YT-" + vidIdentifier)
    setUsername("Leader")
    setRoomState('make_youtube')
  }

  const makeCustomRoom = (event) => {
    const room_code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5).toUpperCase();
    setRoomName(room_code+"-Custom")
    setUsername("Leader")
    setRoomState('make_custom')
  }

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
      <Home
        roomName={roomName}
        handleRoomNameChange={handleRoomNameChange}
        joinRoom={joinRoom}
        makeYoutubeRoom={makeYoutubeRoom}
        makeCustomRoom={makeCustomRoom}
        youtubeURL={youtubeURL}
        handleYoutubeURLChange={handleYoutubeURLChange}
      />);
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
          <Lobby
            roomName={roomName}
            roomTitle={roomTitle}
            roomState={roomState}
            handleRoomTitle={handleRoomTitle}
            handleSubmit={handleSubmit}
            youtubeURL={youtubeURL}
            handleYoutubeURLChange={handleYoutubeURLChange}
            connecting={connecting}
          />
        );
      } else {
        render = (
          <ParticipantLobby
            username={username}
            roomName={roomName}
            handleUsernameChange={handleUsernameChange}
            handleSubmit={handleSubmit}
            connecting={connecting}
          />
        );
      }
    }
  }
  return render;
};

export default VideoChat;
