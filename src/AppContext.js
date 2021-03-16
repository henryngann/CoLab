import React, { useState, createContext, useCallback} from 'react';
import Video from "twilio-video";

const AppContext = createContext([{}, () => {}]);

const AppContextProvider = ({children}) => {
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomState, setRoomState] = useState(null);
  const [roomTitle, setRoomTitle] = useState("")

  const handleSetRoom = (room) => {
    setRoom(room)
  }
  const handleSetConnecting = (connecting) => {
    setConnecting(connecting)
  }
  const handleSetUsername = (username) => {
    setUsername(username)
  }
  const handleSetRoomName = (roomname) => {
    setRoomName(roomname)
  }
  const handleSetRoomState = (roomState) => {
    setRoomState(roomState)
  }

  const handleSetRoomTitle = (roomTitle) => {
    setRoomTitle(roomTitle)
  }

  // const createRoom = (room_code) => {
  //   setRoomName(room_code)
  //   setUsername("Leader")
  //   setRoomState('make_custom')
  // }

  const disconnectRoom = () => {
    setRoomName("")
    setUsername("")
    setRoomState(null)
  }

  const joinRoom = () => {
    // check if room exists here TODO
    setRoomState('join')
  }

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      handleSetConnecting(true);
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
          handleSetConnecting(false);
          handleSetRoom(room);
        })
        .catch((err) => {
          console.error(err);
          handleSetConnecting(false);
        });
    },
    [roomName, username]
  );

  const handleUsernameChange = useCallback((event) => {
    handleSetUsername(event.target.value);
  }, []);

  const handleRoomTitle = useCallback((event) => {
    setRoomTitle(event.target.value);
  }, []);

  const makeCustomRoom = (event) => {
    const room_code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5).toUpperCase();
    setRoomName(room_code)
    setUsername("Leader")
    setRoomState('make_custom')
  }

  const handleRoomNameChange = useCallback((event) => {
    handleSetRoomName(event.target.value);
  }, []);

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

  return (
      <AppContext.Provider value={{
        room,
        handleSetRoom,
        connecting,
        handleSetConnecting,
        username,
        handleSetUsername,
        roomName,
        handleSetRoomName,
        roomState,
        handleSetRoomState,
        roomTitle,
        handleSetRoomTitle,
        disconnectRoom,
        joinRoom,
        handleSubmit,
        handleUsernameChange,
        handleRoomTitle,
        makeCustomRoom,
        handleRoomNameChange,
        handleLogout
      }}>
          {children}
      </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
