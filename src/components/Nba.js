import {getTodayGames} from "../contexts/NBAContext"
import React, {Component} from "react";
import NavBar from "./NavBar";

class Nba extends Component {
  
  render() {
    // console.log(getTodayGames())
    return (
      <>
        <NavBar></NavBar>
      </>
    );
  } 
}

export default Nba;