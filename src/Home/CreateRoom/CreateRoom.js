import React, {useContext, useCallback, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
import "../../media/CoLab.css";
import youtubeimg from "../../media/workout.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../AppContext"
import { RoutesEnum } from '../../App'
import Video from "twilio-video";
// import { defaultWorkout } from "../../Room/CustomWorkout/DefaultWorkout"
import {ListItem, ListItemText} from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import AddIcon from '@material-ui/icons/Add';

// this component renders form to be passed to VideoChat.js
const CreateRoom = () => {
  const {connecting,username, roomName, roomState, roomTitle, handleSetRoom, handleRoomTitle, handleSetConnecting, handleSetWorkout} = useContext(AppContext)
  const leftElement = <FontAwesomeIcon icon={faArrowLeft} />;
  const rightElement = <FontAwesomeIcon icon={faArrowRight} />;
  const history = useHistory()
  const [selectedWorkout, setSelectedWorkout] = useState(0);
  const [defaultWorkout, setDefaultWorkout] = useState([]);

  useEffect(() => {
    fetch("/api/workouts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((res) => {
      setDefaultWorkout(res)
      handleSetWorkout(res[selectedWorkout])
    });
  }, []);
   
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

  const handleSelect = value => () => {
    setSelectedWorkout(value)
    handleSetWorkout(defaultWorkout[selectedWorkout])
  }

  useEffect(() => {
 }, [selectedWorkout]);

  const renderRow = ({index}) => {
    return (
      <ListItem button key={index} onClick={handleSelect(index)} selected={Boolean(index==selectedWorkout)}>
        <ListItemText primary={defaultWorkout[index].workoutName} />
      </ListItem>
    )
  }

  const workoutListMarkup = (
    <FixedSizeList height={400} width={300} itemSize={defaultWorkout.length} itemCount={defaultWorkout.length}>
      {renderRow}
    </FixedSizeList>
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
      <h3 className="inline-block-child">Your Workouts</h3>
      <AddIcon className="inline-block-child" id="add-icon"
        size="large"
        onClick={()=>{history.push(RoutesEnum.CreateWorkout)}}
        name='add'
      />
      <div className="list-group">
        {workoutListMarkup}
      </div>
    </div>
    </>
  );
};

export default CreateRoom;