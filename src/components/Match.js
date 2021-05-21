import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Alert, Form } from "react-bootstrap";
import NavBar from "./NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { getLiveGames, getPlayersByLeague } from "../contexts/NBAContext";
import { getDriverRankingByRaceId } from "../contexts/F1Context";
import { trocarFoto } from "./Nba";
import Contador from "./Contador";
import Select from "react-select";
import { NBATeams, F1Teams } from "./ComboOptions";
import "./Standings.css"

export default function Dashboard(...props) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState({});
  const [matchNBA, setMatchNBA] = useState(null);
  const [isLiveGameNBA, setIsLiveGameNBA] = useState(false);
  const [rankingRace, setRankingRace] = useState(null);
  const [toggleState, setToggleState] = useState(1)
  const [playersHome, setPlayersHome] = useState([]);
  const [playersAway, setPlayersAway] = useState([]);
  const [favF1, setFavF1] = useState({});
  const [favNBA, setFavNBA] = useState(null);
  const [changing, setChanging] = useState(false);
  const [disabled, setDisabled] = useState(false)

  const history = useHistory();
  const isNBA = props[0].history.location.state.isNBA;
  // setIsNBAGame(isNBA)

  const game = props[0].history.location.state.game;
  const isF1 = props[0].history.location.state.isF1;
  const race = props[0].history.location.state.race;
  let now;
  let gameStart;
  console.log(game)

  if (isF1) {
    let horaDaCorrida = new Date(race.date);
    let horaAtual = new Date();

    console.log(race.date);
    console.log(horaDaCorrida);

    now = horaAtual;
    gameStart = horaDaCorrida;
  }

  if (isNBA && isNBA !== undefined) {
    const horaDoJogo = new Date(game.startTimeUTC);
    const horaAtual = new Date();
    now = horaAtual;
    gameStart = horaDoJogo;

    // transforma em horario do fuso horário atual
    horaDoJogo.setMinutes(
      horaDoJogo.getMinutes() + horaDoJogo.getTimezoneOffset()
    );
  }


  const toggleTab = (index) => {
    setToggleState(index);
  }

  async function getPlayersGame() {
    let allPlayers = await getPlayersByLeague("standard")
    const playersH = ([])
    const playersA = ([]);
    allPlayers.forEach(e => {
      if (e.leagues.standard != undefined) {
        if (e.teamId === game.hTeam.teamId && e.leagues.standard.active == "1" && e.startNba != "0" &&
          e.yearsPro != "0")
          playersH.push(e)
        else if (e.teamId === game.vTeam.teamId && e.leagues.standard.active == "1" && e.startNba != "0" &&
          e.yearsPro != "0")
          playersA.push(e)
      }
    })
    setPlayersHome(playersH);
    setPlayersAway(playersA);
    console.log(playersH)
    console.log(playersA)
  }
  const handleF1VoteSelection = async (e) => {
    setChanging(true);
    setFavF1(e);
    setVoteF1(e);
    await sleep(2000);
    setChanging(false);
  };

  const handleNBAVoteSelection = async (e) => {
    setChanging(true);
    setFavNBA(e.currentTarget.id);
    console.log(e.currentTarget);
    // console.log(currentUser.uid);
    setVoteNBA(e.currentTarget.id);
    await sleep(2000);
    setChanging(false);
  };

  async function setVoteF1(vote) {
    let data = { uid: currentUser.uid, selected: { vote } };
    await firestore
      .collection("matchesF1")
      .doc(`${race.id}`)
      .collection(`${currentUser.uid}`)
      .doc("vote")
      .set(data);
  }

  async function setVoteNBA(id) {
    let data = { uid: currentUser.uid, selected: id };
    await firestore
      .collection("matchesNBA")
      .doc(`${matchNBA.gameId}`)
      .collection(`${currentUser.uid}`)
      .doc("vote")
      .set(data);
  }

  async function verifyLiveGames() {
    let listMatch = [];
    listMatch = await getLiveGames();
    let match;

    if (listMatch === undefined) return;
    else if (game === undefined) return;

    listMatch.forEach((liveGame) => {
      if (liveGame.gameId == game.gameId) {
        match = liveGame;
      }
    });

    if (match === undefined) {
      setMatchNBA(game);
    } else {
      setMatchNBA(match);
      setIsLiveGameNBA(true);
    }
  }

  function MountPlayersTable(props) {
    return (<table className="ResultTable">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Camisa</th>
          <th>Posição</th>
        </tr>
      </thead>
      {props.team.map((player, i) => (
        <tbody>
          <tr key={player.playerId} className={i % 2 === 0 ? 'Par' : 'Impar'}>
            <td style={{ width: "60%" }}>{player.firstName + " " + player.lastName}</td>
            <td style={{ width: "15%" }}>{player.leagues.standard.jersey}</td>
            <td style={{ width: "15%" }}>{player.leagues.standard.pos}</td>
          </tr>
        </tbody>
      ))}
    </table>)
  }

  function TimePeriod(){
    return (

      <div>
        {matchNBA.currentPeriod.split("/")[0] === "0" ? (
          <div></div>
        ) : (
          <div>
            <div>
              A partida está atualmente no{" "}
              {matchNBA.currentPeriod.split("/")[0]}º período
            </div>
            <div>Temos {matchNBA.gameDuration} horas de jogo</div>
          
          </div>
        )}
      </div>
    )
  }
  // async function countVotesNBA(){
  //   let countVotes =[];
  //   let votesRef = firestore
  //   .collection("matchesNBA")
  //   .doc(`${game.gameId}`)

  //   let votes = await votesRef.get()
  //   // .then((documents)=>{
  //   //   countVotes.push(documents.data())
  //   //   console.log(documents.docs)
  //   // });

  //       votes.forEach((doc)=>{
  //         countVotes.push(doc.data())
  //         console.log(doc.data())
  //       })

  // }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function getUserdata() {
    await firestore
      .collection("users")
      .doc("" + currentUser.uid)
      .get()
      .then((document) => {
        setUserData(document.data());
      });
  }

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function changeVoteNBA(id) {
    let data = { uid: currentUser.uid, selected: id };
    await firestore
      .collection("matchesNBA")
      .doc(`${matchNBA.gameId}`)
      .collection(`${currentUser.uid}`)
      .doc("vote")
      .set(data);

    setChanging(true);
    setFavNBA(id);
    await sleep(2000);
    setChanging(false);
  }

  async function getVoteF1() {
    let vote = await firestore
      .collection("matchesF1")
      .doc(`${race.id}`)
      .collection(`${currentUser.uid}`)
      .doc("vote")
      .get();

    if (vote.data() !== undefined) {
      console.log(vote.data().selected.vote);
      setFavF1(vote.data().selected.vote);
    }
  }

  async function getVoteNBA() {
    let vote = await firestore
      .collection("matchesNBA")
      .doc(`${game.gameId}`)
      .collection(`${currentUser.uid}`)
      .doc("vote")
      .get();

    if (vote.data() !== undefined) {
      setFavNBA(vote.data().selected);
    }
  }

  async function getRanking() {
    let rankings = await getDriverRankingByRaceId(race.id);
    rankings.forEach((ranking) => {
      if (ranking.time == null || ranking.time == "DNF") {
        ranking.time = "Não Concluiu";
      }
    });

    // let options = [];

    // rankings.forEach((ranking) => {
    //   console.log(ranking);
    //   console.log(ranking.driver.id);
    //   options.push(
    //     `{value : ${ranking.driver.id}, label : ${ranking.driver.name}}`
    //   );
    // });
    setRankingRace(rankings);
    console.log(rankings);
  }

  // async function getTeamInfo() {}

  useEffect(() => {
    getUserdata();
    console.log(props);
    if (isNBA && isNBA !== undefined) {
      verifyLiveGames();
      getVoteNBA();
      getPlayersGame();
      // countVotesNBA()
    }
    if (isF1) {
      getVoteF1();
      if (race != undefined) {
        getRanking();
      }
      let horaDaCorrida = new Date(race.date);
      let horaAtual = new Date();
  
      console.log(race.date);
      console.log(horaDaCorrida);
  
      if(horaAtual >=  horaDaCorrida){
        setDisabled(true)
      }
    }

    // getTeamInfo()
    // console.log(favF1);

    console.log(game);
    // console.log(race);
    // console.log(rankingRace);
    // console.log(isNBA);
    // console.log(isF1);
  }, []);
  
  return (
    <>
      <NavBar></NavBar>
      <div
        className="w-100"
        style={{
          position: "relative",
          marginTop: "25vh",
          maxWidth: "400px",
          alignSelf: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></div>
      {matchNBA !== null && (
        <div>
          <Card>
            <Card.Body>
              {isLiveGameNBA == false && (
                <div>
                  {gameStart >= now && (
                    <div className="text-center">
                      <Contador final={game.startTimeUTC} />
                    </div>
                  )}
                </div>
              )}
              <div>
                <div class="text-center" style={{ fontSize: "25px" }}>
                  <Link
                    style={{
                      color: "black",
                    }}
                    to={{
                      pathname: `/team/nba/${matchNBA.hTeam.teamId}`,
                    }}
                  >
                    <img
                      src={trocarFoto(matchNBA.hTeam)}
                      alt={matchNBA.hTeam.fullName}
                      width="50"
                      height="50"
                    />
                    {"  "}
                    {matchNBA.hTeam.fullName}
                  </Link>           

                  {"  "} {matchNBA.hTeam.score.points} - {matchNBA.vTeam.score.points} {"  "}

                  <Link
                    style={{
                      color: "black",
                    }}
                    to={{
                      pathname: `/team/nba/${matchNBA.vTeam.teamId}`,
                    }}
                  >
                    {matchNBA.vTeam.fullName}
                    {"  "}
                    <img
                      src={trocarFoto(matchNBA.vTeam)}
                      alt={matchNBA.vTeam.fullName}
                      width="50"
                      height="50"
                    />
                  </Link>
                </div>
                <br></br>
                <div>Arena: {matchNBA.arena}</div>
                <div>Cidade: {matchNBA.city}</div>

                  {matchNBA.statusGame === "Finished" ? (
                    <div>
                      <div>
                        Partida terminada
                      </div>
                    </div>
                  ) : (             

                    <TimePeriod></TimePeriod>

                  )}

                <br />
              </div>
              {isLiveGameNBA == false && (
                <div>
                  {changing && (
                    <Alert variant="success">
                      Seu voto foi alterado para:{" "}
                      {matchNBA.hTeam.teamId === favNBA
                        ? matchNBA.hTeam.fullName
                        : matchNBA.vTeam.fullName}
                    </Alert>
                  )}
                  {favNBA === null ? (
                    <div>
                      <div>Vote para o time vencedor:</div>
                      <Form.Group>
                        <Form.Check
                          type="radio"
                          label={matchNBA.hTeam.fullName}
                          name="votesNBA"
                          id={matchNBA.hTeam.teamId}
                          onChange={handleNBAVoteSelection}
                        />
                        <Form.Check
                          type="radio"
                          label={matchNBA.vTeam.fullName}
                          name="votesNBA"
                          id={matchNBA.vTeam.teamId}
                          onChange={handleNBAVoteSelection}
                        />
                      </Form.Group>
                    </div>
                  ) : (
                    <Form>
                      <div>
                        <div>
                          Seu voto atual é:{" "}
                          {matchNBA.hTeam.teamId === favNBA
                            ? matchNBA.hTeam.fullName
                            : matchNBA.vTeam.fullName}
                        </div>
                        <br />
                        <Button
                          type="submit"
                          onSubmit={() => {
                            matchNBA.hTeam.teamId === favNBA
                              ? changeVoteNBA(matchNBA.vTeam.teamId)
                              : changeVoteNBA(matchNBA.hTeam.teamId);
                          }}
                        // onClick={
                        //   matchNBA.hTeam.teamId === favNBA
                        //       ? changeVoteNBA(matchNBA.vTeam.teamId)
                        //       : changeVoteNBA(matchNBA.hTeam.teamId)
                        // }
                        // onChange={
                        //   matchNBA.hTeam.teamId === favNBA
                        //     ? changeVoteNBA(matchNBA.vTeam.teamId)
                        //     : changeVoteNBA(matchNBA.hTeam.teamId)
                        // }
                        >
                          Gostaria de mudar seu voto?
                        </Button>
                      </div>
                    </Form>
                  )}
                </div>
              )}
              <div style={{
                alignSelf: "center",
                maxHeight: "850px",
                // maxWidth: "500px"
              }}>
                <p
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  top: "20px"
                }}
                >Elenco das Equipes</p>
                <div className="tabContainer" 
                style={{
                  top: "-50px",
                  // height: "100%",
                  alignSelf: "center",
                  maxWidth: "500px"
                }}>
                  <div className="bloc-tabs">
                    <button
                      className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                      onClick={() => toggleTab(1)}
                    >
                      {game.hTeam.nickName}
                    </button>
                    <button
                      className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                      onClick={() => toggleTab(2)}
                    >
                      {game.vTeam.nickName}
                    </button>
                  </div>
                  <div className="content-tabs">
                    <div className={toggleState === 1 ? "content active-content" : "content"}>
                      <MountPlayersTable team={playersHome} />
                    </div>
                    <div className={toggleState === 2 ? "content active-content" : "content"}>
                      <MountPlayersTable team={playersAway} />
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
      {race !== undefined && (
        <div>
          <Card>
            <Card.Body>
              <div class="text-center" style={{ fontSize: "20px" }}>
                {race.competition.name}
              </div>
              <div>País: {race.competition.location.country}</div>
              <div>Cidade: {race.competition.location.city}</div>
              {race.competition.distance && (
                <div>Distancia percorrida: {race.competition.distance}</div>
              )}

              {race.laps.current !== null ? (
                <div>Voltas: {race.laps.current}</div>
              ) : (
                <div>Voltas: {race.laps.total}</div>
              )}
              <img
                src={race.circuit.image}
                alt={race.circuit.name}
                width="550"
                height="300"
              />

              {rankingRace !== null && (
                <div>
                  <br />
                  {changing && (
                    <Alert variant="success">
                      Seu voto foi alterado com sucesso:
                    </Alert>
                  )}
                  <br />
                  <div>Vote para o time vencedor:</div>
                  <Select
                    placeholder="Time vencedor"
                    isDisabled={disabled}
                    value={favF1}
                    onChange={handleF1VoteSelection}
                    options={F1Teams}
                  />
                  <br></br>
                  <br></br>

                  <table class="Standings" style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        {rankingRace[0].time !== "	Não Concluiu" && (
                          <th scope="col">Posição</th>
                        )}

                        <th scope="col">Piloto</th>
                        <th scope="col">Time</th>
                        {rankingRace[0].time !== "	Não Concluiu" && (
                          <th scope="col">Tempo</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {rankingRace.map((ranking, index) => (
                        <tr>
                          {rankingRace[0].time !== "	Não Concluiu" && (
                            <th scope="row">{index + 1}</th>
                          )}
                          <td>{ranking.driver.name}</td>
                          <td>
                            {ranking.team.id !== undefined && (
                              <Link
                                style={{
                                  color: "black",
                                }}
                                to={{
                                  pathname: `/team/f1/${ranking.team.id}`,
                                }}
                              >
                                {ranking.team.name}
                              </Link>
                            )}
                          </td>
                          {rankingRace[0].time !== "	Não Concluiu" && (
                            <td>{ranking.time}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
