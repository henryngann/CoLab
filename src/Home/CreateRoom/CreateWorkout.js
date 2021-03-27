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
import AddIcon from '@material-ui/icons/Add';

// this component renders form to be passed to VideoChat.js
const CreateWorkout = () => {
return(<h1>Create workout component</h1>)
};

export default CreateWorkout;