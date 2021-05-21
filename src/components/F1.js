import { getLastRace } from "../contexts/F1Context";
import { getNextRace } from "../contexts/F1Context";
import Standings from "./Standings";
import { getDriverRankingByRaceId } from "../contexts/F1Context";
import React, { Component, useState, useEffect } from "react";
import { Form, Button, Card, Alert, ListGroup } from "react-bootstrap";
import NavBar from "./NavBar";
import { firestore } from "../firebase";
import { Link, useHistory } from "react-router-dom";

export default function F1() {
  const [nextRace, setNextRace] = useState([]);
  const [lastRace, setLastRace] = useState([]);
  const [rankingRace, setRankingRace] = useState([]);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  async function getNextRaceFunc() {
    let race = await getNextRace();
    setNextRace(race);
  }

  function swapPhoto(race) {
    if (race.circuit.id == 24)
      return "https://upload.wikimedia.org/wikipedia/commons/7/7c/Aut%C3%B3dromo_do_Algarve_alt.svg";
    else return race.circuit.image;
  }

  async function getLastRaceFunc() {
    let race = await getLastRace();
    setLastRace(race);
    console.log(race);
    let ranking = await getDriverRankingByRaceId(race.id);
    console.log(ranking);
    setRankingRace(ranking);
    // console.log(ranking)
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
  const goToDateSearch = () => {
    history.push("/f1DateSearch");
  };
  const goToSeason = () => {
    history.push("/f1Season");
  };
  useEffect(() => {
    //getUserdata()
    getNextRaceFunc();
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
            className="div esquerda"
            style={{
              position: "relative",
              width: "400px",
              float: "left",
              top: "-95px",
              // left: "50px"
            }}
          >
            <Standings />
          </div>

          <div
            className="div direita"
            style={{
              position: "relative",
              width: "50px",
              float: "left",
              paddingLeft: "10px",
              top: "5px",
              flexDirection:'column',
            }}
          >
            <Button
              variant="light"
              style={{
                width: "570px",
                margin: "5px",
                alingSelf:'center'

              }}
              onClick={goToDateSearch}
            >
              Procurar por uma data específica
            </Button>

            <Button
              variant="light"
              style={{
                width: "570px",
                margin: "5px",
                marginBottom: "10px" ,
                alingSelf:'center'

              }}
              onClick={goToSeason}
            >
              Ver Temporadas
            </Button>    

            {lastRace.length != 0 ? (
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
                    pathname: `/match/f1/${lastRace.id}`,
                    state: {
                      race: lastRace,
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
                    {rankingRace.length != 0 ? (
                      <Card.Body className="text-center">
                        <div style={{ fontSize: "25", fontWeight: "bold" }}>
                          {lastRace.competition.name}
                        </div>
                        <br></br>
                        <br></br>
                        <img
                          src={swapPhoto(lastRace)}
                          alt={lastRace.circuit.name}
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
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
