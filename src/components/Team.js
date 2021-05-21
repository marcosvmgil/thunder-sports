import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import NavBar from "./NavBar";
import { trocarFoto } from "./Nba";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import {
  getTeamsById,
  getPlayersByTeamId,
  getTeamsByLeague,
  getStandingsByLeagueAndTeamId,
  getGamesByTeamId,
} from "../contexts/NBAContext";
import {
  getTeamById,
  getLastRace,
  getDriverRankingByRaceId,
} from "../contexts/F1Context";
import "./PlayerTable.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Dashboard(...props) {
  const [team, setTeam] = useState([]);
  const [statsNBA, setStatsNBA] = useState([]);
  const [opponent, setOpponent] = useState(null);
  const [lastMatches, setLastMatches] = useState([]);
  const [players, SetPlayers] = useState([]);
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const [race, setRace] = useState();
  const [races, setRaces] = useState(null);
  const [game, setGame] = useState();
  const [isF1, setIsF1] = useState(false);
  const [isNBA, setIsNBA] = useState();
  const percentage = getRandomArbitrary(100, 250);

  const teamId = props[0].history.location.pathname.split("/")[3];

  function transformDate(hourUTC) {
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

    return formattedDate;
  }

  // console.log(props[0].history);

  useEffect(() => {
    if (props[0].history.location.pathname.split("/")[2] === "f1") {
      console.log("Race" + props[0].history.location.pathname.split("/")[3]);
      setRace(props[0].history.location.pathname.split("/")[3]);
      setIsF1(true);
      getRace(props[0].history.location.pathname.split("/")[3]);
      getTeamF1(props[0].history.location.pathname.split("/")[3]);
    } else {
      //console.log("game" + props[0].history.location.pathname.split("/")[3])
      setGame(props[0].history.location.pathname.split("/")[3]);
      setIsNBA(true);
      getTeamNba(props[0].history.location.pathname.split("/")[3]);
      getStats(props[0].history.location.pathname.split("/")[3]);
      getLastMatches(props[0].history.location.pathname.split("/")[3]);
      getPlayers(teamId);
      getOpponent();
    }
    console.log(team);
  }, []);

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min) / 2.5;
  }

  async function getRace(race) {
    // let racesResponse = getLastRace();
    // console.log(racesResponse);
    let rankings = await getDriverRankingByRaceId(race.id);
    rankings.forEach((ranking) => {
      if (ranking.time == null || ranking.time == "DNF") {
        ranking.time = "Não Concluiu";
      }
    });
    console.log(rankings);
    setRaces(rankings);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async function getTeamNba(id) {
    let team = await getTeamsById(id);
    setTeam(team);
    // console.log(team);
  }

  async function getStats(id) {
    let stats = await getStandingsByLeagueAndTeamId("standard", id);
    setStatsNBA(stats);
    console.log(stats[0]);
  }

  async function getPlayers(id) {
    let playersOnTeam = await getPlayersByTeamId(id);
    const activePlayers = [];
    playersOnTeam.forEach((element) => {
      if (element.leagues.standard != undefined) {
        if (
          element.leagues.standard.active == "1" &&
          element.startNba != "0" &&
          element.yearsPro != "0"
        )
          activePlayers.push(element);
      }
    });
    SetPlayers(activePlayers);
    console.log(playersOnTeam);
    console.log(activePlayers);
  }

  async function getLastMatches(id) {
    let games = await getGamesByTeamId(id);
    let lastGames = [];
    let finishedGames = [];
    games.forEach((element) => {
      if (element.statusGame == "Finished") finishedGames.push(element);
    });
    // console.log(finishedGames)
    lastGames = finishedGames.slice(
      finishedGames.length - 10,
      finishedGames.length
    );
    // console.log(lastGames)
    setLastMatches(lastGames.reverse());
  }

  async function getOpponent(id) {
    let opponent = await getTeamsByLeague("standard");
    setOpponent(opponent);
    // console.log(opponent);
    // console.log(opponent);
  }

  async function getTeamF1(id) {
    let team = await getTeamById(id);
    setTeam(team);
    console.log(team);
  }

  return (
    <div
      className="justify-content-start"
      style={{
        position: "absolute",
        alignItems: "left",
        marginTop: "100px",
      }}
    >
      <NavBar />

      <Card
        className="mt-2 mr-1 ml-1"
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "140px",
          minHeight: "140px",
          width: "1100px",
          // maxWidth: "320px",
          // minWidth: "320px",
          // alignItems: "flex-start",
          // justifyContent: "flex-end",
          // flexBasis: "40%",
          // flexGrow: "0",
        }}
      >
        <Card.Body className="text-left text-black display-4 text-center">
          <img
            src={trocarFoto(team)}
            alt={team.nickname}
            width="100"
            height="100"
          />
          {team.fullName}
        </Card.Body>
      </Card>
      <div
        style={{
          position: "relative",
          width: "607px",
          float: "left",
        }}
      >
        {lastMatches.length !== 0 ? (
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {lastMatches.map((game) => (
              <Card
                className="mt-2 mr-1 ml-1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  maxHeight: "220px",
                  minHeight: "180px",
                  width: "48.5%",

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
                    <p>{transformDate(game.startTimeUTC)}</p>
                  </div>
                  {opponent !== null && (
                    <div
                      style={{
                        position: "relative",
                        width: "70%",
                        float: "left",
                        height: "100%",
                      }}
                    >
                      <img
                        src={trocarFoto(game.hTeam)}
                        alt={game.hTeam.nickName}
                        width="50"
                        height="50"
                      />{" "}
                      {game.hTeam.nickName}
                      <br></br>
                      <img
                        src={trocarFoto(game.vTeam)}
                        alt={game.vTeam.nickName}
                        width="50"
                        height="50"
                      />{" "}
                      {game.vTeam.nickName}
                    </div>
                  )}
                  <div
                    style={{
                      position: "relative",
                      float: "right",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        paddingTop: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {game.hTeam.score.points}
                    </div>
                    <div
                      style={{
                        paddingTop: "25px",
                        fontWeight: "bold",
                      }}
                    >
                      {game.vTeam.score.points}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
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
                width: "95.5%",

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
                  <p>Ultimas corrida</p>
                </div>

                  <div>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          float: "left",
                          height: "100%",
                        }}
                      >
                        <img
                          src={team.logo}
                          alt={team.name}
                          width="192"
                          height="108"
                        />{" "}
                        {`   ${team.name}`}
                        {` - ${getRandomInt(1,17)} lugar`}
                      </div>
                  </div>

                <div
                  style={{
                    position: "relative",
                    float: "right",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    {}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      <div
        style={{
          position: "relative",
          width: "500px",
          float: "left",
          height: "100%",
        }}
      >
        <Card
          className="mt-2 mr-1 ml-1"
          style={{
            // margin: "1rem",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <p>Rendimento da equipe nos últimos 10 jogos</p>
          <div
            style={{
              width: "240px",
              height: "240px",
              margin: "1rem",
            }}
          >
            {statsNBA.length !== 0 ? (
              <CircularProgressbar
                value={statsNBA[0].lastTenWin * 10}
                text={`${statsNBA[0].lastTenWin * 10}%`}
              />
            ) : (
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            )}
          </div>
          {team.fullName !== undefined ? (
            <div className="PlayerTable">
              <h1
                style={{
                  borderTop: "1px solid #000000",
                  fontSize: "30px",
                }}
              >
                Elenco - {team.fullName}
              </h1>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Camisa</th>
                    <th>Posição</th>
                  </tr>
                </thead>
                {players.map((player, i) => (
                  <tbody>
                    <tr
                      key={player.playerId}
                      className={i % 2 === 0 ? "Par" : "Impar"}
                    >
                      <td style={{ width: "70%" }}>
                        {player.firstName + " " + player.lastName}
                      </td>
                      <td style={{ width: "10%" }}>
                        {player.leagues.standard.jersey}
                      </td>
                      <td style={{ width: "10%" }}>
                        {player.leagues.standard.pos}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : (
            <div className="PlayerTable">
              <h1
                style={{
                  borderTop: "1px solid #000000",
                  fontSize: "30px",
                }}
              >
                Elenco - {team.name}
              </h1>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cargo</th>
                  </tr>
                </thead>

                <tbody>
                  <tr key={team.president} className={"Par"}>
                    <td style={{ width: "70%" }}>{team.president}</td>
                    <td style={{ width: "20%" }}>{"Presidente"}</td>
                  </tr>
                  <tr key={team.director} className={"Impar"}>
                    <td style={{ width: "70%" }}>{team.director}</td>
                    <td style={{ width: "20%" }}>{"Diretor"}</td>
                  </tr>
                  <tr key={team.technical_manager} className={"Par"}>
                    <td style={{ width: "60%" }}>{team.technical_manager}</td>
                    <td style={{ width: "30%" }}>{"Gerente Técnico"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
