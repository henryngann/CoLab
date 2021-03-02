import React, {useContext} from "react";
import "../../media/CoLab.css";
import youtubeimg from "../../media/workout.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../AppContext"
// this component renders form to be passed to VideoChat.js

const CreateRoom = () => {
  const {connecting, roomName, roomState, handleSubmit, roomTitle, handleRoomTitle} = useContext(AppContext)
  const leftElement = <FontAwesomeIcon icon={faArrowLeft} />;
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  
  return (
    <form onSubmit={handleSubmit}>
      <br />
      {roomState === "make_youtube" ? (
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
      ) : (
        ""
      )}
      <div style={{ position: "relative", left: "-19rem" }}>
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
      {roomState === "make_custom" ? (
        <div>
          <br />
          <h2>Your Workouts</h2>
          <div className="list-group">
            <button
              type="button"
              className="list-group-item list-group-item-action"
              aria-current="true"
            >
              Cras justo odio
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Dapibus ac facilisis in
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Morbi leo risus
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Porta ac consectetur ac
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Vestibulum at eros
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default CreateRoom;