import React, { Component, useState, useEffect } from "react";
import { Form, Button, Card, Alert, ListGroup } from "react-bootstrap";
import NavBar from "./NavBar";
import { firestore } from "../firebase";
import Standings from "./Standings";
import NbaGames from "./nbaGames";
import Select from "react-select";
import { SeasonOptions } from "./ComboOptions";

export default function F1Season() {
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
            Mercedes-AMG Petronas {"            "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mercedes-Benz_in_Formula_One_logo.svg/220px-Mercedes-Benz_in_Formula_One_logo.svg.png"
              alt="Mercedes-AMG Petronas"
              width="220"
              height="70"
            />
          </div>
        </Card.Body>
        <Card.Body className="text-center">
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>MVP</div>
          <div className="text-center" style={{ fontSize: "20px" }}>
            <img
              style={{ border: "3px solid #948328" }}
              src="https://cdn-2.motorsport.com/images/mgl/6xEDbp10/s200/lewis-hamilton-mercedes-1.webp"
              alt="Lewis Hamilton"
              width="156"
              height="100"
            />
            {"  "}Lewis Hamilton - Mercedes-AMG Petronas
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
          maxHeight: "180px",
          width: "600px",
        }}
      >
        <table class="SeasonStats" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Posição</th>
              <th scope="col">Equipe</th>
              <th scope="col">Construtora</th>
              <th scope="col">Chassi(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1º</th>
              <td>Mercedes-AMG Petronas</td>
              <td>Mercedes</td>
              <td>F1 W10 EQ Power+</td>
            </tr>
            <tr>
              <th scope="row">2º</th>
              <td>Scuderia Ferrari</td>
              <td>Ferrari</td>
              <td>SF90</td>
            </tr>
            <tr>
              <th scope="row">3º</th>
              <td>Red Bull Racing</td>
              <td>Red Bull-Honda</td>
              <td>RB15</td>
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
          maxHeight: "180px",
          width: "600px",
        }}
      >
        <table class="SeasonStats" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Posição</th>
              <th scope="col">Equipe</th>
              <th scope="col">Construtora</th>
              <th scope="col">Chassi(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1º</th>
              <td>Mercedes-AMG Petronas</td>
              <td>Mercedes</td>
              <td>F1 W12</td>
            </tr>
            <tr>
              <th scope="row">2º</th>
              <td>Red Bull Racing</td>
              <td>Red Bull-Honda</td>
              <td>RB16B</td>
            </tr>
            <tr>
              <th scope="row">3º</th>
              <td>McLaren Racing</td>
              <td>McLaren-Mercedes</td>
              <td>MCL35M</td>
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
            <h1 className="text-white">Formula 1 - Temporada 2019/2020</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-white">Formula 1 - Temporada 2020/2021</h1>
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
                <Standings year="2021" />
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
