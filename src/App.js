import React from "react";
import "./App.css";
import VideoChat from "./VideoChat";
import Navbar from "./components/Navbar";
import "./media/CoLab.css";
import {AppContextProvider} from "./AppContext"

const App = () => {
  return (
    <div className="app">
      <Navbar />

      <main>
        <AppContextProvider>
          <VideoChat />
        </AppContextProvider>
      </main>
    </div>
  );
};

export default App;
