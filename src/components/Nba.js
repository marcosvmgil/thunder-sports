import {getTodayGames} from "../contexts/NBAContext"
import React, {Component, useState, useEffect} from "react";
import NavBar from "./NavBar";
import { firestore } from "../firebase"

export default function Nba() {
  
  const [ todayGames, setTodayGames ] = useState([])
  const [ userData, setUserData ] = useState({})
 
  async function getGames(){
    let games = await getTodayGames()
    setTodayGames(games)
    console.log(games)
  }

  //async function getUserdata(){
   // await firestore.collection("users")
   // .doc("" + currentUser.uid).get().then((document) => {
   // setUserData(document.data())
   //   });
  //}

  useEffect(() => {
    //getUserdata()
    getGames()
  },[])

  return (
    <>
      <NavBar></NavBar>
      {todayGames.map(game => (
        <div>
          <div>
            {game.hTeam.fullName}
          </div>
          <div>
            {game.vTeam.fullName}
          </div>
       </div>
      ))} 
    </>
  );
   
}