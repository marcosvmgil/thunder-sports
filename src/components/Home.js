import React, { Component, useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Form, Button, Card, Alert, ListGroup } from "react-bootstrap";
import { firestore } from "../firebase";
import { useHistory } from "react-router-dom";


export default function Home() {
  const [userData, setUserData] = useState({});
  const history = useHistory();
  
  return (
    <>
    <NavBar></NavBar>
    <div style={{
      backgroundImage: "url(http://i.imgur.com/UxlQI8H.jpg)",
      backgroundRepeat  : 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: "1910px",
      height: "950px",
      marginLeft: "-400px",
    }}>
     
      <Card
        className="align-item-center"
        style={{
          position: "absolute",
          marginTop: "100px",
          backgroundColor: "rgb(253 253 253 / 69%)",
          marginLeft: "850px",
        }}
      >
        <Card.Body className="text-left">
          Bem vindo ao ThunderSports!
        </Card.Body>
      </Card>
    </div>
    </>
  );
}
