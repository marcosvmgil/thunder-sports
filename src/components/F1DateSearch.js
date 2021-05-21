import {
  getLastRace,
  getDriverRankingByRaceId,
  getRaces,
} from "../contexts/F1Context";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import NavBar from "./NavBar";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";

export default function F1DateSearch() {
  // const [nextRace, setNextRace] = useState([]);
  const [selectedRace, setSelectedRace] = useState([]);
  const [rankingRace, setRankingRace] = useState([]);
  const [races, setRaces] = useState([]);
  const [userData, setUserData] = useState({});
  const [dateToday, setDateToday] = useState(new Date());
  const [dateLastRace, setDateLastRace] = useState(() => {
    let dateAux = new Date();
    let day = dateAux.getDay();

    if (day != 0) {
      return dateAux.setDate(dateAux.getDate() - day);
    } else {
      return dateAux;
    }
  });

  // async function getNextRaceFunc() {
  //   let race = await getNextRace();
  //   setNextRace(race);
  // }

  const changeDate = async (e) => {
    setDateToday(e);
    setCurrentRace(e);
    // let games = await getGamesByDateCalendar(e);
    // setTodayGames(games);
  };

  async function setCurrentRace(date) {
    let dateRace = new Date(date);

    let day = dateRace.getDay();

    if (day != 0) {
      dateRace.setDate(dateRace.getDate() - day);
    }
    // console.log(date)
    // dateRace.setDate(dateRace.getDate() - 1)
    let formatedDate = dateRace.toISOString().split("T")[0];
    let racesReturn = await getRacesByDate(formatedDate);

    let currentRace = await racesReturn.filter((race) => {
      console.log(race.date.split("T")[0] + ", " + formatedDate);
      // console.log(race.date.split('T')[0]);
      if (race.date.split("T")[0] == formatedDate) {
        return race;
      }
    });

    console.log(currentRace[0]);
    setSelectedRace(currentRace[0]);
  }

  function swapPhoto(race) {
    if (race.circuit.id == 24)
      return "https://upload.wikimedia.org/wikipedia/commons/7/7c/Aut%C3%B3dromo_do_Algarve_alt.svg";
    else return race.circuit.image;
  }

  async function getLastRaceFunc() {
    let race = await getLastRace();
    setSelectedRace(race);
    console.log(race);
    let ranking = await getDriverRankingByRaceId(race.id);
    console.log(ranking);
    setRankingRace(ranking);
    // console.log(ranking)
  }

  async function getRacesFunc(dateSearch) {
    let date = new Date(dateSearch);
    // console.log(date)
    date.setDate(date.getDate() - 1);
    let formatedDate = date.toISOString().split("T")[0].split("-")[0];
    // console.log(formatedDate);
    let racesResponse = await getRaces(formatedDate);
    setRaces(racesResponse);
    console.log(racesResponse);
  }

  async function getRacesByDate(dateSearch) {
    let date = new Date(dateSearch);
    // console.log(date)
    date.setDate(date.getDate() - 1);
    let formatedDate = date.toISOString().split("T")[0].split("-")[0];
    // console.log(formatedDate);
    let racesResponse = await getRaces(formatedDate);
    setRaces(racesResponse);
    return racesResponse;
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
    //   getNextRaceFunc();
    getRacesFunc(dateLastRace);
    getLastRaceFunc();
  }, []);

  //barra vertical
  //<div style={{borderLeft: "3px solid black", height: "100vh", marginTop: '110px', position: 'absolute', left: '50%'}}></div>

  return (
    <>
      <NavBar></NavBar>

      <div
        className="justify-content-start"
        style={{
          position: "absolute",
          alignItems: "left",
          marginTop: "100px",
          width: "100%",
        }}
      >
        <h1 className="text-white">Automobilismo - Fórmula 1</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="div direita"
            style={{
              position: "relative",
              width: "50px",
              float: "left",
              paddingLeft: "10px",
              top: "5px",
            }}
          >
            <DatePicker
              value={dateToday}
              onChange={changeDate}
              maxDate={new Date()}
              minDate={new Date("2020-01-01")}
              format={"dd-MM-y"}
            />

            {selectedRace !== undefined && selectedRace.length != 0 ? (
              <div
                className="lastRace card-deck float-left"
                style={{
                  display: "inline-table",
                }}
              >
                <Link
                  style={{
                    color: "black",
                  }}
                  to={{
                    pathname: `/match/f1/${selectedRace.id}`,
                    state: {
                      race: selectedRace,
                      isNBA: false,
                      isF1: true,
                    },
                  }}
                >
                  <Card
                    // className="mt-2 mr-1 ml-1 mb-1"
                    style={{
                      // alignItems: "flex-start",
                      // justifyContent: "flex-end",
                      flexBasis: "40%",
                      flexGrow: "0",
                    }}
                  >
                    {rankingRace.length != 0 &&
                    selectedRace.competition != undefined ? (
                      <Card.Body className="text-center">
                        <div style={{ fontSize: "25", fontWeight: "bold" }}>
                          {selectedRace.competition.name}
                        </div>
                        <br></br>
                        <br></br>
                        <img
                          src={swapPhoto(selectedRace)}
                          alt={selectedRace.circuit.name}
                          width="550"
                          height="300"
                        />
                        <br></br>
                        <br></br>

                        <table class="Standings" style={{ width: "100%" }}>
                          <thead>
                            <tr>
                              <th scope="col">Posição</th>
                              <th scope="col">Piloto</th>
                              <th scope="col">Tempo</th>
                              <th scope="col">Pontos</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>{rankingRace[0].driver.name}</td>
                              <td>{rankingRace[0].time}</td>
                              <td>25</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>{rankingRace[1].driver.name}</td>
                              <td>{rankingRace[1].time}</td>
                              <td>18</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>{rankingRace[2].driver.name}</td>
                              <td>{rankingRace[2].time}</td>
                              <td>16</td>
                            </tr>
                          </tbody>
                        </table>
                      </Card.Body>
                    ) : null}
                  </Card>
                </Link>
              </div>
            ) : (
              <Card
                // className="mt-2 mr-1 ml-1 mb-1"
                style={{
                  // alignItems: "flex-start",
                  // justifyContent: "flex-end",
                  flexBasis: "100%",
                  flexGrow: "1",
                  width: "600px",
                  height: "350px",
                }}
              >
                <Card.Body className="text-center">
                  <div
                    style={{
                      fontSize: "50",
                      fontWeight: "bold",
                      width: "550px",
                      height: "300px",
                    }}
                  >
                    {"Corrida não encontrada"}
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
