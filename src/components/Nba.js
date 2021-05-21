import React, { Component, useState, useEffect } from "react";
import NavBar from "./NavBar";
import { firestore } from "../firebase";
import Standings from "./Standings";
import NbaGames from "./nbaGames";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export function trocarFoto(game) {
  // console.log(game.teamId)
  if (game.teamId == 7)
    return "https://logodetimes.com/times/cleveland-cavaliers/logo-cleveland-cavaliers-escudo-1536.png";
  else if (game.teamId == 10)
    return "https://logodetimes.com/times/detroit-pistons/logo-detroit-pistons-1536.png";
  else return game.logo;
}

export default function Nba() {
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const goToDateSearch = () => {
    history.push("/nbaDateSearch");
  };

  const goToSeason = () => {
    history.push("/nbaSeason");
  };
  
  return (
    <>
      <NavBar></NavBar>
      <div
        className="justify-content-start"
        style={{
          position: "absolute",
          alignItems: "left",
          marginTop: "100px",
        }}
      >
        <h1 className="text-white">Basquete - NBA</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="div esquerda"
            style={{
              position: "relative",
              width: "505px",
              float: "left",
              top: "-92px",
            }}
          >
            <Standings />
            <Button variant="light" style={{marginTop:'5px', width: '505px'}} onClick={goToSeason}>
              Ver Temporadas
            </Button>

          </div>
          <div
            className="div direita"
            style={{
              position: "relative",
              width: "660px",
              float: "left",
              paddingLeft: "15px",
              display: "flex",
              flexDirection: "column",
              // paddingLeft: "15px"
            }}
          >
            <Button variant="light" style={{margin:'5px'}} onClick={goToDateSearch}>
              Procurar por uma data específica
            </Button>

            <NbaGames />
          </div>
        </div>
      </div>
    </>
  );
}
