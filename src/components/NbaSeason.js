import React, { Component, useState, useEffect } from "react";
import { Form, Button, Card, Alert, ListGroup } from "react-bootstrap";
import NavBar from "./NavBar";
import { firestore } from "../firebase";
import Standings from "./Standings";
import NbaGames from "./nbaGames";
import Select from "react-select";
import { SeasonOptions } from "./ComboOptions";

export default function NbaSeason() {
  const [userData, setUserData] = useState({});
  const [season, setSeason] = useState({ id: "2019", label: "2019/2020" });

  const handleSeason = (e) => {
    setSeason(e);
  };

  function SeasonChampionsMVP2019() {
    return (
      <Card
        className="mt-2 mr-1 ml-1"
        style={{
          display: "flex",
          flexFlow: "row wrap",
          height: "340px",
          minHeight: "180px",
          width: "600px",
        }}
      >
        <Card.Body className="text-center">
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>Campeões</div>
          <div className="text-center" style={{ fontSize: "20px" }}>
            Los Angeles Lakers {"            "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/220px-Los_Angeles_Lakers_logo.svg.png"
              alt="Lakers"
              width="140"
              height="100"
            />
          </div>
        </Card.Body>
        <Card.Body className="text-center">
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>MVP</div>
          <div className="text-center" style={{ fontSize: "20px" }}>
            <img
              style={{ border: "3px solid #948328" }}
              src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3032977.png&w=350&h=254"
              alt="Antetokounmpo"
              width="130"
              height="100"
            />
            {"  "}Giannis Antetokounmpo - Bucks
          </div>
        </Card.Body>
      </Card>
    );
  }

  function SeasonStats2019() {
    return (
      <Card
        className="mt-2 mr-1 ml-1"
        style={{
          display: "flex",
          flexFlow: "row wrap",
          maxHeight: "220px",
          minHeight: "180px",
          width: "600px",
        }}
      >
        <table class="SeasonStats" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Prêmio</th>
              <th scope="col">Atleta</th>
              <th scope="col">Marca</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Pontos</th>
              <td>James Harden - HOU</td>
              <td>34.3 PJ</td>
            </tr>
            <tr>
              <th scope="row">Rebotes</th>
              <td>Andre Drummond - CLE/DET</td>
              <td>15.2 PJ</td>
            </tr>
            <tr>
              <th scope="row">Assistências</th>
              <td>LeBron James - LAL</td>
              <td>10.2 PJ</td>
            </tr>
            <tr>
              <th scope="row">3 Pontos</th>
              <td>James Harden - HOU</td>
              <td>4.4 PJ</td>
            </tr>
            <tr>
              <th scope="row">Roubadas</th>
              <td>Ben Simmons - PHI</td>
              <td>2.1 PJ</td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  }

  function SeasonStats2020() {
    return (
      <Card
        className="mt-2 mr-1 ml-1"
        style={{
          display: "flex",
          flexFlow: "row wrap",
          maxHeight: "220px",
          minHeight: "180px",
          width: "600px",
        }}
      >
        <table class="SeasonStats" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Prêmio</th>
              <th scope="col">Atleta</th>
              <th scope="col">Marca</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Pontos</th>
              <td>Stephen Curry - GSW</td>
              <td>31.5 PJ</td>
            </tr>
            <tr>
              <th scope="row">Rebotes</th>
              <td>Clint Capela - ATL</td>
              <td>14.4 PJ</td>
            </tr>
            <tr>
              <th scope="row">Assistências</th>
              <td>Russell Westbrook - WSH</td>
              <td>11.2 PJ</td>
            </tr>
            <tr>
              <th scope="row">3 Pontos</th>
              <td>Stephen Curry - GSW</td>
              <td>5.3 PJ</td>
            </tr>
            <tr>
              <th scope="row">Roubadas</th>
              <td>Jimmy Butler - MIA</td>
              <td>2.1 PJ</td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  }

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
        {season.id == 2019 ? (
          <div>
            <h1 className="text-white">NBA - Temporada 2019/2020</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-white">NBA - Temporada 2020/2021</h1>
          </div>
        )}
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
            {season.id == 2019 && (
              <div>
                <Standings year="2019" />
              </div>
            )}
            {season.id == 2020 && (
              <div>
                <Standings year="2020" />
              </div>
            )}
          </div>
          <div
            className="div direita"
            style={{
              position: "relative",
              width: "623px",
              float: "left",
              paddingLeft: "15px",
              // paddingLeft: "15px"
            }}
          >
            <Select
              value={season}
              onChange={handleSeason}
              options={SeasonOptions}
              className="mt-2 mr-1 ml-1"
            />
            {season.id == 2019 ? (
              <div>
                <SeasonStats2019 />
                <SeasonChampionsMVP2019 />
              </div>
            ) : (
              <div>
                <SeasonStats2020 />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
