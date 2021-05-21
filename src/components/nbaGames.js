import React, { useEffect, useState } from "react"
import { Form, Button, Card, Alert, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getGamesByDate, getTodayGames } from "../contexts/NBAContext"
import "./Standings.css"
import { trocarFoto } from "./Nba";

export default function Tabs(props) {
    const [toggleState, setToggleState] = useState(2)
    const [todayGames, setTodayGames] = useState([]);
    const [yesterdayGames, setYesterdayGames] = useState([]);
    const [userData, setUserData] = useState({});

    async function getGames() {
      let todayGames = await getTodayGames();
      setTodayGames(todayGames);

      var date = new Date();
      date.setDate(date.getDate() - 1);

      let yestGames = await getGamesByDate(transformDateYYYYMMDD(date));
      setYesterdayGames(yestGames);
      console.log(date);
      console.log(yestGames);
    }

    function transformDateYYYYMMDD(hourUTC) {
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

      var formattedDate = yyyy + "-" + mm + "-" + dd;

      return formattedDate;
    }

    function transformDateDDMMYYYY() {
      var date = new Date();
      date.setDate(date.getDate() - 1);

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

      return formattedDate;
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


    //async function getUserdata(){
    // await firestore.collection("users")
    // .doc("" + currentUser.uid).get().then((document) => {
    // setUserData(document.data())
    //   });
    //}

    useEffect(() => {
      //getUserdata()
      getGames();
    }, []);

    const toggleTab = (index) => {
        setToggleState(index);
    }
        
    function MountTodayGames() {
        return (
             <div
              className="jogosHoje float-left"
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
                      flexFlow: "row wrap",
                      maxHeight: "220px",
                      minHeight: "180px",
                      width: "293.5px",
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
        )
    }

    function MountYesterdayGames() {
      return (
        <div
          style={{
            position: 'relative',
            width: "607px",
            float: "left",
          }}
        >

          <div className=""
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}>

            {yesterdayGames.map((game) => (
              <Link
                style={{
                  width: "48.5%",
                  marginRight: "8px",
                  color: "black",
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
                    flexDirection: "row",
                    flexWrap: "wrap",
                    maxHeight: "220px",
                    minHeight: "180px",
                    width: "100%",

                    // maxWidth: "320px",
                    // minWidth: "320px",
                    // alignItems: "flex-start",
                    // justifyContent: "flex-end",
                    // flexBasis: "40%",
                    // flexGrow: "0",
                  }}
                >
                  <Card.Body className="text-left">
                    <div className="text-center">
                      <p>{transformDateDDMMYYYY(game.startTimeUTC)}</p>
                    </div>
                    {game.vTeam !== null && (
                      <div style={{
                        position: "relative",
                        width: "70%",
                        float: "left",
                        height: "100%"
                      }}>

                        <img src={trocarFoto(game.hTeam)} alt={game.hTeam.nickName} width="50" height="50" />{" "}
                        {game.hTeam.nickName}
                        <br></br>
                        <img src={trocarFoto(game.vTeam)} alt={game.vTeam.nickName} width="50" height="50" />{" "}
                        {game.vTeam.nickName}

                      </div>
                    )}
                    <div style={{
                      position: "relative",
                      float: "right",
                      height: "100%"
                    }}>

                      <div style={{
                        paddingTop: "12px",
                        fontWeight: "bold"
                      }}>{game.hTeam.score.points}</div>
                      <div style={{
                        paddingTop: "25px",
                        fontWeight: "bold"
                      }}>{game.vTeam.score.points}</div>

                    </div>
                  </Card.Body>
                </Card>
              </Link>


            ))}
          </div>
        </div>
      )
  }

    return (
        <div className="tabContainer" style={{marginTop: '8px'}}>
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    {"Ontem"}
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    {"Hoje"}
                </button>
            </div>
            
                <div className={toggleState === 1 ? "content active-content" : "content"}>
                    <MountYesterdayGames/>
                </div>
                <div className={toggleState === 2 ? "content active-content" : "content"}>
                    <MountTodayGames/>
                </div>
        </div>
    )
}