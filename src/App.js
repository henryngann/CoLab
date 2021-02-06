import React from "react";
import "./App.css";
import VideoChat from "./VideoChat";
import Navbar from "./components/Navbar";
import "./media/CoLab.css";
const App = () => {
  return (
    <div className="app">
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="React">
            ⚛️
          </span>{" "}
          by <a href="google.com">Henry Ngan Rachael Ng Lily Wu Matthew Wong</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
