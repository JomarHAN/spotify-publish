import React from "react";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import "./Player.css";
import Sidebar from "./Sidebar/Sidebar";
function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar spotify={spotify} />
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default Player;
