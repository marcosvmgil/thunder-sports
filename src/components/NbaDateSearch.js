import { getTodayGames, getGamesByDateCalendar } from "../contexts/NBAContext";
import React, { useState, useEffect } from "react";
import {  Card } from "react-bootstrap";
import NavBar from "./NavBar";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker"

export function trocarFoto(game) {
  // console.log(game.teamId)
  if (game.teamId == 7)
    return 'https://logodetimes.com/times/cleveland-cavaliers/logo-cleveland-cavaliers-escudo-1536.png'
  else if (game.teamId == 10)
    return 'https://logodetimes.com/times/detroit-pistons/logo-detroit-pistons-1536.png'
  else
    return game.logo
}


export default function NbaDateSearch() {
  const [todayGames, setTodayGames] = useState([]);
  const [userData, setUserData] = useState({});
  const [dateToday, setDateToday] = useState(new Date())

  async function getGames() {
    let games = await getTodayGames();
    setTodayGames(games);
    console.log(games);

  }

  function transformHour(hourUTC) {
    var date = new Date(hourUTC);

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    var formattedDate = dd + "/" + mm + "/" + yyyy;

    var hh = date.getHours() + 3;
    var min = date.getMinutes();
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (min < 10) {
      min = "0" + min;
    }

    var formattedHour = hh + ":" + min;

    return formattedDate + " " + formattedHour;
  }

  const changeDate = async (e) =>{
    setDateToday(e)
    let games = await getGamesByDateCalendar(e);
    setTodayGames(games);
  }


  useEffect(() => {
    getGames();
  }, []);

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
        style = {{
          display:"flex",
          flexDirection: "row"
        }}
        >

          <div
            className="div direita"
            style={{
              position: "relative",
              maxWidth: "1000px",
              float: "left",
              paddingLeft: "15px"
              // paddingLeft: "15px"
            }}>
            <ul className="nav nav-tabs" >
            <li className="nav-item">
            <DatePicker
              value={dateToday}
              onChange={changeDate}
              maxDate={new Date()}
              minDate={new Date('2020-01-01')}
              format={'dd-MM-y'}
            />
              {/* <a className="nav-link active" href="#jogosHoje">
                Hoje
            </a> */}
            </li>
          </ul>
            <div
              className="jogosHoje card-deck float-left"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {todayGames.map((game) => (
                <Link
                  style={{
                    color: "black"
                  }}
                  key={game.gameId}
                  to={{
                    pathname: `/match/nba/${game.gameId}`,
                    state: {
                      game: game,
                      isNBA: true,
                      isF1: false,
                    },
                  }}
                >
                  <Card
                    className="mt-2 mr-1 ml-1"
                    style={{

                      display: "flex",
                      flexDirection: "column",
                      maxHeight: '180px',
                      minHeight: "180px",
                      width: "320px",
                      // maxWidth: "320px",
                      // minWidth: "320px",
                      // alignItems: "flex-start",
                      // justifyContent: "flex-end",
                      flexBasis: "40%",
                      flexGrow: "0",
                    }}
                  >
                    <Card.Body className="text-left">
                      <div className="text-center">
                        <p>{transformHour(game.startTimeUTC)}</p>
                      </div>
                      <img
                        src={trocarFoto(game.hTeam)}
                        alt={game.hTeam.nickName}
                        width="50"
                        height="50"
                      />
                      {" "}{game.hTeam.nickName}  <br />
                      <img
                        src={trocarFoto(game.vTeam)}
                        alt={game.vTeam.nickName}
                        width="50"
                        height="50"
                      />
                      {" "}{game.vTeam.nickName}
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
