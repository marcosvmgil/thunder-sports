import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../contexts/AuthContext";

const buttonStyle = {
  margin: "1px",
  width: "105px",
};

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleNavigationToProfile = () => {
    history.push("/profile");
  };
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
    <>
      <Navbar
        style={{
          background: "white",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        expand="lg"
        fixed="top"
        // class="justify-content-between"
      >
        <Navbar.Brand>
          <Link to="/login">
            <img
              src={logo}
              width="200"
              height="70"
              className="d-inline-block align-top"
              style={{
                alignSelf: "flex-start",
              }}
              alt="ThundeSports logo"
            />
          </Link>
        </Navbar.Brand>
        {currentUser !== null ? (
          <Nav
            className="navbar-buttons"
            role="group"
            aria-label="league-pages"
            // style={{ width: "330px" }}
          >
            <Link to="/nba">
              <button
                type="button"
                className="btn btn-secondary "
                style={buttonStyle}
              >
                NBA
              </button>
            </Link>
            <Link to="/f1">
              <button
                type="button"
                className="btn btn-secondary "
                style={buttonStyle}
              >
                Formula 1
              </button>
            </Link>
            <Link to="">
              <button
                type="button"
                className="btn btn-secondary "
                style={buttonStyle}
              >
                Favoritos
              </button>
            </Link>
          </Nav>
        ) : (
          <Nav />
        )}
        {currentUser !== null ? (
          <Nav style={{ width: "200" }}>
            <SearchBar />
            <NavDropdown alignRight title="Usuário">
              <NavDropdown.Item onClick={handleNavigationToProfile}>
                Perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav style={{ width: "200" }} />
        )}

        {/* <div style={{width: "200"}}></div> */}
      </Navbar>
    </>
  );
}
