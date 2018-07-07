import React from "react";
import "./aboutPage.scss";

class AboutPage extends React.Component {
  render() {
    return (
      <div className="about">
        <h1>About Fisher Clicker</h1>
        <h2>Fisher Clicker is an Idle Clicker Game (IDG), developled by <a target="_blank" href="https://anthonydrury.com">Anthony Drury</a></h2>
        <p>Developed with React and Redux, Fisher Clicker was developed for teaching purposes, feel free to utilize the code however you wish.</p>
        <p>If you have any questions or comments please contact me via: <a href="mailto:anthony.drury1@gmail.com">anthony.drury1@gmail.com</a></p>
      </div>
    );
  }
}

export default AboutPage;
