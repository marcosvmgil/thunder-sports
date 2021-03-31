import Navbar from "react-bootstrap/Navbar";
import logo from '../images/logo.png';
import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <Navbar style={{ background: "white" }} fixed="top">
        <Navbar.Brand>
          <Link to="/login">
            <img
              src={logo}
              width="200"
              height="70"
              className="d-inline-block align-top"
              alt="ThundeSports logo"
            />
          </Link>
        </Navbar.Brand>
      </Navbar>
    </>
  ); 
} 
