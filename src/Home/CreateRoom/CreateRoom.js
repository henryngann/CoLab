import React, {useContext, useCallback} from "react";
import {useHistory} from 'react-router-dom'
import "../../media/CoLab.css";
import youtubeimg from "../../media/workout.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../AppContext"
import { RoutesEnum } from '../../App'
import Video from "twilio-video";

// this component renders form to be passed to VideoChat.js

const CreateRoom = () => {
  const {connecting,username, roomName, roomState, roomTitle, handleSetRoom, handleRoomTitle, handleSetConnecting} = useContext(AppContext)
  const leftElement = <FontAwesomeIcon icon={faArrowLeft} />;
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  const history = useHistory()

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
          history.push(RoutesEnum.Room)
        })
        .catch((err) => {
          console.error(err);
          handleSetConnecting(false);
        });
    },
    [roomName, username]
  );

  const makeYoutubeMarkup = (
    <>
      <button className="pleftIcon">{leftElement}</button>
      <p className="pworkout">Follow a Work Out</p>
      <div className="form-floating mb-3">
        <button
          className="text-align-center youtubeIcon"
          type="submit"
          style={{ position: "relative", left: "3rem" }}
        >
          Update Link
        </button>

        <img
          src={youtubeimg}
          alt="Logo"
          style={{
            position: "relative",
            left: "-18rem",
            width: "13rem",
            height: "8rem",
            marginTop: "1rem",
          }}
        ></img>
        <p className="pdesc">
          20 MIN FULL BODY WORKOUT - Intense Version / No Equipment I Pamela
          Reif <br></br>
          <br></br>
          <br></br>
          <p>
            <strong>Pamela Reif</strong>
          </p>
        </p>
      </div>
    </>
  )

  return (
    <>
      <form onSubmit={handleSubmit}>
        <br />
        {/* {roomState === "make_youtube" ? makeYoutubeMarkup : (
          ""
        )} */}
        <div style={{ position: "relative", left: "-19rem"}}>
          <div className="form-floating mb-3 ">
            <input
              type="text"
              className="form-control bradius"
              id="field"
              placeholder="Name"
              value={roomTitle}
              style={{
                width: "25rem",
                paddingBottom: "25px",
                paddingTop: "35px",
              }}
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
              style={{
                width: "25rem",
                height: "2.5rem",
                paddingBottom: "25px",
                paddingTop: "35px",
              }}
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
            style={{
              position: "relative",
              left: "16rem",
              width: "10rem",
              top: "-3.6rem",
              height: "3.7rem",
            }}
            className="text-align-center arrowIcon"
            type="submit"
          >
            {rightElement}
          </button>
        </div>
      </form>

      <div className="workout-list">
      <br />
      <h2>Your Workouts</h2>
      <div className="list-group">
        <button type="button">
          Cras justo odio
        </button>
      </div>
    </div>
    </>
  );
};

export default CreateRoom;