import React, {useContext, useCallback, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
import "../../media/CoLab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../AppContext"
import { RoutesEnum } from '../../App'
import Video from "twilio-video";
// import { defaultWorkout } from "../../Room/CustomWorkout/DefaultWorkout"
import {ListItem, ListItemText} from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import Cancel from '@material-ui/icons/Cancel';

// this component renders form to be passed to VideoChat.js
const CreateWorkout = () => {
  return (
    <div>
      <div style={{marginTop: "3%", marginLeft: "20%", marginBottom: "2%"}}>
        <Cancel style={{marginRight: "2%"}} className="inline-block-child" id="cancel" />
        <h3 className="inline-block-child" >Create New Workout</h3>
      </div>

      <form onSubmit={()=>{}}>
        <div style={{ position: "relative", left: "-19rem"}}>
          <div className="form-floating mb-3 ">
            <input
              type="text"
              className="form-control bradius"
              id="field"
              placeholder="Name"
              value={""}
              style={{
                width: "25rem",
                paddingBottom: "25px",
                paddingTop: "35px",
              }}
              onChange={()=>{}}
              required
            />
            <label htmlFor="name">Workout Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bradius"
              id="field"
              style={{
                width: "50rem",
                height: "2.5rem",
                paddingBottom: "25px",
                paddingTop: "35px",
              }}
              placeholder="Password"
            />
            <label htmlFor="name"> +  Add New Workout</label>
          </div>
        </div>
      </form>
    </div>
  )
};

export default CreateWorkout;