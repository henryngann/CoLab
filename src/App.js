import React, {AppContext} from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Home/Home";
import "./media/CoLab.css";
import {AppContextProvider} from "./AppContext"
import CreateRoom from "./Home/CreateRoom/CreateRoom";
import CreateWorkout from "./Home/CreateRoom/CreateWorkout";
import JoinRoom from "./Home/JoinRoom/JoinRoom";
import Room from "./Room/Room";

const RoutesEnum = {
  Home: '/',
  Room: '/room',
  CreateRoom: '/create-room',
  JoinRoom: '/join-room',
  CreateWorkout: '/create-workout'
}

const App = () => {
  return (
    <div className="app">
      <Navbar />

      <main>
        <AppContextProvider>
          <Router>
            <Route path={RoutesEnum.Home} exact component={Home} />
            <Route path={RoutesEnum.CreateRoom} component={CreateRoom} />
            <Route path={RoutesEnum.JoinRoom} component={JoinRoom} />
            <Route path={RoutesEnum.Room} component={Room} />
            <Route path={RoutesEnum.CreateWorkout} component={CreateWorkout} />
          </Router>
        </AppContextProvider>
      </main>
    </div>
  );
};

export { App, RoutesEnum };
